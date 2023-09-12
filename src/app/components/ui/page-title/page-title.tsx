type Props = { text: string };

export default function PageTitle({ text }: Props) {
    return (
        <h1 className="text-4xl">{text}</h1>
    );
}
