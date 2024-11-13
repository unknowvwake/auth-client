import { useState, useEffect } from 'react';
import { LegacyTokens, requestLegacyToken, requestOidcToken } from '../../oidc';
// @ts-expect-error blabla
import ErrorIcon from '../../assets/404.svg?react';

import './Callback.scss';
import { OIDCError, OIDCErrorType } from '../../oidc/error';

const Loading = () => (
    <div className={`barspinner barspinner--dark dark`}>
        {Array.from(new Array(5)).map((_, inx) => (
            <div key={inx} className={`barspinner__rect barspinner__rect--${inx + 1} rect${inx + 1}`} />
        ))}
    </div>
);

type CallbackProps = {
    onSignInSuccess?: (tokens: LegacyTokens) => void;
    onSignInError?: (error: Error) => void;
    redirectUri: string;
    postLogoutRedirectUri?: string;
    onClickReturn?: () => void;
    errorMessage?: string;
};

export const Callback = ({
    onClickReturn,
    onSignInSuccess,
    onSignInError,
    redirectUri,
    postLogoutRedirectUri,
    errorMessage,
}: CallbackProps) => {
    const [error, setError] = useState<Error | null>(null);

    const fetchTokens = async () => {
        try {
            const { accessToken } = await requestOidcToken(redirectUri, postLogoutRedirectUri);

            if (accessToken) {
                const legacyTokens = await requestLegacyToken(accessToken);

                onSignInSuccess?.(legacyTokens);
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err);
                onSignInError?.(err);
            }
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const oneTimeCode = params.get('code');

        if (oneTimeCode) {
            fetchTokens();
        } else {
            setError(
                new OIDCError(
                    OIDCErrorType.OneTimeCodeMissing,
                    'the one time code was not returned by the authorization server'
                )
            );
        }
    }, []);

    return (
        <div className='callback-container'>
            <div className='callback-container__header'>
                <svg width='72' height='24' viewBox='0 0 72 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                        d='M14.4238 0.808863L13.1912 7.79644H8.91248C4.92071 7.79644 1.11591 11.0293 0.410715 15.0195L0.112228 16.7179C-0.589682 20.7082 2.07366 23.9411 6.06543 23.9411H9.63407C12.5434 23.9411 15.315 21.5869 15.8267 18.6787L19.1133 0.0552979L14.4238 0.808863ZM11.3878 18.0196C11.2304 18.918 10.4213 19.6492 9.52256 19.6492H7.35448C5.56031 19.6492 4.35984 18.1934 4.67471 16.3966L4.86168 15.3376C5.17983 13.5441 6.89199 12.0851 8.68615 12.0851H12.4347L11.3878 18.0196ZM47.3757 23.9408L50.1834 8.01904H54.6245L51.8168 23.9408H47.3757ZM47.8561 8.20264C47.6335 9.46551 47.4099 10.7284 47.1873 11.9913C45.0833 11.3377 42.9125 11.5458 42.2456 11.6788C41.5254 15.7671 40.8042 19.8564 40.083 23.9447H35.6389C36.2424 20.5239 38.3042 8.84149 38.3042 8.84149C39.7496 8.24317 43.2991 7.02889 47.8561 8.20264ZM29.8494 7.79374H26.3924C23.0238 7.79374 19.8128 10.5217 19.219 13.8889L18.5204 17.8464C17.9267 21.2137 20.1736 23.9417 23.5422 23.9417H30.8959L31.6503 19.6629H24.7392C23.6175 19.6629 22.8664 18.7546 23.0665 17.63L23.0895 17.4956H34.2316L34.8679 13.8889C35.4615 10.5217 33.2148 7.79374 29.8462 7.79374H29.8494ZM30.4103 13.548L30.3841 13.7775H23.7586L23.7947 13.5742C23.9947 12.4528 25.0181 11.4659 26.143 11.4659H28.731C29.843 11.4659 30.5941 12.4365 30.4103 13.548ZM67.5083 8.01904H71.9526C70.4387 12.0426 66.9691 18.887 63.6082 23.9408H59.1639C57.6212 19.1308 56.625 12.429 56.4349 8.01904H60.8794C60.9596 9.45755 61.6038 14.7933 62.339 18.5208C64.3555 14.8945 66.5786 10.1366 67.5049 8.01904H67.5083Z'
                        fill='currentcolor'
                    ></path>
                </svg>
            </div>
            <div className='callback-container__error'>
                {!error && (
                    <div className='callback-container__loading'>
                        <Loading />
                    </div>
                )}
                {!error && <h3>We are logging you in...</h3>}
                {error && <ErrorIcon height={454} />}
                {error && <h3>There was an issue logging you in</h3>}
                {error && <p>{errorMessage || error.message}</p>}
                {error && <button onClick={onClickReturn}>Return to SmartTrader</button>}
            </div>
        </div>
    );
};
