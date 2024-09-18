import { useState, useEffect } from 'react';
import { getServerInfo } from '../constants/';

type hydraBEApps = {
    enabled_for: number[];
};

export const useIsOAuth2Enabled = (
    OAuth2EnabledApps: hydraBEApps[],
    OAuth2EnabledAppsInitialised: boolean
): boolean => {
    const [isOAuth2Enabled, setIsOAuth2Enabled] = useState<boolean>(false);
    const { appId } = getServerInfo();

    useEffect(() => {
        if (OAuth2EnabledAppsInitialised) {
            const FEHydraAppIds = OAuth2EnabledApps.length
                ? (OAuth2EnabledApps[OAuth2EnabledApps.length - 1]?.enabled_for ?? [])
                : [];
            setIsOAuth2Enabled(FEHydraAppIds.includes(+(appId as string)));
        }
    }, [OAuth2EnabledAppsInitialised, OAuth2EnabledApps, appId]);

    return isOAuth2Enabled;
};
