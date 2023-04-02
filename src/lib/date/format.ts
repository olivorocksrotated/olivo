import { formatRelative } from 'date-fns';

export function formatRelativeDate(theDate: Date, relativeTo: Date) {
    const initialFormattedDate = formatRelative(theDate, relativeTo);
    const formattedDateWithoutAt = initialFormattedDate.replace(/ at.*/g, '');
    const formattedDateCapitalized = `${formattedDateWithoutAt.charAt(0).toUpperCase()}${formattedDateWithoutAt.slice(1)}`;

    return formattedDateCapitalized;
}
