import { DateTime } from "luxon";

export const compareDate = (date) => {

  const currentDate = DateTime.now().setZone('Asia/Jakarta');
  const dateToCompare = DateTime.fromISO(date).setZone('Asia/Jakarta');
  return currentDate.hasSame(dateToCompare, 'day')
};