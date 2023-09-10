import clsx from 'clsx';

export const editorContentStyles = clsx(
    '[&_a]:underline [&_a]:hover:text-indigo-300',
    '[&_blockquote]:my-2 [&_blockquote]:border-l [&_blockquote]:border-l-neutral-200 [&_blockquote]:px-4 [&_blockquote]:py-2',
    '[&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl [&_h4]:text-xl [&_h5]:text-lg',
    '[&_p]:mb-4',
    '[&_ul]:list-disc [&_ul]:px-3 [&_ul]:py-0 [&_ul_p]:m-0',
    '[&_ol]:list-decimal [&_ol]:px-3 [&_ol]:py-0 [&_ol_p]:m-0'
);
