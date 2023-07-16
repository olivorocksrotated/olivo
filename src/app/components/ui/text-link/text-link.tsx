import NextLink from 'next/link';

interface Props extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
    children: React.ReactNode;
    href: string;
}

export default function TextLink({ children, ...props }: Props) {
    return <NextLink {...props} className="text-indigo-300 hover:underline">{children}</NextLink>;
}
