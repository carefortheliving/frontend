// import firebase from "firebase";
import moment from 'moment';

export const getCurrentTime = () => {
  const time = moment().valueOf();
  return time;
};

export const parseTime = (milliseconds: number | undefined) => (milliseconds ? moment.utc(milliseconds).local().format('DD MMM YYYY hh:mm a') : undefined);
