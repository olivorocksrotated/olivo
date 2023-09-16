'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import Button from '@/app/components/ui/button/button';
import { useCloseUiComponent } from '@/app/components/ui/hooks/useCloseUiComponent';
import Popover from '@/app/components/ui/popover/popover';

export default function TagsSelector({ options }: { options: { value: string, label: string }[]}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [tags, setTags] = useState<string[]>([]);
    const [isClosed, close] = useCloseUiComponent();

    function handleSelectOption(tag: string) {
        setTags([...tags, tag]);
    }

    function applyTags() {
        const newSerchParams = new URLSearchParams(searchParams.toString());
        const currentTags = newSerchParams.get('selectedTagsFilter')?.split(',') || [];
        newSerchParams.set('selectedTagsFilter', [...currentTags, ...tags].join(','));
        router.push(`${pathname}?${newSerchParams}`);
        close();
        setTags([]);
    }

    return (
        <div className="p-2">
            <Popover close={isClosed} openComponent={<Button size="md" label="See notes for tag"></Button>}>
                <div className="flex w-64 flex-wrap gap-2 p-2">
                    {options.length > 0 ? options.map(({ value, label }) => (
                        <div onClick={() => handleSelectOption(value)}
                            key={value}
                            className={`cursor-pointer rounded border border-neutral-500 p-1 hover:bg-neutral-500 ${tags.includes(value) ? 'bg-neutral-500' : ''}`}
                        >
                            {label}
                        </div>
                    )) : <div>No tags left to apply</div>}
                </div>
                <div className="flex justify-end">
                    <Button size="s" label="Apply" onClick={applyTags}></Button>
                </div>
            </Popover>
        </div>
    );
}
