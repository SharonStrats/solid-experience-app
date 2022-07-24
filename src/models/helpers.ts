import {
    getProfileAll,
    getThing,
    getUrl,
    getUrlAll,
    getSourceUrl,
    getStringNoLocale,
    asUrl,
    createThing,
    createSolidDataset,
    getSolidDataset,
    saveSolidDatasetAt,
    setThing,
} from "@inrupt/solid-client";
import { foaf, space, ldp, rdf, vcard } from "rdf-namespaces";
import {ERROR_CODES, isHTTPError} from "./errors";

export function chain(object, ...operations) {
    return operations.reduce((acc, transform) => {
        return transform(acc);
    }, object);
}

export async function fetchProfile(webId, fetch) {
    const profiles = await getProfileAll(webId, { fetch });
    const {
        webIdProfile,
        altProfileAll: [altProfile],
    } = profiles;

    let profileDataset = webIdProfile;
    let webIdUrl = webId;

    if (altProfile) {
        webIdUrl = getSourceUrl(altProfile);
        profileDataset = altProfile;
    }

    const pods = getUrlAll(getThing(webIdProfile, webId), space.storage);
    const inbox = getUrl(getThing(webIdProfile, webId), ldp.inbox);

    return packageProfile(webIdUrl, profileDataset, pods, inbox);
}

// below need to break it out
export function packageProfile(webId, dataset, pods, inbox) {
    const profile = getThing(dataset, webId);
    return {
        ...getProfileFromPersonThing(profile),
        webId,
        dataset,
        pods: pods || getUrlAll(profile, space.storage) || [],
        inbox: inbox || getUrl(profile, ldp.inbox),
    };
}

export function getProfileFromPersonThing(profileThing) {
    return {
        avatar: getUrl(profileThing, vcard.hasPhoto),
        name:
            getStringNoLocale(profileThing, foaf.name) ||
            getStringNoLocale(profileThing, vcard.fn),
        nickname:
            getStringNoLocale(profileThing, vcard.nickname) ||
            getStringNoLocale(profileThing, foaf.nick),
        webId: getProfileIriFromContactThing(profileThing),
        types: getUrlAll(profileThing, rdf.type),
    };
}
export function getProfileIriFromContactThing(contactThing) {
    try {
        const profileIri = asUrl(contactThing);
        return profileIri;
    } catch (e) {
        const profileIri = getUrl(contactThing, vcardExtras("WebId"));
        return profileIri;
    }
}
export function vcardExtras(property) {
    return `http://www.w3.org/2006/vcard/ns#${property}`;
}

export function joinPath(root, ...paths) {
    return [root.replace(/\/$/, ""), ...paths].join("/");
}

// need to move these
export function createResponder(
    { unauthorizedMessage } = {
        unauthorizedMessage: "You are not authorized for that action",
    }
) {
    const respond = (response) => ({ response });
    const error = (e) => {
        const unauthorized = isHTTPError(e, ERROR_CODES.UNAUTHORIZED);
        const msg = unauthorized ? unauthorizedMessage : e;
        return { error: msg };
    };

    return { respond, error };
}

export function defineThing(options, ...operations) {
    return chain(createThing(options), ...operations);
}

export function defineDataset(options, ...operations) {
    return setThing(createSolidDataset(), defineThing(options, ...operations));
}

// Resources
export async function getProfileResource(iri, fetch) {
    try {
        const dataset = await getSolidDataset(iri, { fetch });
        const resource = { dataset, iri };
        return resource;
    } catch (e) {
        return { error: e.message, iri };
    }
}

export async function getResource(iri, fetch) {
    const { respond, error } = createResponder();

    try {
        const dataset = await getSolidDataset(iri, { fetch });
        const resource = { dataset, iri };
        return respond(resource);
    } catch (e) {
        return error(e.message);
    }
}

export async function saveResource({ dataset, iri }, fetch) {
    const { respond, error } = createResponder();
    try {
        const baseIri = getSourceUrl(dataset) || getBaseUrl(iri);
        const response = await saveSolidDatasetAt(baseIri, dataset, { fetch });
        return respond(response);
    } catch (e) {
        return error(e.message);
    }
}

export function getBaseUrl(iri) {
    if (!iri) return iri;
    const url = new URL(iri);
    return url.origin + url.pathname;
}

