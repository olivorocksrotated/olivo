const spaceSeparator = /\s/;

export function getNameAcronym(name: string): string {
    return name.split(spaceSeparator).reduce((response, word) => response += word.slice(0, 1), '');
}

export function getFirstName(name: string): string {
    return name.split(spaceSeparator)[0];
}
