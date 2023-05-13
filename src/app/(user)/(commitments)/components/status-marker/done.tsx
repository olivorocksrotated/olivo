import clsx from 'clsx';

import { styleState } from '@/lib/styling/styleState';

export default function DoneStatusMarker() {
    const afterStyle = styleState('after', 'absolute right-[4px] top-[1.5px] box-border block h-[8px] w-[5px] origin-bottom-left border-b-2 border-l-0 border-r-2 border-t-0 border-green-600 content-[""]');
    const styles = clsx(
        'relative box-border block h-4 w-4 rotate-45 rounded-full border-2 border-green-600',
        afterStyle
    );

    return (<i title="Done" className={styles} />);
}
