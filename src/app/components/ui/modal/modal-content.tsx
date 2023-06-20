interface Props {
    children: React.ReactNode;
}

export default function ModalContent({ children }: Props) {
    return <div className="mb-8">{children}</div>;
}
