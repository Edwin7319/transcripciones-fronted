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

  static downloadFile = (file: BlobPart, tipo: string, nombre: string): void => {
    const blob = new Blob([file], {
      type: tipo,
    });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', nombre);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
}
