import React from 'react';
type OAuth2ContextValue = {
    OAuth2Logout: () => void;
};
type OAuth2ProviderProps = {
    children: React.ReactNode;
    logout: () => Promise<void>;
    oauthUrl: string;
};
export declare const OAuth2Context: React.Context<OAuth2ContextValue | undefined>;
export declare const OAuth2Provider: React.FC<OAuth2ProviderProps>;
export {};
