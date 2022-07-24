// copied from '@inrupt/solid-ui-react
import { useContext } from "react";
import {
    ILoginInputOptions,
    Session,
} from "@inrupt/solid-client-authn-browser";
import { SessionContext} from "../../context/sessionContext";
import { solidLogicSingleton } from "solid-logic";

export interface SessionInfo {
    session: Session;
    sessionRequestInProgress: boolean;
    fetch: typeof window.fetch;
    login: (options: ILoginInputOptions) => Promise<void>;
    logout: () => Promise<void>;
    solidLogicSingleton: typeof solidLogicSingleton;
}

export const useSession = () => {
    const { session, sessionRequestInProgress, fetch, login, logout, solidLogicSingleton } = useContext(SessionContext);
    return {
        session,
        sessionRequestInProgress,
        fetch,
        login,
        logout,
        solidLogicSingleton,
    }
}
