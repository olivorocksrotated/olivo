'use client';

import { Commitment as CommitmentModel, CommitmentStatus } from '@prisma/client';
import { AiFillPlayCircle, AiOutlineCheckCircle, AiOutlineFieldTime } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { styleState } from '@/lib/styling/styleState';

type Commitment = Pick<CommitmentModel, 'status'>
interface Props {
    commitment: Commitment
    onStart?: (commitment: Commitment) => void;
    onDone?: (commitment: Commitment) => void;
}

function StartButton({ onAnimationComplete }: { onAnimationComplete: () => void}) {
    const [animationStage, setAnimationStage] = useState(0);

    const handleOnClick = () => {
        setAnimationStage(1);
    };

    const handleOnRest = () => {
        // eslint-disable-next-line no-extra-parens
        setAnimationStage((prevStage) => (prevStage === 1 ? 2 : prevStage === 2 ? 3 : 0));
    };

    const iconVariants = {
        start: { x: 0 },
        end: { x: 'calc(100% - 60px)' }
    };
    const textVariants = {
        done: { opacity: 0, transition: { duration: 0.3 } }
    };

    const transition = { duration: 1, ease: 'easeInOut' };

    return (
        <div className="w-full h-8 relative">
            <AnimatePresence>
                <motion.div key="wrapper" layout className="flex absolute right-0 items-center border border-indigo-300 justify-between rounded-lg p-1">
                    {(animationStage === 0 || animationStage === 1 || animationStage === 2) && (
                        <motion.div key="play"
                            initial={animationStage === 0 ? 'start' : undefined}
                            animate={animationStage === 1 ? 'end' : undefined}
                            variants={iconVariants}
                            transition={transition}
                            onAnimationComplete={animationStage === 1 ? handleOnRest : undefined}
                        >
                            <AiFillPlayCircle className="inline-block cursor-pointer"
                                onClick={animationStage === 0 ? handleOnClick : undefined}
                            />
                        </motion.div>
                    )}
                    {animationStage === 3 && (
                        <motion.div key="check"
                            // className='w-full absolute left-2'
                            initial="end"
                            animate={animationStage === 3 ? 'start' : undefined}
                            variants={iconVariants}
                            transition={transition}
                            //   onAnimationComplete={animationStage === 2 ? handleOnRest : undefined}
                        >
                            <AiOutlineFieldTime size={25} />
                        </motion.div>
                    )}
                    {(animationStage === 0 || animationStage === 1 || animationStage === 2) && (
                        <motion.div key="start" onAnimationComplete={animationStage === 2 ? handleOnRest : undefined} initial={{ opacity: 1 }} variants={textVariants} animate={animationStage === 2 ? 'done' : undefined}>Start</motion.div>)}
                    {animationStage === 3 && (
                        <motion.div key="ip" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>In progress</motion.div>)}
                </motion.div>
            </AnimatePresence>
        </div>
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
            <>
                {!isStarted ?
                    <StartButton onAnimationComplete={handleOnStart}></StartButton> :
                    <><AiOutlineFieldTime size={25} className="inline-block mr-2" />In progress</>}
            </> :
            <div className="rounded-full border p-1 pr-3 border-green-500 text-green-300">
                <AiOutlineCheckCircle size={25} className="inline-block mr-2" />Done
            </div>
    );
}
