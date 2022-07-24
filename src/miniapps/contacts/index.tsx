import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MiniApp from "../../components/MiniApp";
import Groups from "./components/Groups";
import Individuals from "./components/Individuals";
import classes from "../tasks/Tasks.module.css";
import useAddressBook from "../../hooks/useAddressBooks";
import {useSession} from "../../hooks/useSession";
import {NamedNode} from "rdflib";
import {ns} from "solid-ui";
import {ADDRESSBOOKS_INDEX, CONTACTS_CONTAINER, getAddressBooksIndexUrl} from "../../models/addressBook";
import {getResource, joinPath, vcardExtras} from "../../models/helpers";
import {profile} from "solid-logic";
import useAuthenticatedProfile from "../../hooks/useAuthenticatedProfile";
import {getSolidDataset, getSourceUrl, getStringNoLocale, getThing, getUrlAll, Thing} from "@inrupt/solid-client";
import {space, vcard} from "rdf-namespaces/dist/index";
import { addressActions} from "../../store/address/address-slice";
import {getAddressBooks} from "../../store/address/address-actions";

const navItems = [
    {
        id: '1',
        name: 'groups',
        href: '/groups'
    },
    {
        id: '2',
        name: 'individual',
        href: '/individual'
    }
]
/*
Example from groups to get addressbooks
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
/* cut for a second
 useEffect(() => {

        (async () => {
            if (profile) {
                const { pods } = profile
                const mainProfile = getThing(pods[0]);
                return getUrlAll(mainProfile as Thing, space.storage);
                const iris = getUrlAll(`${pods[0]}#this`, vcardExtras("AddressBook"));
                console.log("IRS " + iris)
                setAddressBooks(iris)
            }
        })();
           }, [profile, addressBooks])*/

/* NOT SURE YET HOW TO APPROACH THIS ADDRESSBOOKS
WITHIN GETADDRESSBOOKS IS THIS WHERE I RETRIEVE THE DATA FROM THE DATABASE THEN IT GETS SET IN THE STORE

OR DO I NEED TO CALL A SET ADDRESSBOOK IN A USEEFFECT HOOK????

 */
const ContactsApp = () => {
    const dispatch = useDispatch()
    // @ts-ignore
    const { addressBooks } = useSelector((state) => state.address.addressBooks)
    const { session } = useSession();
    const { data: profile } = useAuthenticatedProfile();

    const addressBookName = "Sample"
    useEffect(() => {
        // @ts-ignore
        if (profile) {
            const {dataset, pods} = profile
            const addressBooksIri = joinPath(CONTACTS_CONTAINER, ADDRESSBOOKS_INDEX);

            // @ts-ignore
            dispatch(getAddressBooks(addressBooksIri, session.fetch))
        }
    }, [addressBooks, dispatch])



    return (
            <MiniApp icon='contacts' name='Contacts' navItems={navItems} positionX={40} positionY={400} >
                <div className={classes.container}>
                    <p> AddressBook: {addressBookName} </p>
                    <ul>
                        <li>Drag contacts to other miniapps to do something with them.</li>
                        <li>Drag anything to a contact to do something with/to it.</li>
                    </ul>

                    <Groups />
                    <Individuals />
                </div>
            </MiniApp>
    )
}

export default ContactsApp;