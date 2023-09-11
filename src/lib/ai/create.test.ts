import { AiExecutionName } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';

import prisma from '../prisma/client';
import { createAiExecution } from './create';
import { getLastAiExecution } from './get';

describe('lib ai', () => {
    describe('create', () => {
        const userId = 'userId';
        const executionName = AiExecutionName.MoodAdvice;
        const execution = {
            userId,
            executionName,
            prompt: 'Hi there',
            response: 'Hello back human'
        };

        describe('createAiExecution', () => {
            it('should create an AI execution entry', async () => {
                const createdExecution = await createAiExecution(execution);
                const retrievedExecution = await getLastAiExecution(userId, executionName);

                expect(createdExecution).toBe(retrievedExecution);
            });

            it('should return an error if creating the AI execution fails', async () => {
                const expectedError = new Error('Ups');
                prisma.aiExecution.create = vi.fn().mockRejectedValue(expectedError);

                await expect(createAiExecution(execution)).rejects.toThrowError(expectedError);
            });
        });
    });
});
