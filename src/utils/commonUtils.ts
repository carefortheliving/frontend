import moment from 'moment';
import mime from 'mime-types';

export const getCurrentTime = () => {
  const time = moment().valueOf();
  return time;
};

export const parseTime = (milliseconds: number | undefined) => {
  return milliseconds ?
    moment.utc(milliseconds).local().format('DD MMM YYYY hh:mm a') :
    undefined;
};

export const downloadFile = (content, fileName, contentType = mime.lookup(fileName)) => {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

export const getUrlKey = (key: string, defaultVal?: any) => {
  const currentUrlParams = new URLSearchParams(window.location.search);
  return currentUrlParams.get(key) || defaultVal;
};
