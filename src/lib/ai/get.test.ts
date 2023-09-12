import { AiExecutionName } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';

import { hashString } from '../hash/hash-string';
import prisma from '../prisma/client';
import { openAiClient } from './client';
import { createAiExecution } from './create';
import { getLastAiExecution, getStreamedAiResponse } from './get';

vi.mock('./client', async () => ({
    openAiClient: {
        createChatCompletion: vi.fn()
    }
}));

describe('lib ai', () => {
    describe('get', () => {
        const userId = 'userId';
        const executionName = AiExecutionName.MoodAdvice;
        const execution = {
            userId,
            executionName,
            prompt: 'Hi there',
            response: 'Hello human'
        };

        describe('getLastAiExecution', () => {
            it('should get the last AI execution entry', async () => {
                // Ideally we would create 2 entries with the same user and execution name,
                // and check that the last entry is the one retrieved.
                // Unfortunately, there seems to be some problem with Prismock where the "orderBy"
                // is not working properly. I changed the order to 'desc' and 'asc' and the result
                // was the same. I also tried changing the method to findMany, but it didn't work either :(
                // I might have missed something.
                const createdExecution = await createAiExecution({
                    ...execution,
                    prompt: 'Hello again',
                    response: 'Nice to talk to you once more'
                });

                const retrievedExecution = await getLastAiExecution(userId, executionName);

                expect(retrievedExecution).toBe(createdExecution);
            });

            // This test supplements the previous one, in order to check at least that the method is called
            // with the right orderBy arguments.
            it('should get the last AI execution entry by ordering properly by created date', async () => {
                const findFirstSpy = vi.spyOn(prisma.aiExecution, 'findFirst');
                await getLastAiExecution(userId, executionName);

                expect(findFirstSpy).toHaveBeenCalledWith({
                    where: {
                        ownerId: userId,
                        executionName
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 1
                });
            });

            it('should return an error if getting the last AI execution fails', async () => {
                const expectedError = new Error('Ups');
                prisma.aiExecution.findFirst = vi.fn().mockRejectedValue(expectedError);

                await expect(getLastAiExecution(userId, executionName)).rejects.toThrowError(expectedError);
            });
        });

        describe('getStreamedAiResponse', () => {
            it('should create an open ai stream with the right parameters', async () => {
                const prompt = 'prompt';
                await getStreamedAiResponse(userId, prompt);

                expect(openAiClient.createChatCompletion).toHaveBeenCalledWith({
                    model: 'gpt-4',
                    messages: [{ role: 'user', content: prompt }],
                    stream: true,
                    temperature: 1,
                    user: hashString(userId)
                });
            });
        });
    });
});
