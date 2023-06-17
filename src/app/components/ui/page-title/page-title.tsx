type Props = { text: string };

export default function PageTitle({ text }: Props) {
    return (
        <h1 className="mb-16 text-4xl">{text}</h1>
    );
}
