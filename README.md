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

Wrap your application with the `OAuth2Provider` and use the `useOAuth` hook within your components.

```typescript
// src/App.tsx
import React from 'react';
import { OAuth2Provider } from './context/auth-context';
import useOAuth from './hooks/useOAuth';
import { useAuthData } from '@deriv-com/api-hooks';

const App: React.FC = () => {
    const { logout } = useAuthData();
    const oauthUrl = 'https://your-oauth-url.com';

    return (
        <OAuth2Provider logout={logout} oauthUrl={oauthUrl}>
            <YourComponent />
        </OAuth2Provider>
    );
};

const YourComponent: React.FC = () => {
    const { oAuth2Logout } = useOAuth();

    return (
        <div>
            <button onClick={oAuth2Logout}>Logout</button>
        </div>
    );
};

export default App;
```

## Phase 2: OIDC Public Client

In this phase, we will transition to using an OIDC public client for authentication. Currently phase 1 is in development and OIDC public client will be implemented in the next phase.
