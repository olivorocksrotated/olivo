import { Notification } from '@prisma/client';

export type NotificationItem = Omit<Notification, 'ownerId'>;
