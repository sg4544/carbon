export class DateManager {
  static convertDate(date: Date) {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  static addYear(date: Date, value: number) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return this.convertDate(new Date(year + value, month, day));
  }
  static toDays(from: Date, to: Date) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = from.getTime();
    const secondDate = to.getTime();

    return Math.round(Math.abs((firstDate - secondDate) / oneDay)) - 1; //exclusive of to date
  }
}
