type State = 'disabled' | 'hover' | 'hover:enabled' | 'after' | 'before';

export function styleState(state: State, className: string) {
    return className
        .split(/\s/)
        .map((currentClassName) => `${state}:${currentClassName}`)
        .join(' ');
}
