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

import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useSession } from "../useSession";
import useAuthenticatedProfile from "../useAuthenticatedProfile";
import { getResource } from "../../models/helpers";
import { ERROR_CODES, isHTTPError } from "../../models/errors";
import useContactsContainerUrls from "../useContactsContainerUrls";
import {getContactsIndexIri, saveNewAddressBook} from "../../miniapps/contacts/addressBookHelpers";

export default function useAddressBooks() {
    // const [addressBooks, setAddressBooks] = useState(null);
    // const [error, setError] = useState(null);
    const dispatch = useDispatch();
    // @ts-ignore
    const addressBooks = useSelector((state) => state.addressBooks)
    const { session, solidLogicSingleton } = useSession();
    const { data: profile } = useAuthenticatedProfile();
    const addressBookContainerUrls = useContactsContainerUrls();

    useEffect(() => {
        if (!session.info.isLoggedIn || !profile || !addressBookContainerUrls) {
            return;
        }
        const { webId } = profile;
        const { fetch } = session;
        const contactsIndexIri = getContactsIndexIri(addressBookContainerUrls);

        (async () => {
            // @ts-ignore
            const { response: existingAddressBook, error: existingError } =
                await getResource(contactsIndexIri, fetch);

            if (existingAddressBook) {
               // setAddressBooks(existingAddressBook.dataset);
                return;
            }

            if (existingError && isHTTPError(existingError, ERROR_CODES.NOT_FOUND)) {
                // @ts-ignore
                const { response: newAddressBook, error: newError } =
                    await saveNewAddressBook(
                        {
                            iri: addressBookContainerUrls,
                            owner: webId,
                        },
                        fetch
                    );
                if (newError) {
                //    setError(newError);
                    return;
                }
              //  setAddressBooks(newAddressBook.index);
                return;
            }
           // setError(existingError);
        })();
    }, [session, profile, addressBookContainerUrls]);
// if I add error back in, need to add it here
    return [addressBooks];
}
