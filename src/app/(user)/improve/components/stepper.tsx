interface Props {
    stepTitle: string;
}

export default function FeedbackStepper({ stepTitle }: Props) {
    return (
        <div className="space-y-2 py-6 text-slate-200">
            <h3 className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-4xl font-semibold text-transparent">{stepTitle}</h3>
        </div>
    );
}
