import clsx from 'clsx';

export default function PastStatusMarker() {
    const styles = clsx(
        'relative box-border block h-4 w-4 rounded-full border-2 border-red-400',
        'after:absolute after:left-[5px] after:top-[3px] after:box-border after:block after:h-1 after:w-1 after:border-b after:border-l after:border-red-400 after:content-[""]'
    );

    return (<i title="Past" className={styles} />);
}
