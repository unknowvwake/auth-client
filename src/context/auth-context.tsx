import React, { createContext, useEffect, useCallback } from 'react';
import { getOAuthLogoutUrl, getOAuthOrigin } from '../constants/';

type MessageEvent = {
    data: 'logout_complete' | 'logout_error';
    origin: string;
};

type OAuth2ContextValue = {
    OAuth2Logout: () => void;
};

type OAuth2ProviderProps = {
    children: React.ReactNode;
    oauthUrl: string;
    WSLogoutAndRedirect: () => void;
};

export const OAuth2Context = createContext<OAuth2ContextValue | undefined>(undefined);

export const OAuth2Provider: React.FC<OAuth2ProviderProps> = ({ children, WSLogoutAndRedirect }) => {
    useEffect(() => {
        const onMessage = async (event: MessageEvent) => {
            const allowedOrigin = getOAuthOrigin();
            if (allowedOrigin === event.origin) {
                if (event.data === 'logout_complete') {
                    WSLogoutAndRedirect();
                } else {
                    console.warn('Unexpected message received: ', event.data);
                }
            } else {
                console.warn('Unexpected postmessage origin: ', event.origin);
            }
        };

        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, [WSLogoutAndRedirect]);

    const OAuth2Logout = useCallback(async () => {
        let iframe: HTMLIFrameElement | null = document.getElementById('logout-iframe') as HTMLIFrameElement;
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'logout-iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            setTimeout(() => {
                WSLogoutAndRedirect();
            }, 10000);
        }

        iframe.src = getOAuthLogoutUrl();

        iframe.onerror = error => {
            console.error('There has been a problem with the logout: ', error);
        };
    }, [WSLogoutAndRedirect]);

    const contextValue: OAuth2ContextValue = {
        OAuth2Logout,
    };

    return <OAuth2Context.Provider value={contextValue}>{children}</OAuth2Context.Provider>;
};
