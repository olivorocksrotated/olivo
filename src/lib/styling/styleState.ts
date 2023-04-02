type State = 'disabled' | 'hover';

export function styleState(state: State, className: string) {
    return className
        .split(/\s/)
        .map((currentClassName) => `${state}:${currentClassName}`)
        .join(' ');
}
