import { IoAddOutline } from 'react-icons/io5';

import Button from '../button/button';
import IconButton from '../icon-button/icon-button';

export default function Alignment() {
    return (
        <>
            <div className="mb-8">
                <h1 className="mb-4 text-lg">Default</h1>
                <div className="flex gap-4">
                    <Button label="Button" />
                    <IconButton label="Icon button" icon={IoAddOutline} />
                </div>
            </div>

            <div className="mb-8">
                <h1 className="mb-4 text-lg">XS</h1>
                <div className="flex gap-4">
                    <Button label="Button" size="xs" />
                    <IconButton label="Icon button" icon={IoAddOutline} size="xs" />
                </div>
            </div>

            <div className="mb-8">
                <h1 className="mb-4 text-lg">S</h1>
                <div className="flex gap-4">
                    <Button label="Button" size="s" />
                    <IconButton label="Icon button" icon={IoAddOutline} size="s" />
                </div>
            </div>

            <div className="mb-8">
                <h1 className="mb-4 text-lg">Md</h1>
                <div className="flex gap-4">
                    <Button label="Button" size="md" />
                    <IconButton label="Icon button" icon={IoAddOutline} size="md" />
                </div>
            </div>
        </>
    );
}
