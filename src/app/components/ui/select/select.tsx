import * as SelectPrimitive from '@radix-ui/react-select';
import clsx from 'clsx';
import { cva, VariantProps } from 'cva';
import { AnimatePresence, motion } from 'framer-motion';
import { Fragment, useState } from 'react';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';

const triggerStyles = cva(
    `flex h-[42px] min-h-[42px] items-center justify-between gap-4 rounded border border-solid border-neutral-500 px-4 py-1 text-white transition
    hover:enabled:border-neutral-200
    disabled:cursor-not-allowed
    disabled:opacity-50 [&>span]:truncate`,
    {
        variants: {
            w: {
                xs: 'w-32',
                s: 'w-48',
                md: 'w-64',
                full: 'w-full'
            }
        },
        defaultVariants: {
            w: 'full'
        }
    }
);

const contentStyles = cva(
    'overflow-hidden rounded bg-neutral-700 p-2 text-sm shadow-md',
    {
        variants: {
            w: {
                xs: 'w-32',
                s: 'w-48',
                md: 'w-64',
                full: 'w-full'
            }
        },
        defaultVariants: {
            w: 'full'
        }
    }
);

const itemStyles = clsx(
    'cursor-pointer rounded px-4 py-2',
    'data-[disabled]:pointer-events-none data-[disabled]:cursor-default',
    'data-[highlighted]:bg-gray-600 data-[highlighted]:outline-none',
    'data-[state=checked]:bg-indigo-500'
);

export interface ItemGroup {
    label: string;
    items: {
        label: string;
        value: any;
    }[];
}

interface Props extends VariantProps<typeof triggerStyles> {
    disabled: boolean;
    itemGroups: ItemGroup[];
    label: string;
    placeholder: string;
    defaultValue?: string;
    onValueChange: (value: string) => void
}

export default function Select(props: Props) {
    const {
        itemGroups,
        disabled,
        label,
        placeholder,
        defaultValue,
        onValueChange = () => undefined
    } = props;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <SelectPrimitive.Root disabled={disabled}
            defaultValue={defaultValue}
            open={isDropdownOpen}
            onValueChange={onValueChange}
            onOpenChange={setIsDropdownOpen}
        >
            <SelectPrimitive.Trigger aria-label={label} className={triggerStyles(props)}>
                <SelectPrimitive.Value placeholder={placeholder} />
                <SelectPrimitive.Icon className="min-w-fit">
                    <IoChevronDownOutline />
                </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>
            <AnimatePresence>
                {isDropdownOpen ?
                    <SelectPrimitive.Portal>
                        <SelectPrimitive.Content>
                            <motion.div className={contentStyles(props)}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center text-neutral-300 shadow-sm">
                                    <IoChevronUpOutline />
                                </SelectPrimitive.ScrollUpButton>
                                <SelectPrimitive.Viewport>
                                    {itemGroups.map((group, index) => (
                                        <Fragment key={group.label}>
                                            {index !== 0 ? <SelectPrimitive.Separator className="mx-1 my-2 h-[1px] bg-neutral-600" /> : null}
                                            <SelectPrimitive.Group>
                                                <SelectPrimitive.Label className="mb-2 px-4 text-xs text-neutral-300">{group.label}</SelectPrimitive.Label>
                                                {group.items.map((item) => (
                                                    <SelectPrimitive.Item key={item.value} value={item.value} className={itemStyles}>
                                                        <SelectPrimitive.ItemText>{item.label}</SelectPrimitive.ItemText>
                                                    </SelectPrimitive.Item>
                                                ))}
                                            </SelectPrimitive.Group>
                                        </Fragment>
                                    ))}
                                </SelectPrimitive.Viewport>
                                <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center text-neutral-300 shadow-sm">
                                    <IoChevronDownOutline />
                                </SelectPrimitive.ScrollDownButton>
                            </motion.div>
                        </SelectPrimitive.Content>
                    </SelectPrimitive.Portal> : null}
            </AnimatePresence>
        </SelectPrimitive.Root>
    );
}
