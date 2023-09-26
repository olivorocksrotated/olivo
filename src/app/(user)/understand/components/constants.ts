import { AiExecutionName } from '@prisma/client';

import { InsightTopic } from './types';

export const aiExecutionNameToTopic = {
    [AiExecutionName.MoodAdvice]: InsightTopic.Moods,
    [AiExecutionName.MoodSummary]: InsightTopic.Moods
};
