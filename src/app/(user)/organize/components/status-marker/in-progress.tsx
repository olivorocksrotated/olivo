import clsx from 'clsx';

export default function InProgressStatusMarker() {
    const styles = clsx(
        'relative box-border block h-4 w-4 rounded-full border-2 border-yellow-500',
        'after:absolute after:left-1.5 after:top-0.5 after:box-border after:block after:h-2 after:w-1 after:rounded-e-full after:bg-yellow-500 after:content-[""]'
    );

    return (<i title="In progress" className={styles} />);
}
