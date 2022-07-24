import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from "../src/context/sessionContext";
import Header from "../src/components/Header";
import AuthenticationProvider from "../src/context/authenticationContext";
import { Provider } from 'react-redux'
import store from '../src/store/index'

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <SessionProvider sessionId="solid-experience-prototype" restorePreviousSession >
            <Provider store={store}>
                <AuthenticationProvider>
                    <Header />
                    <Component {...pageProps} />
                </AuthenticationProvider>
            </Provider>
        </SessionProvider>

  );
}

export default MyApp
