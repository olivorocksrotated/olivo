import { format as dateFnsFormat, formatRelative } from 'date-fns';
import { enUS } from 'date-fns/locale';

export function formatRelativeDate(theDate: string | Date, relativeTo: Date) {
    const dateToFormat = typeof theDate === 'string' ? new Date(theDate) : theDate;

    const initialFormattedDate = formatRelative(dateToFormat, relativeTo, { locale: enUS });
    const formattedDateWithoutAt = initialFormattedDate.replace(/ at.*/g, '');
    const formattedDateCapitalized = `${formattedDateWithoutAt.charAt(0).toUpperCase()}${formattedDateWithoutAt.slice(1)}`;

    return formattedDateCapitalized;
}

export function formatDate(theDate: string | Date, format: string = 'yyyy-MM-dd') {
    const dateToFormat = typeof theDate === 'string' ? new Date(theDate) : theDate;

    return dateFnsFormat(dateToFormat, format, { locale: enUS });
}
