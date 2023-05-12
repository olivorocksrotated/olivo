import { format as dateFnsFormat, formatRelative } from 'date-fns';
import { enUS } from 'date-fns/locale';

export function formatRelativeDate(theDate: Date, relativeTo: Date) {
    const initialFormattedDate = formatRelative(theDate, relativeTo, { locale: enUS });
    const formattedDateWithoutAt = initialFormattedDate.replace(/ at.*/g, '');
    const formattedDateCapitalized = `${formattedDateWithoutAt.charAt(0).toUpperCase()}${formattedDateWithoutAt.slice(1)}`;

    return formattedDateCapitalized;
}

export function formatStringDate(theDate: string, format: string = 'yyyy-MM-dd') {
    return dateFnsFormat(new Date(theDate), format, { locale: enUS });
}
