import { IoCloseOutline } from 'react-icons/io5';

export default function ConnectionError({ onClose, text }: { onClose: () => void ;text: string }) {
    return (
        <div className="relative w-full min-w-[300px] rounded-md border-4 border-red-500 bg-gray-800 p-5 text-red-300 drop-shadow-glow">
            <div onClick={onClose} className="absolute right-2 top-2 cursor-pointer rounded border border-red-300 px-2 text-xl">
                <IoCloseOutline></IoCloseOutline>
            </div>
            <div className="pt-5">
                {text}
            </div>
        </div>
    );
}
