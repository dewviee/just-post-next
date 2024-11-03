import dayjsEx from "@/lib/dayjs";
import { Dayjs } from "dayjs";

/**
 * @param date Dayjs: Please check that date is create from custom dayjsEx in lib. or from convertDayjs function.
 *
 * Get the formatted date according to the string of tokens passed in.
 *
 * To escape characters, wrap them in square brackets (e.g. [MM]).
 * ```
 * dayjs().format()// => current date in ISO8601, without fraction seconds e.g. '2020-04-02T08:02:17-05:00'
 * dayjs('2019-01-25').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]')// 'YYYYescape 2019-01-25T00:00:00-02:00Z'
 * dayjs('2019-01-25').format('DD/MM/YYYY') // '25/01/2019'
 * ```
 * Docs: https://day.js.org/docs/en/display/format
 */
export function formatDate(date: Dayjs, format?: string): string {
  return date.format(format ? format : "DD/MM/BBBB");
}

export function convertDate(date: string | Date) {
  return dayjsEx(date);
}

/**
 * Converts specified date fields in an array of objects using the `convertDate` function.
 *
 * @template T - The original type of each object in the input array.
 * @template R - The result type of each object after date fields have been converted.
 * @param {T[]} datas - An array of objects to process, where each object may contain fields to be converted.
 * @param {(keyof T & keyof R)[]} keys - An array of keys in each object of `datas` that should be converted with `convertDate`.
 * @returns {R[]} A new array of objects with specified date fields converted to the result type `R`.
 */
export function convertDateInDatas<
  T extends Record<string, unknown>,
  R extends Record<string, unknown>,
>(datas: T[], keys: (keyof T & keyof R)[]): R[] {
  return datas.reduce((accumulator, data) => {
    const newData = { ...data } as unknown as R;

    keys.forEach((key) => {
      if (typeof newData[key] === "string" || newData[key] instanceof Date) {
        newData[key as keyof R] = convertDate(
          newData[key] as string | Date,
        ) as R[keyof R];
      }
    });

    accumulator.push(newData);
    return accumulator;
  }, [] as R[]);
}
