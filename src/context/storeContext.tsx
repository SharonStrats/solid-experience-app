import React, {
    createContext,
    ReactElement,
    useState,
    useEffect,
    ReactNode,
} from "react";
import {LiveStore, UpdateManager, fetcher, graph } from "rdflib";


export interface IStoreContext {
    store: LiveStore | undefined;
}

export const StoreContext = createContext<IStoreContext>({
    store: undefined
});

export interface IStoreProvider {
    children: ReactNode;
    store: LiveStore | undefined;
    onError?: (error: Error) => void;
}

// make a function to set the default store
const setDefaultStore = () => {
    const solidStore = graph()
    const updater = new UpdateManager(solidStore)
    const solidFetcher = fetcher(solidStore, fetch)
    solidStore.updater = updater
    solidStore.fetcher = solidFetcher
    return solidStore;
}

export const StoreProvider = ({ children }: IStoreProvider): ReactElement => {
    const [ store, setStore ] = useState(setDefaultStore())
    useEffect(() => {
        if (!store) {
            // @ts-ignore
            setStore(solidStore)
        }

    }, [store]);

    return (
        <StoreContext.Provider
            value={{
                store,
            }}
        >
            {children}
        </StoreContext.Provider>
    );

}