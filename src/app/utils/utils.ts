import * as moment from 'moment-timezone';

export const INPUT_DATE_FORMAT = 'YYYY-MM-DD';
const DEFAULT_TIMEZONE = 'America/Guayaquil';

export class Utils {
  static transformTimestampToString(date: number, format = INPUT_DATE_FORMAT): string {
    if (!date) return '';
    return moment.tz(date, DEFAULT_TIMEZONE).format(format);
  }

  static delay(seconds: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, seconds * 1000);
    });
  }
}
