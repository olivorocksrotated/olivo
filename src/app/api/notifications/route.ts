import { NextResponse } from 'next/server';

import { getServerSession } from '@/lib/auth/session';
import { getNotifications } from '@/lib/notifications/persistent/get';

export async function GET() {
    const { user } = await getServerSession();
    const notifications = await getNotifications({ userId: user.id });

    return NextResponse.json(notifications);
}
