'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Button from '@/app/components/ui/button/button';
import { useCloseUiComponent } from '@/app/components/ui/hooks/useCloseUiComponent';
import Popover from '@/app/components/ui/popover/popover';

export default function TagsSelector({ options, selectedValues }: { options: { value: string, label: string }[], selectedValues: string[] }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [tags, setTags] = useState(selectedValues);
    const [isClosed, close] = useCloseUiComponent();

    useEffect(() => {
        setTags(selectedValues);
    }, [selectedValues]);

    function handleSelectOption(tag: string) {
        setTags([...tags, tag]);
    }

    function applyTags() {
        const query = new URLSearchParams(searchParams.toString());
        const filterValue = Array.from(new Set(tags));
        query.set('selectedTagsFilter', filterValue.join(','));
        close();
        router.push(`${pathname}?${query}`);
        setTags(filterValue);
    }

    return (
        <div>
            <Popover align="center"
                close={isClosed}
                openComponent={<Button size="md" label="Select Tags"></Button>}
            >
                <div className="flex w-96 max-w-sm flex-wrap gap-2 p-2">
                    {options.length > 0 ? options.map(({ value, label }) => (
                        <div onClick={() => handleSelectOption(value)}
                            key={value}
                            className={`cursor-pointer rounded border border-neutral-500 p-1 hover:bg-neutral-500 ${tags.includes(value) ? 'bg-neutral-500' : ''}`}
                        >
                            {label}
                        </div>
                    )) : <div>No tags</div>}
                </div>
                <div className="flex justify-end">
                    <Button size="s" label="Apply" onClick={applyTags}></Button>
                </div>
            </Popover>
        </div>
    );
}
