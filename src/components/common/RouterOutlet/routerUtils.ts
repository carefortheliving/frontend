export const getHomeRoute = () => {
  return `/`;
};

export const getLoginRoute = () => {
  return `/login`;
};

export const getCreateRequestRoute = () => {
  return `/request/create`;
};

export const getEditRequestRoute = (docId: string) => {
  return `/request/edit/${docId}`;
};

export const getViewRequestRoute = (docId: string) => {
  return `/request/view/${docId}`;
};

export const getCreateDonationRoute = () => {
  return `/donation/create`;
};

export const getEditDonationRoute = (docId: string) => {
  return `/donation/edit/${docId}`;
};

export const getViewDonationRoute = (docId: string) => {
  return `/donation/view/${docId}`;
};

export const getSayThanksRoute = (docId: string) => {
  return `/thank/${docId}`;
};

export const getAboutRoute = () => {
  return `/about`;
};

export const getAdminPortalRoute = () => {
  return `/admin`;
};
