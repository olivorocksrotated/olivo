'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Select, { ItemGroup } from '@/app/components/ui/select/select';
import { FilterOption } from '@/lib/notes/get-notes-by-tags';

const itemGroups: ItemGroup[] = [
    {
        label: 'Filter type',
        items: [
            {
                label: 'Intersection',
                value: FilterOption.Intersection
            },
            {
                label: 'Union',
                value: FilterOption.Union
            }
        ]
    }
];

export function FilterSelect({ defaultValue }: { defaultValue?: FilterOption }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    function handleSelectOption(operator: FilterOption) {
        const newSerchParams = new URLSearchParams(searchParams.toString());
        newSerchParams.set('operator', operator);
        router.push(`${pathname}?${newSerchParams}`);
    }

    return <Select itemGroups={itemGroups}
        defaultValue={defaultValue}
        disabled={false}
        label="Filter type"
        placeholder="Filter type"
        onValueChange={(value) => handleSelectOption(value as FilterOption)}
    />;
}
