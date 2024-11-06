export enum OIDCErrorType {
    FailedToFetchOIDCConfiguration = "FailedToFetchOIDCConfiguration",
    AuthenticationRequestFailed = "AuthenticationRequestFailed",
    AccessTokenRequestFailed = "AccessTokenRequestFailed",
    LegacyTokenRequestFailed = "LegacyTokenRequestFailed",
    UserManagerCreationFailed = "UserManagerCreationFailed"
}

export class OIDCError extends Error {
    constructor(type: OIDCErrorType) {
        let message = '';
        switch (type) {
            case OIDCErrorType.FailedToFetchOIDCConfiguration:
                message = 'Failed to fetch OIDC configuration'
                break
            case OIDCErrorType.AuthenticationRequestFailed:
                message = 'Authentication request failed'
                break
            case OIDCErrorType.AccessTokenRequestFailed:
                message = 'Unable to request access tokens'
                break
            case OIDCErrorType.LegacyTokenRequestFailed:
                message = 'Unable to request legacy tokens'
                break
            case OIDCErrorType.UserManagerCreationFailed:
                message = 'Unable to create user manager for OIDC'
                break
            default:
                message = 'There was an issue in authenticating the user'
        }
        super(message);
        this.name = type;
    }
}