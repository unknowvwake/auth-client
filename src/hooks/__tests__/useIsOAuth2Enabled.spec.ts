import { renderHook } from '@testing-library/react';
import { useIsOAuth2Enabled } from '../useIsOAuth2Enabled';
import * as Constants from '../../constants/';

jest.mock('../../constants/', () => ({
    getServerInfo: jest.fn(),
}));

describe('useIsOAuth2Enabled', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return false if OAuth2EnabledAppsInitialised is false', () => {
        (Constants.getServerInfo as jest.Mock).mockReturnValue({ appId: 12345 });

        const { result } = renderHook(() => useIsOAuth2Enabled([], false));

        expect(result.current).toBe(false);
    });

    it('should return false if OAuth2EnabledApps is empty', () => {
        (Constants.getServerInfo as jest.Mock).mockReturnValue({ appId: 12345 });

        const { result } = renderHook(() => useIsOAuth2Enabled([], true));

        expect(result.current).toBe(false);
    });

    it('should return false if appId is not in the enabled_for list', () => {
        (Constants.getServerInfo as jest.Mock).mockReturnValue({ appId: 98765 });

        const OAuth2EnabledApps = [
            {
                enabled_for: [12345, 23456],
            },
        ];

        const { result } = renderHook(() => useIsOAuth2Enabled(OAuth2EnabledApps, true));

        expect(result.current).toBe(false);
    });

    it('should return true if appId is in the enabled_for list', () => {
        (Constants.getServerInfo as jest.Mock).mockReturnValue({ appId: 12345 });

        const OAuth2EnabledApps = [
            {
                enabled_for: [12345, 23456],
            },
        ];

        const { result } = renderHook(() => useIsOAuth2Enabled(OAuth2EnabledApps, true));

        expect(result.current).toBe(true);
    });

    it('should always check the most recent enabled_for list', () => {
        (Constants.getServerInfo as jest.Mock).mockReturnValue({ appId: 67890 });

        const OAuth2EnabledApps = [
            {
                enabled_for: [12345],
            },
            {
                enabled_for: [67890],
            },
        ];

        const { result } = renderHook(() => useIsOAuth2Enabled(OAuth2EnabledApps, true));

        expect(result.current).toBe(true);
    });

    it('should handle edge case with no appId', () => {
        (Constants.getServerInfo as jest.Mock).mockReturnValue({});

        const OAuth2EnabledApps = [
            {
                enabled_for: [12345],
            },
        ];

        const { result } = renderHook(() => useIsOAuth2Enabled(OAuth2EnabledApps, true));

        expect(result.current).toBe(false);
    });
});
