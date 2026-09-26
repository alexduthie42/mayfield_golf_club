import {
  InteractionRequiredAuthError,
  PublicClientApplication,
  type AccountInfo,
  type AuthenticationResult,
} from '@azure/msal-browser';

const tenantId = '7df174cd-962a-412a-bca0-c22c0c974e00';
export const adminScopes = ['api://6a8f5e0b-e4de-4edf-8458-4d5fdf29e52e/access_as_user'];

const publicBasePath = new URL(
  process.env.PUBLIC_URL || '/',
  window.location.origin
).pathname.replace(/\/$/, '');

export const adminRedirectUri = `${window.location.origin}${publicBasePath}/admin`;

export const isAdminPath = (pathname: string): boolean => {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  return normalizedPath === '/admin' || normalizedPath === `${publicBasePath}/admin`;
};

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: '6a8f5e0b-e4de-4edf-8458-4d5fdf29e52e',
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: adminRedirectUri,
    postLogoutRedirectUri: adminRedirectUri,
  },
  cache: {
    cacheLocation: 'sessionStorage',
  },
});

let initialization: Promise<AuthenticationResult | null> | undefined;

export const initializeEntraAuth = (): Promise<AuthenticationResult | null> => {
  if (!initialization) {
    initialization = (async () => {
      await msalInstance.initialize();
      return msalInstance.handleRedirectPromise();
    })();
  }
  return initialization;
};

export const getAdminAccount = (
  redirectResult: AuthenticationResult | null
): AccountInfo | null => {
  const account = redirectResult?.account ??
    msalInstance.getActiveAccount() ??
    msalInstance.getAllAccounts()[0] ??
    null;

  if (account) {
    msalInstance.setActiveAccount(account);
  }

  return account;
};

export const acquireAdminAccessToken = async (
  account: AccountInfo
): Promise<string | null> => {
  try {
    const result = await msalInstance.acquireTokenSilent({
      account,
      scopes: adminScopes,
    });
    return result.accessToken;
  } catch (error) {
    if (!(error instanceof InteractionRequiredAuthError)) {
      throw error;
    }

    await msalInstance.acquireTokenRedirect({
      account,
      scopes: adminScopes,
    });
    return null;
  }
};
