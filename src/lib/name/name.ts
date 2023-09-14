const spaceSeparator = /\s/;

export function getNameAcronym(name: string | undefined | null): string {
    if (!name) {
        return '';
    }

    return name
        .split(spaceSeparator)
        .reduce((response, word) => response += word.slice(0, 1), '')
        .substring(0, 2);
}

export function getFirstName(name: string | undefined | null): string {
    if (!name) {
        return '';
    }

    return name.split(spaceSeparator)[0];
}
