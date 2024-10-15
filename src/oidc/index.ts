import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

type OidcConfiguration = {
    issuer: string;
    redirect_uri: string;
    client_id: string;
    response_type: string;
    scope: string;
    post_logout_redirect_uri: string;
};

/**
 * Fetches the OIDC configuration for the given serverUrl.
 * @returns {Promise<object>} - A promise resolving to the OIDC configuration.
 * @throws {Error} - If there is a failure while fetching the OIDC configuration.
 */
export const fetchOidcConfiguration = async (): Promise<OidcConfiguration> => {
    const server_url_from_local_storage = localStorage.getItem('config.server_url') || '';
    const oidc_url = `https://${server_url_from_local_storage}/.well-known/openid-configuration`;

    try {
        const response = await fetch(oidc_url);
        const data = await response.json();

        const endpoints = {
            authorization_endpoint: data.authorization_endpoint,
            token_endpoint: data.token_endpoint,
            userinfo_endpoint: data.userinfo_endpoint,
            end_session_endpoint: data.end_session_endpoint,
        };

        localStorage.setItem('config.oidc_endpoints', JSON.stringify(endpoints));

        return data;
    } catch (error) {
        console.error('Failed to fetch OIDC configuration:', error);
        throw error;
    }
};

/**
 * Initiates the authentication flow by redirecting to the authorization endpoint.
 * @param {string} redirect_uri - The URL to redirect to after authentication.
 * @param {string} post_logout_redirect_uri - The URL to redirect to after logout.
 */
export const requestOidcAuthentication = async (redirect_uri: string, post_logout_redirect_uri: string) => {
    const client_id_from_local_storage = localStorage.getItem('config.app_id') || '';

    try {
        const oidc_config = await fetchOidcConfiguration();

        const userManager = new UserManager({
            authority: oidc_config.issuer,
            client_id: client_id_from_local_storage,
            redirect_uri: redirect_uri,
            response_type: 'code',
            scope: 'openid',
            stateStore: new WebStorageStateStore({ store: window.localStorage }),
            post_logout_redirect_uri: post_logout_redirect_uri,
        });

        await userManager.signinRedirect();
    } catch (error) {
        console.error('Authentication failed:', error);
        throw error;
    }
};
