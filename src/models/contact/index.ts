import {
    createSolidDataset,
    getUrl,
    getThingAll,
} from "@inrupt/solid-client";
import {getOrCreateDataset} from "../dataset";

export async function getContactAll(addressBook, types, fetch) {
    const contactIndexArray = await Promise.all(
        types.map(async (type) => getContactIndex(addressBook, type, fetch))
    );
    return getContactAllFromContactIndexArray(contactIndexArray);
}

export function getContactAllFromContactIndexArray(contactIndexArray) {
    return contactIndexArray
        .map((index) => getContactAllFromContactsIndex(index))
        .reduce((memo, contacts) => memo.concat(contacts), []);
}

export function getContactAllFromContactsIndex(contactIndex) {
    const { dataset, type } = contactIndex;
    return getThingAll(dataset)
        .filter((contact) => type.isOfType(contact))
        .map((thing) => {
            return {
                thing,
                dataset,
            };
        });
}

// maybe should be in another file
export async function getContactIndex(addressBook, type, fetch) {
    const indexUrl = getUrl(addressBook.thing, type.indexFilePredicate);
    const dataset = indexUrl
        ? await getOrCreateDataset(indexUrl, fetch)
        : createSolidDataset();
    return {
        dataset,
        type,
    };
}