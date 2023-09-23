import { getServerSession } from '@/lib/auth/session';
import { getDailyNote } from '@/lib/notes/get-daily-note';
import { getTags } from '@/lib/tags/get';

import { DailyNoteEditor } from './components/daily-note-editor/daily-note-editor';

function Section({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`flex max-h-full flex-col overflow-hidden rounded-lg bg-neutral-900 p-2 ${className}`}>
            {children}
        </div>
    );
}

export default async function ContextLayout({ children, context }: { children: React.ReactNode, context: React.ReactNode }) {
    const { user } = await getServerSession();
    const note = await getDailyNote(user.id);
    const tags = await getTags();
    const tagLabels = tags.map(({ label }) => label);

    return (
        <article className="flex h-full max-h-full flex-col pr-16">
            {children}
            <div className="min-h-0 grow">
                <div className="grid grid-cols-1 gap-4 xl:h-full xl:grid-cols-2">
                    <Section>
                        {context}
                    </Section>

                    <Section className="xl:order-first">
                        <div className="mb-5 text-xl">Daily Note</div>
                        <DailyNoteEditor note={note} tags={tagLabels}></DailyNoteEditor>
                    </Section>
                </div>
            </div>
        </article>
    );
}
