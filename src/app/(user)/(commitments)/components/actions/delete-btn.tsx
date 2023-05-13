'use client';

import { AiOutlineDelete } from 'react-icons/ai';

interface Props {
    onDelete?: () => void;
}

export default function DeleteButton({ onDelete = () => undefined }: Props) {
    return (
        <button type="button"
            onClick={onDelete}
            className="text-slate-600 hover:text-slate-400"
            title="Delete commitment"
        >
            <AiOutlineDelete size={22} />
        </button>
    );
}
