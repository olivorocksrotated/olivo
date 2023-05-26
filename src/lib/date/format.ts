import { format as dateFnsFormat, formatRelative } from 'date-fns';
import { enUS } from 'date-fns/locale';

export function formatRelativeDateWithTime(theDate: string | Date, relativeTo: Date) {
    const dateToFormat = typeof theDate === 'string' ? new Date(theDate) : theDate;

    const initialFormattedDate = formatRelative(dateToFormat, relativeTo, { locale: enUS });
    const formattedDateCapitalized = `${initialFormattedDate.charAt(0).toUpperCase()}${initialFormattedDate.slice(1)}`;

    return formattedDateCapitalized;
}

export function formatRelativeDate(theDate: string | Date, relativeTo: Date) {
    return formatRelativeDateWithTime(theDate, relativeTo).replace(/ at.*/g, '');
}

export function formatDate(theDate: string | Date, format: string = 'yyyy-MM-dd') {
    const dateToFormat = typeof theDate === 'string' ? new Date(theDate) : theDate;

    return dateFnsFormat(dateToFormat, format, { locale: enUS });
}
