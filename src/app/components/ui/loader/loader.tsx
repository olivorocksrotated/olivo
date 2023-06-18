import { cva } from 'cva';

import styles from './loader.module.css';

interface Props {
    intent: 'inner' | 'standalone',
    size: 'xs' | 's' | 'md'
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
                md: ''
            }
        },
        defaultVariants: {
            intent: 'standalone',
            size: 'md'
        },
        compoundVariants: [
            { intent: 'inner', size: 'xs', class: 'h-[10px] w-[10px] border-r-[1px] border-t-[1px]' },
            { intent: 'inner', size: 's', class: 'h-[15px] w-[15px] border-r-[1px] border-t-[1px]' },
            { intent: 'inner', size: 'md', class: 'h-[20px] w-[20px] border-r-[1.5px] border-t-[1.5px]' },
            { intent: 'standalone', size: 'xs', class: 'h-12 w-12' },
            { intent: 'standalone', size: 's', class: 'h-16 w-16' },
            { intent: 'standalone', size: 'md', class: 'h-20 w-20' }
        ]
    }
);

export default function Loader(props: Props) {
    return <span className={loaderStyles(props)}></span>;
}
