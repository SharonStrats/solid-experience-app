import React, {useCallback, useEffect} from 'react';
import {useSession} from "../hooks/useSession";
import {router} from "next/client";
import {useRouter} from "next/router";
import useReturnUrl from "../hooks/useReturnUrl";
import {EVENTS} from "@inrupt/solid-client-authn-core";

// @ts-ignore
const AuthenticationProvider = ({children}) => {
    const { session, sessionRequestInProgress } = useSession();
    const router = useRouter();
    const { restore } = useReturnUrl();

    const onSessionRestore = useCallback(
        async (url) => {
            await router.push(url)
        }, [router]
    );

    const onLogin = useCallback(async () => {
        restore();
        }, [restore]
    );

    const onLogout = useCallback(async () => {
        await router.push("/login");
        }, [router]
    );

    useEffect(() => {
        session.on(EVENTS.LOGIN, onLogin)
        session.on(EVENTS.LOGOUT, onLogout)
        session.on(EVENTS.SESSION_RESTORED, onSessionRestore)

        return () => {
            session.off(EVENTS.LOGIN, onLogin)
            session.off(EVENTS.LOGOUT, onLogout)
            session.off(EVENTS.SESSION_RESTORED, onSessionRestore)
        }
    }, [])

    if (sessionRequestInProgress) {
        console.log("Session request in progress")
    }
    return <>{children}</>
}

export default AuthenticationProvider;
