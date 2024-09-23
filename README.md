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

### Using the OAuth2 Provider

Use the `useOAuth2` hook within your components.

```typescript
// src/App.tsx
import React from 'react';
import { useOAuth2 } from '@deriv-com/auth-client';

const YourComponent = () => {
     const [OAuth2EnabledApps, OAuth2EnabledAppsInitialised] = useGrowthbookGetFeatureValue<hydraBEApps>({
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

In this phase, we will transition to using an OIDC public client for authentication. Currently phase 1 is in development and OIDC public client will be implemented in the next phase.
