import { Set } from 'constants/Set';
import { DEFALUT_SET_COUNTS } from './const';

export const setDefaulSetAndRepList = (startIndex: number = 0) => {
  const list = new Array<Set>();
  for (let index = startIndex; index < DEFALUT_SET_COUNTS; index++) {
    list.push({
      reps: 0,
      weight: 0,
      sort_at: index,
    });
  }
  return list;
};

export const toHyphenDateFormat = (date: Date): string => {
  let format = 'YYYY-MM-DD';

  format = format.replace(/YYYY/, date.getFullYear().toString());
  format = format.replace(/MM/, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/DD/, ('0' + date.getDate()).slice(-2));

  return format;
};

export const toNoSepDateFormat = (date: Date): number => {
  return Number(
    date.getFullYear() +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      ('0' + date.getDate()).slice(-2) +
      ('0' + date.getHours()).slice(-2) +
      ('0' + date.getMinutes()).slice(-2) +
      ('0' + date.getSeconds()).slice(-2) +
      date.getMilliseconds(),
  );
};
