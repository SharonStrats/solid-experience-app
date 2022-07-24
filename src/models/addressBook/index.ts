/**
 * Copyright 2020 Inrupt Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {
    addStringNoLocale,
    addUrl,
    asUrl,
    createSolidDataset,
    createThing,
    getSolidDataset,
    getSourceUrl, getStringNoLocale,
    getThing, getUrlAll,
    setThing,
} from "@inrupt/solid-client";
import { acl, dc, rdf } from "rdf-namespaces";

import {chain, createResponder, getResource, joinPath, vcardExtras} from "../helpers";
import {vcard} from "rdf-namespaces/dist/index";

/*
 * AddressBook is our Pod-wide accessible source for contacts
 */
/*
Notes: about how I think this should work
addressbooks.ttl should contain a list of all the users address books
at first this won't exist and we should find their address books and list them here
and from that point on new addressbooks will be added here.
1. Should check if an addressbooks.ttl file exists
 */
/* Model constants */
export const CONTACTS_CONTAINER = "Contacts/";
export const ADDRESSBOOKS_INDEX = "addressBooks.ttl";
export const INDEX_FILE = "index.ttl";
export const ADDRESS_BOOK_ERROR_NO_MAIN_INDEX = "Unable to load main index";


/* Model functions */
export function getAddressBooksIndexUrl(podRootUrl) {
    return joinPath(joinPath(getAddressBookContainerUrl(podRootUrl), ADDRESSBOOKS_INDEX))
}

export function getAddressBookContainerUrl(podRootUrl) {
    return joinPath(podRootUrl, CONTACTS_CONTAINER);
}

// NEED TO THINK ABOUT THE BELOW
export function getAddressBookIndexDefaultUrl(containerUrl) {
    return joinPath(containerUrl, INDEX_FILE);
}

export function getAddressBookThingUrl(addressBook) {
    try {
        return asUrl(addressBook.thing);
    } catch {
        return `${getAddressBookIndexDefaultUrl(addressBook.containerUrl)}#this`;
    }
}

export function getAddressBookDatasetUrl(addressBook) {
    return (
        getSourceUrl(addressBook.dataset) ||
        getAddressBookIndexDefaultUrl(addressBook.containerUrl)
    );
}

export function createAddressBook(containerUrl, owner, title = "Contacts") {
    const thing = chain(
        createThing({ name: "this" }),
        (t) => addUrl(t, rdf.type, vcardExtras("AddressBook")),
        (t) => addUrl(t, acl.owner, owner),
        (t) => addStringNoLocale(t, dc.title, title)
    );
    return {
        containerUrl,
        dataset: setThing(createSolidDataset(), thing),
        thing,
    };
}
export async function loadAllAddressBooks(fetch) {
    // need to check these things
    // 1. how do I getSolid
    // 2. how does the dataset look is there only one...
}

export async function loadAddressBook(containerUrl, fetch) {
    const mainIndexUrl = getAddressBookIndexDefaultUrl(containerUrl);
    const mainIndexDataset = await getSolidDataset(mainIndexUrl, { fetch });
    const mainIndexThingUrl = `${mainIndexUrl}#this`;
    const mainIndex = getThing(mainIndexDataset, mainIndexThingUrl);
    if (!mainIndex) {
        throw new Error(ADDRESS_BOOK_ERROR_NO_MAIN_INDEX);
    }
    return {
        containerUrl,
        dataset: mainIndexDataset,
        thing: mainIndex,
    };
}

export async function findAddressBooksNotInIndex(profileThing, fetch) {
    const iris = getUrlAll(profileThing, vcardExtras("AddressBook"));
    return iris;
}
// the function below will look for the users addressBooks and then create
// the index for future
export async function createAddressBookIndex(fetch) {
// look at how a new group is added
}

// this is all solid-client
export async function getAddressBooks(fetch) {
    const { respond, error } = createResponder();
    const addressesIri = joinPath(CONTACTS_CONTAINER, ADDRESSBOOKS_INDEX);
    const { response: addressesResponse, error: resourceError } = await getResource(
        addressesIri,
        fetch
    );

    if (resourceError) return error(resourceError);
    const { dataset } = addressesResponse;
    const addressesThingUrl = `${getSourceUrl(dataset)}#this`; // TODO: Ugly hack, should remove
    const addressesThing = getThing(dataset, addressesThingUrl);
    const iris = getUrlAll(addressesThing, vcardExtras("includesAddressBook"));

    const addresses = iris.map((iri) => {
        const addressThing = getThing(dataset, iri);
        return {
            iri,
            name: getStringNoLocale(addressThing, vcard.fn),
        };
    });
    return respond(addresses)
}