import moment from 'moment';

export const getCurrentTime = () => {
  const time = moment().valueOf();
  return time;
};

export const parseTime = (milliseconds: number | undefined) => {
  return milliseconds ? moment.utc(milliseconds).local().format('DD MMM YYYY hh:mm a') : undefined;
};
