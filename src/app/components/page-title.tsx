type Props = { text: string };

export default function PageTitle({ text }: Props) {
    return (
        <h1 className="text-4xl mb-16">{text}</h1>
    );
}
