import { cva } from 'cva';

import styles from './loader.module.css';

interface Props {
    intent: 'inner' | 'standalone',
    size: 'xs' | 's' | 'md' | 'lg'
}

const loaderStyles = cva(
    'inline-block',
    {
        variants: {
            intent: {
                inner: `box-border inline-block rounded-[50%] border-r-transparent border-t-white ${styles['loader-inner']}`,
                standalone: `relative before:absolute before:rounded-[50%] after:absolute after:rounded-[50%] ${styles['loader-standalone']}`
            },
            size: {
                xs: '',
                s: '',
                md: '',
                lg: ''
            }
        },
        defaultVariants: {
            intent: 'standalone',
            size: 'md'
        },
        compoundVariants: [
            { intent: 'inner', size: 'xs', class: 'h-6 w-6 border-r-[1.5px] border-t-[1.5px]' },
            { intent: 'inner', size: 's', class: 'h-8 w-8 border-r-[2px] border-t-[2px]' },
            { intent: 'inner', size: 'md', class: 'h-10 w-10 border-r-[2.5px] border-t-[2.5px]' },
            { intent: 'inner', size: 'lg', class: 'h-12 w-12 border-r-[3px] border-t-[3px]' },
            { intent: 'standalone', size: 'xs', class: 'h-12 w-12' },
            { intent: 'standalone', size: 's', class: 'h-16 w-16' },
            { intent: 'standalone', size: 'md', class: 'h-20 w-20' },
            { intent: 'standalone', size: 'lg', class: 'h-24 w-24' }
        ]
    }
);

export default function Loader(props: Props) {
    return <span className={loaderStyles(props)}></span>;
}
