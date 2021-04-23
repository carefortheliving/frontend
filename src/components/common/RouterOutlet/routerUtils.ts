export const getHomeRoute = () => '/';

export const getLoginRoute = () => '/login';

export const getCreateRequestRoute = () => '/request/create';

export const getEditRequestRoute = (docId: string) => `/request/edit/${docId}`;

export const getViewRequestRoute = (docId: string) => `/request/view/${docId}`;

export const getSayThanksRoute = (docId: string) => `/thank/${docId}`;

export const getAboutRoute = () => '/about';
