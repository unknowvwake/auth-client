import { OIDCError, OIDCErrorType } from '../error';

describe('OIDCError', () => {
    it('should create an error with the correct type and message for AccessTokenRequestFailed', () => {
        const type = OIDCErrorType.AccessTokenRequestFailed;
        const message = 'Failed to request access token';
        const error = new OIDCError(type, message);

        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe(type);
        expect(error.message).toBe(message);
        expect(error.type).toBe(type);
    });

    it('should create an error with the correct type and message for FailedToFetchOIDCConfiguration', () => {
        const type = OIDCErrorType.FailedToFetchOIDCConfiguration;
        const message = 'Failed to fetch OIDC configuration';
        const error = new OIDCError(type, message);

        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe(type);
        expect(error.message).toBe(message);
        expect(error.type).toBe(type);
    });

    it('should create an error with the correct type and message for AuthenticationRequestFailed', () => {
        const type = OIDCErrorType.AuthenticationRequestFailed;
        const message = 'Authentication request failed';
        const error = new OIDCError(type, message);

        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe(type);
        expect(error.message).toBe(message);
        expect(error.type).toBe(type);
    });

    it('should create an error with the correct type and message for LegacyTokenRequestFailed', () => {
        const type = OIDCErrorType.LegacyTokenRequestFailed;
        const message = 'Legacy token request failed';
        const error = new OIDCError(type, message);

        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe(type);
        expect(error.message).toBe(message);
        expect(error.type).toBe(type);
    });

    it('should create an error with the correct type and message for UserManagerCreationFailed', () => {
        const type = OIDCErrorType.UserManagerCreationFailed;
        const message = 'User manager creation failed';
        const error = new OIDCError(type, message);

        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe(type);
        expect(error.message).toBe(message);
        expect(error.type).toBe(type);
    });

    it('should create an error with the correct type and message for OneTimeCodeMissing', () => {
        const type = OIDCErrorType.OneTimeCodeMissing;
        const message = 'One-time code is missing';
        const error = new OIDCError(type, message);

        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe(type);
        expect(error.message).toBe(message);
        expect(error.type).toBe(type);
    });
});
