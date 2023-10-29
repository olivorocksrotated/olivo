'use client';

import clsx from 'clsx';

import { Category } from '@/lib/feedback/types';
interface Props {
    category: Category;
    isSelected: boolean;
    onCategorySelected: (value: Category) => void;
}

export default function CategoryCard({ category, isSelected, onCategorySelected }: Props) {
    const handleClick = () => {
        onCategorySelected(category);
    };

    const cardOuterWrapperStyles = clsx(
        'relative flex h-40 w-40 cursor-pointer flex-col justify-end overflow-hidden rounded-md border shadow-md',
        { 'border-teal-600 bg-slate-700 shadow-slate-700 ': isSelected, 'border-slate-500': !isSelected },
    );
    const cardInnerWrapperStyles = clsx(
        'absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border',
        { 'border-teal-600': isSelected, 'border-slate-500': !isSelected }
    );

    const cardDotStyles = clsx(
        'h-4 w-4 text-teal-600 transition-opacity duration-300',
        { 'opacity-100': isSelected, 'opacity-0': !isSelected }
    );
    const cardTextStyles = clsx(
        'pb-3 pl-3 font-semibold',
        { 'text-slate-100': isSelected, 'text-slate-500': !isSelected }
    );

    return (
        <div className={cardOuterWrapperStyles} onClick={handleClick}>
            <div className={cardInnerWrapperStyles}>
                <svg
                    className={cardDotStyles}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>

            <div className={cardTextStyles}>{category.name}</div>
        </div>
    );
}
