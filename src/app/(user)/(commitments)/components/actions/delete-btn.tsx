'use client';

import { useEffect, useRef, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

import styles from './delete-btn.module.css';

interface Props {
    onDelete?: () => void;
}

export default function DeleteButton({ onDelete = () => undefined }: Props) {
    const [secondsMouseHold, setSecondsMouseHold] = useState(0);
    const intervalRef = useRef(null as unknown as (null | NodeJS.Timer));
    const secondsToDelete = 2;

    const isHoldingStyle = secondsMouseHold !== 0 ? styles['wave-up'] : '';
    if (secondsMouseHold === secondsToDelete) {
        onDelete();
    }

    const startHolding = () => {
        if (intervalRef?.current) {
            return;
        }

        setSecondsMouseHold(() => 1);
        intervalRef.current = setTimeout(() => setSecondsMouseHold((secondsHold) => secondsHold + 1), 1000);
    };

    const stopHolding = () => {
        if (intervalRef?.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setSecondsMouseHold(() => 0);
        }
    };

    useEffect(() => () => stopHolding(), []);

    return (
        <div className={`${styles.circle} cursor-pointer rounded-full border p-1.5 border-red-500 text-red-200`}
            onMouseDown={startHolding}
            onTouchStart={startHolding}
            onMouseUp={stopHolding}
            onMouseLeave={stopHolding}
            onTouchEnd={stopHolding}
        >
            <div className={`${styles.wave} ${isHoldingStyle}`}></div>
            <div className="w-full h-full flex items-center justify-center z-10 relative">
                <AiOutlineDelete size={22} />
            </div>
        </div>
    );
}
