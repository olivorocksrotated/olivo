interface Props {
    children: React.ReactNode;
}

export default function ModalFooter({ children }: Props) {
    return <div className="flex items-center justify-end gap-4">{children}</div>;
}
