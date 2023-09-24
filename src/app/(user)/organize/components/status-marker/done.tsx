import clsx from 'clsx';

export default function DoneStatusMarker() {
    const styles = clsx(
        'relative box-border block h-4 w-4 rotate-45 rounded-full border-2 border-green-600',
        'after:absolute after:right-[4px] after:top-[1.5px] after:box-border after:block after:h-[8px] after:w-[5px] after:origin-bottom-left after:border-b-2 after:border-l-0 after:border-r-2 after:border-t-0 after:border-green-600 after:content-[""]'
    );

    return (<i title="Done" className={styles} />);
}
