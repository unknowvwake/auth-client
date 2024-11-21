import {
    DEFAULT_OAUTH_LOGOUT_URL,
    DEFAULT_OAUTH_ORIGIN_URL,
    getServerInfo,
    getOauthUrl,
    getOAuthLogoutUrl,
    getOAuthOrigin,
} from '../urls';
import { LocalStorageConstants, LocalStorageUtils, WebSocketUtils } from '@deriv-com/utils';

jest.mock('@deriv-com/utils', () => ({
    AppIDConstants: {
        domainAppId: {
            'staging-p2p.deriv.com': '62019',
        },
    },
    LocalStorageConstants: {
        configAppId: 'config.app_id',
        configServerURL: 'config.server_url',
        i18nLanguage: 'i18n.language',
    },
    LocalStorageUtils: {
        getValue: jest.fn(),
        setValue: jest.fn(),
    },
    URLConstants: {
        derivP2pProduction: 'https://p2p.deriv.com',
        derivP2pStaging: 'https://staging-p2p.deriv.com',
    },
    URLUtils: {
        getOauthURL: jest.fn().mockReturnValue('https://oauth.deriv.com/oauth2/authorize'),
    },
    WebSocketUtils: {
        getAppId: jest.fn().mockReturnValue('12345'),
    },
}));

describe('URLs', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getServerInfo', () => {
        it('should return server info with appId and serverUrl from local storage', () => {
            (LocalStorageUtils.getValue as jest.Mock).mockImplementation((key: string) => {
                if (key === LocalStorageConstants.configAppId) return '67890';
                if (key === LocalStorageConstants.configServerURL) return 'qa.deriv.com';
                if (key === LocalStorageConstants.i18nLanguage) return 'EN';
                return null;
            });

            const serverInfo = getServerInfo();

            expect(serverInfo).toEqual({
                appId: '67890',
                lang: 'EN',
                serverUrl: 'qa.deriv.com',
            });
        });

        it('should return default server info if local storage values are not set', () => {
            (LocalStorageUtils.getValue as jest.Mock).mockReturnValue(null);

            const serverInfo = getServerInfo();

            expect(serverInfo).toEqual({
                appId: '12345',
                lang: null,
                serverUrl: 'oauth.deriv.com',
            });
        });
    });

    describe('getOauthUrl', () => {
        it('should return the OAuth URL with appId and serverUrl', () => {
            (LocalStorageUtils.getValue as jest.Mock).mockImplementation((key: string) => {
                if (key === LocalStorageConstants.configAppId) return '67890';
                if (key === LocalStorageConstants.configServerURL) return 'qa.deriv.com';
                if (key === LocalStorageConstants.i18nLanguage) return 'EN';
                return null;
            });

            const oauthUrl = getOauthUrl();

            expect(oauthUrl).toBe('https://qa.deriv.com/oauth2/authorize?app_id=67890&l=EN&&brand=deriv');
        });

        it('should return the default OAuth URL if appId and serverUrl are not set', () => {
            (LocalStorageUtils.getValue as jest.Mock).mockReturnValue(null);
            (WebSocketUtils.getAppId as jest.Mock).mockReturnValue(null);

            const oauthUrl = getOauthUrl();

            expect(oauthUrl).toBe('https://oauth.deriv.com/oauth2/authorize');
        });
    });

    describe('getOAuthLogoutUrl', () => {
        it('should return the OAuth logout URL with appId and serverUrl', () => {
            (LocalStorageUtils.getValue as jest.Mock).mockImplementation((key: string) => {
                if (key === LocalStorageConstants.configAppId) return '67890';
                if (key === LocalStorageConstants.configServerURL) return 'qa.deriv.com';
                return null;
            });

            const oauthLogoutUrl = getOAuthLogoutUrl();

            expect(oauthLogoutUrl).toBe('https://qa.deriv.com/oauth2/sessions/logout');
        });

        it('should return the default OAuth logout URL if appId and serverUrl are not set', () => {
            (LocalStorageUtils.getValue as jest.Mock).mockReturnValue(null);

            const oauthLogoutUrl = getOAuthLogoutUrl();

            expect(oauthLogoutUrl).toBe(DEFAULT_OAUTH_LOGOUT_URL);
        });
    });

    describe('getOAuthOrigin', () => {
        it('should return the OAuth origin URL with appId and serverUrl', () => {
            (LocalStorageUtils.getValue as jest.Mock).mockImplementation((key: string) => {
                if (key === LocalStorageConstants.configAppId) return '67890';
                if (key === LocalStorageConstants.configServerURL) return 'qa.deriv.com';
                return null;
            });

            const oauthOrigin = getOAuthOrigin();

            expect(oauthOrigin).toBe('https://qa.deriv.com');
        });

        it('should return the default OAuth origin URL if appId and serverUrl are not set', () => {
            (LocalStorageUtils.getValue as jest.Mock).mockReturnValue(null);

            const oauthOrigin = getOAuthOrigin();

            expect(oauthOrigin).toBe(DEFAULT_OAUTH_ORIGIN_URL);
        });
    });
});
