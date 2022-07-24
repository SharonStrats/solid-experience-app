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

import { useEffect, useState } from "react";
import { useSession } from "../useSession";
import useAuthenticatedProfile from "../useAuthenticatedProfile";
import { getResource } from "../../models/helpers";
import { ERROR_CODES, isHTTPError } from "../../models/errors";
import useContactsContainerUrl from "../useContactsContainerUrl";
import {getContactsIndexIri, saveNewAddressBook} from "../../miniapps/contacts/addressBookHelpers";

export default function useAddressBook() {
    const [addressBook, setAddressBook] = useState(null);
    const [error, setError] = useState(null);
    const { session } = useSession();
    const { data: profile } = useAuthenticatedProfile();
    const addressBookContainerUrl = useContactsContainerUrl();

    useEffect(() => {
        if (!session.info.isLoggedIn || !profile || !addressBookContainerUrl) {
            return;
        }
        const { webId } = profile;
        const { fetch } = session;
        const contactsIndexIri = getContactsIndexIri(addressBookContainerUrl);

        (async () => {
            // @ts-ignore
            const { response: existingAddressBook, error: existingError } =
                await getResource(contactsIndexIri, fetch);

            if (existingAddressBook) {
                setAddressBook(existingAddressBook.dataset);
                return;
            }

            if (existingError && isHTTPError(existingError, ERROR_CODES.NOT_FOUND)) {
                // @ts-ignore
                const { response: newAddressBook, error: newError } =
                    await saveNewAddressBook(
                        {
                            iri: addressBookContainerUrl,
                            owner: webId,
                        },
                        fetch
                    );
                if (newError) {
                    setError(newError);
                    return;
                }
                setAddressBook(newAddressBook.index);
                return;
            }
            setError(existingError);
        })();
    }, [session, profile, addressBookContainerUrl]);

    return [addressBook, error];
}
