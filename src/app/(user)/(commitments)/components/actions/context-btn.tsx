import * as Popover from '@radix-ui/react-popover';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface Props {
    onDelete?: () => void;
}

export default function ContextButton({ onDelete = () => undefined }: Props) {
    const handleOnDelete = () => onDelete();

    return (
        <div>
            <Popover.Root>
                <Popover.Trigger asChild>
                    <button type="button" aria-label="More actions">
                        <BsThreeDotsVertical size={18} />
                    </button>
                </Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content align="start" sideOffset={2} className="rounded border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400">
                        <div>
                            <button onClick={handleOnDelete} type="button" className="px-4 py-2 text-red-300 hover:bg-gray-600">
                                <AiOutlineDelete className="inline-block" /> Delete
                            </button>
                        </div>
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        </div>
    );
}
