# Auth Client Project

This project is designed to handle authentication using OAuth2 with Hydra and OIDC. The project is divided into two phases:

1. **Phase 1**: OAuth2 with Hydra
2. **Phase 2**: OIDC Public Client (coming soon)

## Table of Contents

-   [Getting Started](#getting-started)
-   [Project Structure](#project-structure)
-   [Phase 1: OAuth2 with Hydra](#phase-1-oauth2-with-hydra)
-   [Phase 2: OIDC Public Client](#phase-2-oidc-public-client)

## Getting Started

### Prerequisites

-   Node.js (>= 14.x)
-   npm (>= 6.x)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/auth-client.git
    cd auth-client
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```

## Phase 1: OAuth2 with Hydra

In this phase, we use OAuth2 with Hydra for authentication.

### Setting Up Hydra

1. Follow the [Hydra documentation](https://service-auth.deriv.team/resources/hydra-qa-setup/) to set up Hydra in QA box environment.
2. Configure your OAuth2 settings in the project.

### Using the OAuth2 Hook

Use the `useOAuth2` hook within your components.

```typescript
import React from 'react';
import { useOAuth2, TOAuth2EnabledAppList } from '@deriv-com/auth-client';

const YourComponent = () => {
     const [OAuth2EnabledApps, OAuth2EnabledAppsInitialised] = useGrowthbookGetFeatureValue<TOAuth2EnabledAppList>({
        featureFlag: 'hydra_be',
    });

    const { logout } = useAuthData(); // Your custom hook or function to handle logout

    const OAuth2GrowthBookConfig = {
       OAuth2EnabledApps,
       OAuth2EnabledAppsInitialised
    };

    const WSLogoutAndRedirect = async () => {
        await logout();
        // Redirect or perform any additional actions here
    };

    const { OAuth2Logout } = useOAuth2(OAuth2GrowthBookConfig, WSLogoutAndRedirect);

    return (
        <div>
            <button onClick={OAuth2Logout}>Logout</button>
        </div>
    );
};

export default YourComponent;

```

## Phase 2: OIDC Public Client

In this phase, we will transition to using an OIDC public client for authentication.

## OIDC Login Flow - https://service-auth.deriv.team/resources/rfc/public-client/#login

1. The app must first fetch the OpenID configuration /.well-known/openid-configuration to find the authorization_endpoint.
2. Get the authorization_endpoint and redirect the user to the authorization_endpoint with the necessary parameters.
3. The authorization server will authenticate the user and redirect the user back to the app with an one time code.
4. Get the token_endpoint from the OpenID configuration and exchange the one time code for an access token and id token.
5. Make a POST request with Bearer token received from the token_endpoint to the legacy_endpoint to get the legacy tokens.
6. Use the legacy tokens to authenticate the user.

### Implementation Details

### Setting Up OIDC Configuration

In this phase, you will configure the OIDC endpoints by dynamically fetching the .well-known/openid-configuration from the server. The OIDC configuration file includes essential details like the authorization_endpoint, token_endpoint, and issuer.

You can modify your configuration in the localStorage or retrieve the necessary details dynamically when required.

### Using the OIDC Authentication Function

```typescript
import { requestOidcAuthentication } from '@deriv-com/auth-client';

const handleLoginClick = async () => {
    const redirect_uri = 'http://your-app/callback'; // The URL to redirect to after successful login
    const postLogoutRedirectUri = 'http://your-app/'; // The URL to redirect to after logging out

    await requestOidcAuthentication(redirect_uri, postLogoutRedirectUri); // If successful, the user will be redirected to the redirectUri
};
```
