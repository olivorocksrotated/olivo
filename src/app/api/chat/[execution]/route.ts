import { AiExecutionName } from '@prisma/client';
import { NextResponse } from 'next/server';

import { getLastAiExecution } from '@/lib/ai/get';
import { getServerSession } from '@/lib/auth/session';

export async function GET(
    _: Request,
    { params }: { params: { execution: AiExecutionName } }
) {
    const { execution: executionName } = params;
    const { user } = await getServerSession();
    const execution = await getLastAiExecution(user.id, executionName);

    return NextResponse.json(execution);
}
