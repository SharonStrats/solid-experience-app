import React, { useCallback } from "react";
import { useRouter } from "next/router";

export const RETURN_TO_PAGE_KEY = "podbrowser:returnTo";

const useReturnUrl = () => {
    const router = useRouter();

    const persist = useCallback(() => {
        // if (router.query.returnTo && router.query.returnTo.startsWith("/"))
        if (router.query.returnTo) {
            try {
                localStorage.setItem(RETURN_TO_PAGE_KEY, router.query.returnTo as string);
            } catch {
                // silently fail if persisting the return to URL fails, it sucks but
                // there isn't really a "good" user experience to have here.
            }
        }
    }, [router]);

    const restore = useCallback(() => {
        const returnTo = localStorage.getItem(RETURN_TO_PAGE_KEY);
        localStorage.removeItem(RETURN_TO_PAGE_KEY);

        if (returnTo && returnTo.startsWith("/")) {
            router.replace(returnTo);
        } else {
            router.replace("/");
        }
    }, [router]);

    return {
        persist,
        restore,
    };
};

export default useReturnUrl;
