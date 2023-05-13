import clsx from 'clsx';

import { styleState } from '@/lib/styling/styleState';

export default function InProgressStatusMarker() {
    const afterStyle = styleState('after', 'absolute left-1.5 top-0.5 box-border block h-2 w-1 rounded-e-full bg-yellow-500 content-[""]');
    const styles = clsx(
        'relative box-border block h-4 w-4 rounded-full border-2 border-yellow-500',
        afterStyle
    );

    return (<i title="In progress" className={styles} />);
}
