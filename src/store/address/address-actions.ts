// import the needed dispatch functions
import { addressActions } from './address-slice'
import {getResource, vcardExtras} from "../../models/helpers";
import {getSourceUrl, getStringNoLocale, getThing, getUrlAll} from "@inrupt/solid-client";
import {foaf, vcard} from "rdf-namespaces/dist/index";

/*
export async function getGroups(containerIri, fetch) {
  const { respond, error } = createResponder();
  const groupsIri = joinPath(containerIri, GROUPS_INDEX_FILE);
  const { response: groupsResponse, error: resourceError } = await getResource(
    groupsIri,
    fetch
  );

  if (resourceError) return error(resourceError);
  const { dataset } = groupsResponse;
  const groupsThingUrl = `${getSourceUrl(dataset)}#this`; // TODO: Ugly hack, should remove
  const groupsThing = getThing(dataset, groupsThingUrl);
  const iris = getUrlAll(groupsThing, vcardExtras("includesGroup"));

  const groups = iris.map((iri) => {
    const groupThing = getThing(dataset, iri);
    return {
      iri,
      name: getStringNoLocale(groupThing, foaf.name),
    };
  });

  return respond(groups);
}
 */
// Lesson https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/25600370#overview
export const getAddressBooks = (addressesIri, fetch) => {
    return async (dispatch) => {
        // const { respond, error } = createResponder(); don't think i need this because i'm using dispatch
        // const addressesIri = joinPath(containerIri, GROUPS_INDEX_FILE); think about this
        const { response: addressesResponse, error: resourceError } = await getResource(
            addressesIri,
            fetch
        );

        // if (resourceError) return error(resourceError); need to handle errors
        const { dataset } = addressesResponse;
        const addressesThingUrl = `${getSourceUrl(dataset)}#this`; // TODO: Ugly hack, should remove
        const addressesThing = getThing(dataset, addressesThingUrl);
        const iris = getUrlAll(addressesThing, vcardExtras("includesAddressBook"));
        console.log("IRIs " + iris)
        const addresses = iris.map((iri) => {
            const addressThing = getThing(dataset, iri);
            return {
                iri,
                name: getStringNoLocale(addressThing, vcard.fn),
            };
        });

        console.log(addresses)
        // should I get everything related to each address book here, because
        // right now it's only the iri and name
       dispatch(addressActions.replaceAddressBooks(addresses));
    }
}