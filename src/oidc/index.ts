import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { OIDCError, OIDCErrorType } from './error';
import { getServerInfo } from '../constants';

type OidcConfiguration = {
    issuer: string;
    redirect_uri: string;
    client_id: string;
    response_type: string;
    scope: string;
    post_logout_redirect_uri: string;
};

type GetLegacyTokensResponse = {
    acct1: string;
    token1: string;
};

export type LegacyTokens = {
    acct1: string;
    token1: string;
};

/**
 * Fetches the OIDC configuration for the given serverUrl.
 * @returns {Promise<object>} - A promise resolving to the OIDC configuration.
 * @throws {Error} - If there is a failure while fetching the OIDC configuration.
 */
export const fetchOidcConfiguration = async (): Promise<OidcConfiguration> => {
    const config_from_local_storage = localStorage.getItem('config.oidc_endpoints');
    if (config_from_local_storage) return JSON.parse(config_from_local_storage);

    const server_url_from_local_storage = localStorage.getItem('config.server_url') || 'oauth.deriv.com';
    const oidc_url = `https://${server_url_from_local_storage}/.well-known/openid-configuration`;

    try {
        const response = await fetch(oidc_url);
        const data = await response.json();

        localStorage.setItem('config.oidc_endpoints', JSON.stringify(data));

        return data;
    } catch (error) {
        console.error('Failed to fetch OIDC configuration:', error);
        if (error instanceof Error) throw new OIDCError(OIDCErrorType.FailedToFetchOIDCConfiguration, error.message);
        throw new OIDCError(OIDCErrorType.FailedToFetchOIDCConfiguration, 'unable to fetch OIDC configuration');
    }
};

/**
 * Initiates the authentication flow by redirecting to the authorization endpoint.
 * @param {string} redirect_uri - The URL to redirect to after authentication.
 * @param {string} post_logout_redirect_uri - The URL to redirect to after logout.
 */
export const requestOidcAuthentication = async (redirect_uri: string, post_logout_redirect_uri: string) => {
    try {
        const userManager = await createUserManager(redirect_uri, post_logout_redirect_uri);

        await userManager.signinRedirect();
        return { userManager };
    } catch (error) {
        console.error('Authentication failed:', error);
        if (error instanceof Error) throw new OIDCError(OIDCErrorType.AuthenticationRequestFailed, error.message);
        throw new OIDCError(OIDCErrorType.AuthenticationRequestFailed, 'unable to request OIDC authentication');
    }
};

/**
 * Requests access tokens from the Hydra authorization server.
 * The returned access tokens will be used to fetch the original tokens that can be passed to the `authorize` endpoint
 * @param {string} app_id The app ID of the platform requesting the access tokens
 * @param {string} redirect_uri The URL to redirect to after authentication. This defaults to the current URL where this function is called
 * @param {string} post_logout_redirect_uri The URL to redirect to after logout. This defaults to the current URL where this function is called
 */
export const requestOidcToken = async (
    redirect_uri: string = window.location.href,
    post_logout_redirect_uri: string = window.location.href
) => {
    try {
        const userManager = await createUserManager(redirect_uri, post_logout_redirect_uri);

        const user = await userManager.signinCallback();

        return {
            accessToken: user?.access_token,
        };
    } catch (error) {
        console.error('unable to request access tokens: ', error);
        if (error instanceof Error) throw new OIDCError(OIDCErrorType.AccessTokenRequestFailed, error.message);
        throw new OIDCError(OIDCErrorType.AccessTokenRequestFailed, 'unable to request access tokens');
    }
};

/**
 * Fetches the tokens that will be passed to the `authorize` endpoint.
 *
 * @param {string} accessToken The access token received after calling `requestOidcToken` successfully
 */
export const requestLegacyToken = async (accessToken: string): Promise<GetLegacyTokensResponse> => {
    const server_url_from_local_storage = localStorage.getItem('config.server_url') || 'oauth.deriv.com';

    try {
        const response = await fetch(`https://${server_url_from_local_storage}/oauth2/legacy/tokens`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('unable to request legacy tokens: ', error);
        if (error instanceof Error) throw new OIDCError(OIDCErrorType.LegacyTokenRequestFailed, error.message);
        throw new OIDCError(OIDCErrorType.LegacyTokenRequestFailed, 'unable to request legacy tokens');
    }
};

/**
 * Creates a UserManager instance that will be used to manage and call the OIDC flow
 * @param {string} app_id - The app ID of the platform
 * @param {string} redirect_uri - The URL to redirect to after authentication.
 * @param {string} post_logout_redirect_uri - The URL to redirect to after logout.
 */
export const createUserManager = async (redirect_uri: string, post_logout_redirect_uri: string) => {
    const { appId } = getServerInfo();

    try {
        const oidc_config = await fetchOidcConfiguration();

        const userManager = new UserManager({
            authority: oidc_config.issuer,
            client_id: appId,
            redirect_uri: redirect_uri,
            response_type: 'code',
            scope: 'openid',
            stateStore: new WebStorageStateStore({ store: window.localStorage }),
            post_logout_redirect_uri: post_logout_redirect_uri,
        });
        return userManager;
    } catch (error) {
        console.error('unable to create user manager for OIDC: ', error);
        if (error instanceof Error) throw new OIDCError(OIDCErrorType.UserManagerCreationFailed, error.message);
        throw new OIDCError(OIDCErrorType.UserManagerCreationFailed, 'unable to create user manager for OIDC');
    }
};
