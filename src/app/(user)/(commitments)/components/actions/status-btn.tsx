'use client';

import { CommitmentStatus } from '@prisma/client';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { AiFillPlayCircle, AiOutlineCheckCircle, AiOutlineFieldTime } from 'react-icons/ai';

type TextProps = {
    text: string;
    onAnimationComplete: () => void,
    initial?: 'hidden' | 'visible';
};

function Text({ text, onAnimationComplete, initial = 'visible' }: TextProps) {
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
        <motion.h1 layout className="flex overflow-hidden absolute right-2" variants={container}
            initial={initial}
            animate={initial === 'hidden' ? 'visible' : 'hidden'}
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

enum AnimationStage {
    RestingStart = 0,
    TransitionStartFadeOut = 1,
    TransitionInProgressFadeIn = 2,
    RestingInProgress = 3,
    TransitionInProgressFadeOut = 4,
    RestingDone = 5
}

function StartButton({
    onAnimationStageChanged,
    initialStage
}: { onAnimationStageChanged: (newState: AnimationStage) => void, initialStage: AnimationStage; }) {
    const [animationStage, setAnimationStage] = useState(initialStage);
    // eslint-disable-next-line react/hook-use-state
    const [isHovered, setIsHovered] = useState(false);

    const handleOnRest = () => {
        // eslint-disable-next-line no-extra-parens
        setAnimationStage((prevStage) => prevStage + 1);
        onAnimationStageChanged(animationStage + 1);
    };

    const iconVariants = {
        [AnimationStage.RestingStart]: { width: 100 },
        [AnimationStage.TransitionStartFadeOut]: { width: 40, transition: { duration: 2.2 } },
        [AnimationStage.TransitionInProgressFadeIn]: { width: 140 },
        [AnimationStage.RestingInProgress]: { width: 140 },
        [AnimationStage.TransitionInProgressFadeOut]: { width: 50, backgroundColor: '#11ca74', transition: { duration: 2.2 } },
        [AnimationStage.RestingDone]: { width: 50, backgroundColor: '#11ca74' }
    };

    const transition = { duration: 1.2 };

    return (
        <AnimatePresence>
            <motion.div layout
                key="container"
                className={clsx(
                    'relative h-8 justify-start overflow-hidden items-center flex rounded-full border border-indigo-500 p-1 pr-3',
                    { 'cursor-pointer': animationStage === AnimationStage.RestingInProgress }
                )}
                whileHover={animationStage === AnimationStage.RestingInProgress ? { scale: 1.04, transition: { duration: 0.5 } } : undefined}
                initial={initialStage.toString()}
                animate={animationStage.toString()}
                variants={iconVariants}
                transition={transition}
                onClick={() => {
                    if (animationStage === AnimationStage.RestingInProgress) {
                        handleOnRest();
                    }
                }}
                onHoverStart={() => {
                    setIsHovered(true);
                }}
                onHoverEnd={() => {
                    setIsHovered(false);
                }}
            >
                {(animationStage === AnimationStage.RestingStart || animationStage === AnimationStage.TransitionStartFadeOut) && (
                    <motion.div animate={animationStage === AnimationStage.TransitionStartFadeOut ? { opacity: 0, width: 0 } : undefined}>
                        <AiFillPlayCircle className="text-indigo-300 cursor-pointer h-8 mr-2" size={25} onClick={handleOnRest} />
                    </motion.div>
                )}
                {(animationStage === AnimationStage.TransitionInProgressFadeIn || animationStage === AnimationStage.RestingInProgress) && (
                    <motion.div animate={animationStage === AnimationStage.TransitionInProgressFadeIn ? { opacity: 1 } : undefined}>
                        {!isHovered && <AiOutlineFieldTime className="text-indigo-300 cursor-pointer h-8 mr-2" size={25} onClick={handleOnRest} />}
                        {isHovered ? <AiOutlineCheckCircle className="text-green-300" size={25} /> : null}
                    </motion.div>
                )}
                {(animationStage === AnimationStage.RestingDone || animationStage === AnimationStage.TransitionInProgressFadeOut) && (
                    <motion.div layout
                        className="h-8 items-center flex text-green-100"
                        key="doneIndicatorButtonContainer"
                    >
                        <AiOutlineCheckCircle size={25} />
                    </motion.div>
                )}
                {animationStage === AnimationStage.RestingStart &&
                    <div className="absolute right-2" onClick={handleOnRest}>Start</div>}
                {animationStage === AnimationStage.TransitionStartFadeOut &&
                    <Text onAnimationComplete={handleOnRest} text="Start"></Text>}
                {animationStage === AnimationStage.TransitionInProgressFadeIn &&
                    <Text text="In progress" initial="hidden" onAnimationComplete={handleOnRest}></Text>}
                {animationStage === AnimationStage.RestingInProgress && (
                    isHovered ? <div className="absolute right-2 text-green-300">Done</div> :
                    <div className="absolute right-2" onClick={handleOnRest}>In progress</div>
                )}
                {animationStage === AnimationStage.TransitionInProgressFadeOut &&
                    <Text text="In progress" onAnimationComplete={handleOnRest}></Text>}
            </motion.div>
        </AnimatePresence>
    );
}

export default function StatusButton({ status, onStatusChanged }: { status: CommitmentStatus, onStatusChanged: (state: CommitmentStatus) => void }) {
    const commitmentStatusToStageMap = {
        [CommitmentStatus.NotStartedYet]: AnimationStage.RestingStart,
        [CommitmentStatus.InProgress]: AnimationStage.RestingInProgress,
        [CommitmentStatus.Done]: AnimationStage.RestingDone,
        [CommitmentStatus.Abandoned]: AnimationStage.RestingStart
    };

    function onAnimationStageChanged(stage: AnimationStage) {
        const newStatus = Object.keys(commitmentStatusToStageMap).find((statusKey) => commitmentStatusToStageMap[statusKey as CommitmentStatus] === stage);
        if (newStatus) {
            onStatusChanged(newStatus as CommitmentStatus);
        }
    }

    return (
        <StartButton initialStage={commitmentStatusToStageMap[status]} onAnimationStageChanged={onAnimationStageChanged}></StartButton>
    );
}
