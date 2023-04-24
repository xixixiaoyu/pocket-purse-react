export type DateKind =
  | 'year'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond';

export const time = (d?: Date | string | number) => {
  return new Time(d);
};
export class Time {
  #date: Date;
  constructor(d?: Date | string | number) {
    this.#date = d ? new Date(d) : new Date();
  }

  get dateObject() {
    return {
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second,
      millisecond: this.millisecond,
    };
  }

  set dateObject(d: Partial<Record<DateKind, number>>) {
    this.year = d.year ?? this.year;
    this.month = d.month ?? this.month;
    this.day = d.day ?? this.day;
    this.hour = d.hour ?? this.hour;
    this.minute = d.minute ?? this.minute;
    this.second = d.second ?? this.second;
    this.millisecond = d.millisecond ?? this.millisecond;
  }

  get date() {
    return new Date(this.#date);
  }

  setDate(d: Partial<Record<DateKind, number>>) {
    this.year = d.year ?? this.year;
    this.month = d.month ?? this.month;
    this.day = d.day ?? this.day;
    this.hour = d.hour ?? this.hour;
    this.minute = d.minute ?? this.minute;
    this.second = d.second ?? this.second;
    this.millisecond = d.millisecond ?? this.millisecond;
    return this;
  }

  get lastDayOfMonth() {
    return new Time(new Date(this.year, this.month, 0));
  }

  get timestamp() {
    return this.#date.getTime();
  }

  get year() {
    return this.#date.getFullYear();
  }

  set year(y) {
    this.#date.setFullYear(y);
  }

  get month() {
    return this.#date.getMonth() + 1;
  }

  set month(m) {
    this.#date.setMonth(m - 1);
  }

  get day() {
    return this.#date.getDate();
  }

  set day(d) {
    this.#date.setDate(d);
  }

  get hour() {
    return this.#date.getHours();
  }

  set hour(h) {
    this.#date.setHours(h);
  }

  get minute() {
    return this.#date.getMinutes();
  }

  set minute(m) {
    this.#date.setMinutes(m);
  }

  get second() {
    return this.#date.getSeconds();
  }

  set second(s) {
    this.#date.setSeconds(s);
  }

  get millisecond() {
    return this.#date.getMilliseconds();
  }

  set millisecond(ms) {
    this.#date.setMilliseconds(ms);
  }

  add(num: number, key: DateKind) {
    const newDate = new Time(this.#date);
    newDate[key] += num;
    return newDate;
  }

  format(fmt = 'yyyy-MM-dd') {
    return fmt
      .replace(/yyyy/g, this.year.toString())
      .replace(/MM/g, this.month.toString().padStart(2, '0'))
      .replace(/dd/g, this.day.toString().padStart(2, '0'))
      .replace(/HH/g, this.hour.toString().padStart(2, '0'))
      .replace(/mm/g, this.minute.toString().padStart(2, '0'))
      .replace(/ss/g, this.second.toString().padStart(2, '0'))
      .replace(/SSS/g, this.millisecond.toString().padStart(3, '0'));
  }

  clone() {
    return new Time(this.#date);
  }
}
