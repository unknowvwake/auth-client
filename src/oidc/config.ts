export const getConfigurations = () => {
    const postLoginRedirectUri = localStorage.getItem('config.post_login_redirect_uri') || window.location.origin;
    const postLogoutRedirectUri = localStorage.getItem('config.post_logout_redirect_uri') || window.location.origin;

    return {
        postLoginRedirectUri,
        postLogoutRedirectUri,
    };
};
