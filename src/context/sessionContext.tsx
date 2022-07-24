// Taken from @inrupt/solid-ui-react because I'm using a different version of React
import React, {
    createContext,
    ReactElement,
    useState,
    SetStateAction,
    Dispatch,
    useEffect,
    ReactNode,
} from "react";

import {
    fetch,
    login,
    logout,
    handleIncomingRedirect,
    Session,
    getDefaultSession,
    onSessionRestore as onSessionRestoreClient,
} from "@inrupt/solid-client-authn-browser";

import {
    SolidDataset,
    getProfileAll,
    ProfileAll,
    WithServerResourceInfo,
} from "@inrupt/solid-client";
import {SolidLogic, solidLogicSingleton} from "solid-logic";

export interface ISessionContext {
    login: typeof login;
    logout: typeof logout;
    session:Session;
    sessionRequestInProgress: boolean;
    setSessionRequestInProgress?: Dispatch<SetStateAction<boolean>> | any;
    fetch: typeof window.fetch;
    profile: ProfileAll<SolidDataset & WithServerResourceInfo> | undefined;
    solidLogicSingleton: typeof solidLogicSingleton;
}

export const SessionContext = createContext<ISessionContext>({
    login,
    logout,
    fetch,
    session: getDefaultSession(),
    sessionRequestInProgress: true,
    profile: undefined,
    solidLogicSingleton: solidLogicSingleton,
});

export interface ISessionProvider {
    children: ReactNode;
    sessionId?: string;
    session?: Session;
    sessionRequestInProgress?: boolean;
    onError?: (error: Error) => void;
    restorePreviousSession?: boolean;
    onSessionRestore?: (url: string) => void;
}

export const SessionProvider = ({
    sessionId,
    children,
    onError,
    sessionRequestInProgress: defaultSessionRequestInProgress,
    restorePreviousSession,
    onSessionRestore,
}: ISessionProvider): ReactElement => {
    const restoreSession = restorePreviousSession || typeof onSessionRestore !== "undefined";
    const [session, setSession] = useState<Session>(getDefaultSession());
    const [profile, setProfile] = useState<ProfileAll<SolidDataset & WithServerResourceInfo>>();
    // const [solidLogicSingleton, setSolidLogicSingleton] = useState(null) need to figure out if I need to set this

    useEffect(() => {
        if (onSessionRestore !== undefined) {
            onSessionRestoreClient(onSessionRestore);
        }
    }, [onSessionRestore])

    const defaultInProgress = typeof defaultSessionRequestInProgress === "undefined"
    ? !session.info.isLoggedIn : defaultSessionRequestInProgress;

    // If loggedin is true, we're not making a session request.
    const [sessionRequestInProgress, setSessionRequestInProgress] = useState(defaultInProgress);
    let currentLocation;

    if (typeof window !== "undefined") {
        currentLocation = window.location;
    }
    useEffect(() => {
        handleIncomingRedirect({
            url: window.location.href,
            restorePreviousSession: restoreSession,
        })
            .then((sessionInfo) => {
                // If handleIncomingRedirect logged the session in, we know what the current
                // user's WebID is.
                sessionInfo?.webId !== undefined
                    ? getProfileAll(sessionInfo?.webId, {
                        fetch: session.fetch,
                    })
                    : undefined
            } )
            .then((foundProfile) => {
                if (foundProfile !== undefined) {
                    setProfile(foundProfile);
                }
            })
            .catch((error: Error) => {
                if (onError) {
                    onError(error as Error);
                } else {
                    throw error;
                }
            })
            .finally(() => {
                // console.log("done");
                setSessionRequestInProgress(false);
            });

        getDefaultSession().on("logout", () => {
            // TODO force a refresh
            setSession(getDefaultSession());
        });
    }, [session, sessionId, onError, currentLocation, restoreSession]);

    const contextLogin = async (options: Parameters<typeof login>[0]) => {
        setSessionRequestInProgress(true);

        try {
            await login(options);
        } catch (error) {
            if (onError) {
                onError(error as Error);
            } else {
                throw error;
            }
        } finally {
            setSessionRequestInProgress(false);
        }
    };

    const contextLogout = async () => {
        try {
            await logout();
            setProfile(undefined);
        } catch (error) {
            if (onError) {
                onError(error as Error);
            } else {
                throw error;
            }
        }
    };

    return (
        <SessionContext.Provider
            value={{
                session,
                login: contextLogin,
                logout: contextLogout,
                sessionRequestInProgress,
                setSessionRequestInProgress,
                fetch,
                profile,
                solidLogicSingleton,
            }}
        >
            {children}
        </SessionContext.Provider>
    );

}