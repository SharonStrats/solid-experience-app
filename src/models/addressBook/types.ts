// types for address model
export interface Address {
    streetAddress: string;
    locality:string;
    region: string;
    postalCode: string;
    countryName: string;
}

export interface Contact {
    webID: string;
    fn: string;
    name: string;
    organizationName: string;
    role: string;
    address: Address[];
    telephones: string[];
    emails: string[];
    memberOfGroups: string[] | undefined;
}

export interface Group {
    name: string;
    contacts: Contact[];
}

export interface Contacts {
    iri: string;
    contacts: Contact[]
}

export interface Groups {
    iri: string;
    groups: Group[]
}

export interface AddressBook {
    title: string;
    iri: string;
    groups: Groups;
    contacts: Contacts;
}

export type AddressBooks = AddressBook[];