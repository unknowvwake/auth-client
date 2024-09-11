export declare const DEFAULT_OAUTH_LOGOUT_URL = "https://oauth.deriv.com/oauth2/sessions/logout";
export declare const DEFAULT_OAUTH_ORIGIN_URL = "https://oauth.deriv.com";
export declare const getServerInfo: () => {
    appId: string | null | undefined;
    lang: string | null | undefined;
    serverUrl: string | null | undefined;
};
export declare const getOauthUrl: () => string;
export declare const getOAuthLogoutUrl: () => string;
export declare const getOAuthOrigin: () => string;
