'use client';

import { AiOutlineDelete } from 'react-icons/ai';

import IconButton from '@/app/components/ui/icon-button/icon-button';

interface Props {
    onDelete?: () => void;
}

export default function DeleteButton({ onDelete = () => undefined }: Props) {
    return (
        <IconButton icon={AiOutlineDelete}
            onClick={onDelete}
            label="Delete commitment"
            intent="secondary"
            size="s"
        />
    );
}
