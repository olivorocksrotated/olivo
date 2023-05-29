import { useState } from 'react';

interface Props {
    step: number;
    setepTitle: string;
}

export default function FeedbackStepper({ step, setepTitle }: Props) {
    const [activeStep, setActiveStep] = useState(step);

    const handleClick = (stepNumber: number) => {
        if (stepNumber >= activeStep) {
            return;
        }
        setActiveStep(stepNumber);
    };

    return (
        <div className="space-y-2 py-6 text-slate-200">
            <h3 className="mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-4xl font-semibold text-transparent">{setepTitle}</h3>

            <div className="flex gap-3">
                {
                    [1, 2, 3, 4, 5].map((stepNumber) => (
                        <span key={stepNumber} onClick={() => handleClick(stepNumber)} className={`h-5 w-24 cursor-pointer rounded-sm ${activeStep === stepNumber ? 'bg-teal-600' : 'bg-slate-500'} `}></span>
                    ))
                }
            </div>
        </div>
    );
}
