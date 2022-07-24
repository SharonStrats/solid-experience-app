import React, {useCallback} from "react";
import { useSession } from "../../hooks/useSession";
import Button from '../UI/Button';
import useReturnUrl from "../../hooks/useReturnUrl";
import classes from './Login.module.css';
//import { AppDetails, AuthenticationContext, loadIndex, authn, authSession, CrossOriginForbiddenError, ensureTypeIndexes, FetchError, getSuggestedIssuers, NotFoundError, offlineTestID, SameOriginForbiddenError, solidLogicSingleton, UnauthorizedError } from 'solid-logic'
import { login } from "solid-ui";

const DEFAULT_PROVIDER_IRI = "https://solidcommunity.net/";

export const Login = () => {
    const { persist } = useReturnUrl(); // ?
    const { login: sessionLogin } = useSession();

    const login = useCallback(
        (oidcIssuer) => {
            persist(),
            sessionLogin({
                oidcIssuer,
            })
        }, [sessionLogin, persist]
    )

    const handleDefaultLogin = (ev: Event) => {
        ev.preventDefault();
        login(DEFAULT_PROVIDER_IRI);
    };

    return (
        <div className={classes.loginButton}>
            <Button type={"button"} onClick={handleDefaultLogin }>
                Login
            </Button>
        </div>
    )
}