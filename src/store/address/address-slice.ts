import { createSlice } from "@reduxjs/toolkit";
import {createSolidDataset} from "@inrupt/solid-client";
// addressDataset: createSolidDataset(),
const initialState = { addressBooks: [], showAddressBookApp: true, addressBooksShown: [] };

// in action you can have a payload
/* need to get all the users addressbooks,
add a group,
add a contact
add an organization
add an addressbook
*/
// think about organizations and how to handle this
// these are all async..
// if the backend can handle the logic you can send off to the backend first,
// then have the result from the backend update the redux store

// create action creators for async calls
const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        addAddressBook(state, action) {

        },
        addContact(state, action) {

        },
        addGroup(state, action) {

        },
        addOrganization(state, action) {

        },
        addContactToGroup(state, action) {

        },
        getAllAddressBooks(state, action) {
            // don't need action, it is called for you.. you only need it
            // if you have a payload
            // can mutate state
         // working on this.....


        },
        setAllAddressBooks(state, action) {
            // don't need action, it is called for you.. you only need it
            // if you have a payload
            // can mutate state
            // working on this.....

        },
        getOneAddressBook(state, action) {

        },
        getContacts(state, action) {

        },
        getGroups(state, action) {

        },
        removeAddressBook(state, action) {
          //
        },
        removeGroup(state, action) {

        },
        removeContact(state, action) {

        },
        removeOrganization(state, action) {

        },
        increment(state, action) {
            //state.counter++;
        },
    }
});

export const addressActions = addressSlice.actions;
export default addressSlice.reducer;