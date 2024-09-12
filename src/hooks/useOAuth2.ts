import { useEffect, useCallback } from 'react';
import { getOAuthLogoutUrl, getOAuthOrigin } from '../constants/';

type MessageEvent = {
    data: 'logout_complete' | 'logout_error';
    origin: string;
};

/**
 * Custom hook to handle OAuth2 logout and redirection.
 *
 * @param {(oauthUrl: string) => Promise<void>} WSLogoutAndRedirect - Function to handle logout and redirection.
 * @returns {{ OAuth2Logout: () => Promise<void> }} - Object containing the OAuth2Logout function.
 */
export const useOAuth2 = (WSLogoutAndRedirect: () => Promise<void>) => {
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

    return { OAuth2Logout };
};
