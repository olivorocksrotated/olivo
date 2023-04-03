'use client';

import { Commitment as CommitmentModel, CommitmentStatus } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { AiFillPlayCircle, AiOutlineCheckCircle, AiOutlineFieldTime } from 'react-icons/ai';

import { styleState } from '@/lib/styling/styleState';

type Commitment = Pick<CommitmentModel, 'status'>
interface Props {
    commitment: Commitment
    onStart?: (commitment: Commitment) => void;
    onDone?: (commitment: Commitment) => void;
}

type TextProps = {
    text: string;
    replay: boolean;
    onAnimationComplete?: () => void,
    initial?: 'hidden' | 'visible';
    className: string
};

function Text({ text, replay, onAnimationComplete = () => null, initial = 'visible', className }: TextProps) {
    const duration = 0.1;
    const letters: string[] = Array.from(text);
    const staggerDirection = initial === 'visible' ? 1 : -1;

    const container = {
        hidden: {
            opacity: 0,
            transition: { delay: 1, staggerChildren: duration, staggerDirection }
        },
        visible: {
            opacity: 1,
            transition: { staggerChildren: duration, staggerDirection }
        }
    };

    const child = {
        visible: {
            opacity: 1,
            transition: {
                type: 'spring',
                damping: 20,
                stiffness: 400
            }
        },
        hidden: {
            opacity: 0,
            transition: {
                type: 'spring',
                damping: 20,
                stiffness: 400
            }
        }
    };

    return (
        <motion.h1 layout className={`flex overflow-hidden ${className}`} variants={container}
            initial={initial}
            animate={replay ? initial === 'hidden' ? 'visible' : 'hidden' : undefined}
            onAnimationComplete={onAnimationComplete}
        >
            {letters.map((letter, index) => (
                <motion.span key={index} variants={child}>
                    {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
            ))}
        </motion.h1>
    );
}

function StartButton({
    onAnimationComplete = () => undefined
}: { onAnimationComplete?: () => void }) {
    const [animationStage, setAnimationStage] = useState(0);

    const handleOnRest = () => {
        // eslint-disable-next-line no-extra-parens
        setAnimationStage((prevStage) => (prevStage === 1 ? 2 : prevStage === 2 ? 3 : 1));
    };

    const handleOnEnd = () => {
        onAnimationComplete();
    };

    const iconVariants = {
        start: { width: 80 },
        mid: { width: 40 },
        end: { width: 115 }
    };

    const transition = { duration: 1.2 };

    return (
        <AnimatePresence>
            <motion.div layout
                key="container"
                className="relative h-8 justify-start overflow-hidden items-center flex rounded-full border p-1 pr-3 border-indigo-500"
                initial="start"
                animate={animationStage === 1 ? 'mid' : animationStage === 2 ? 'end' : undefined}
                variants={iconVariants}
                transition={transition}
                onAnimationComplete={animationStage === 1 ? handleOnRest : undefined}
            >
                {animationStage < 3 && (<motion.div animate={animationStage === 2 ? { opacity: 0, width: 0 } : undefined}><AiFillPlayCircle className="cursor-pointer h-8 mr-2" size={25} onClick={() => setAnimationStage(1)} /></motion.div>)}
                {animationStage > 1 && (<AiOutlineFieldTime className="h-8 mr-2" size={25} />)}
                {(animationStage === 0 || animationStage === 1) && (<Text className="absolute right-2" text="Start" replay={animationStage === 1}></Text>)}
                {animationStage === 2 && (<Text text="In progress" replay={animationStage === 2} onAnimationComplete={handleOnEnd} className="absolute right-2" initial="hidden"></Text>)}
            </motion.div>
        </AnimatePresence>
    );
}

export default function StatusButton({
    commitment,
    onStart = () => undefined,
    onDone = () => undefined
}: Props) {
    const handleOnStart = () => onStart(commitment);
    const handleOnDone = () => onDone(commitment);

    const isStarted = commitment.status === CommitmentStatus.InProgress;
    const isDone = commitment.status === CommitmentStatus.Done;
    const styleDisabled = styleState('disabled', 'text-gray-400 border-gray-400 cursor-not-allowed');

    return (
        !isDone ?
            <div>
                {!isStarted ?
                    <StartButton onAnimationComplete={handleOnStart}></StartButton> :
                    <div className="rounded-full border p-1 pr-3 border-indigo-500 h-8"><AiOutlineFieldTime size={25} className="inline-block mr-2" />In progress</div>}
            </div> :
            <div>
                <button onClick={handleOnDone}
                    type="button"
                    disabled={!isStarted}
                    className={`rounded-full border p-1 border-green-500 text-green-300 ${styleDisabled}`}
                >
                    <AiOutlineCheckCircle size={25} />
                </button>
            </div>
    );
}
