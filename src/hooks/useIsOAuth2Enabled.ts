import { useState, useEffect } from 'react';
import { getServerInfo } from '../constants/';

type hydraBEApps = {
    enabled_for: number[];
};

/**
 * Custom hook to determine whether OAuth2 is enabled for a given app id.
 * @param {hydraBEApps[]} OAuth2EnabledApps - an array of Hydra enabled apps
 * @param {boolean} OAuth2EnabledAppsInitialised - a flag indicating whether the array has been initialised
 * @returns {boolean} - a boolean indicating whether OAuth2 is enabled for the current app id
 */
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
