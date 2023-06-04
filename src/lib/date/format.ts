import { format as dateFnsFormat, formatRelative, isMatch, parse } from 'date-fns';
import { enUS } from 'date-fns/locale';

type StringOrDate = string | Date;

const baseDateStringFormat = 'MM/dd/yyyy';

const stringOrDateToDate = (theDate: StringOrDate) => (typeof theDate === 'string' ? new Date(theDate) : theDate);
const isFullDate = (stringDate: string) => isMatch(stringDate, baseDateStringFormat);
const capitalizeString = (stringDate: string) => `${stringDate.charAt(0).toUpperCase()}${stringDate.slice(1)}`;
const invertMonthsAndDays = (theDate: string, relativeTo: Date) => dateFnsFormat(parse(theDate, baseDateStringFormat, relativeTo, { locale: enUS }), 'dd/MM/yyyy');

export function getRelativeDate(theDate: StringOrDate, relativeTo: Date) {
    const dateToFormat = stringOrDateToDate(theDate);

    const initialFormattedDate = formatRelative(dateToFormat, relativeTo, { locale: enUS });

    return isFullDate(initialFormattedDate) ?
        invertMonthsAndDays(initialFormattedDate, relativeTo) :
        capitalizeString(initialFormattedDate);
}

export function getRelativeDateWithoutTime(theDate: StringOrDate, relativeTo: Date) {
    return getRelativeDate(theDate, relativeTo).replace(/ at.*/g, '');
}

export function formatDate(theDate: StringOrDate, format: string = 'yyyy-MM-dd') {
    const dateToFormat = stringOrDateToDate(theDate);

    return dateFnsFormat(dateToFormat, format, { locale: enUS });
}

export function dateInputToISOString(dateInput: string | undefined) {
    if (!dateInput) {
        return '';
    }

    return new Date(dateInput).toISOString();
}
