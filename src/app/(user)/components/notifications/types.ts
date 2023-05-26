import { Commitment, Notification } from '@prisma/client';

export type NotificationItem = Omit<Notification, 'ownerId'>;
export type NotificationCommitment = Pick<Commitment, 'doneBy'>;
