import { createContext } from 'react';

import { NotificationCommitment, NotificationItem } from '../types';

interface NotificationData {
    notification: NotificationItem,
    unfinishedCommitmentsForToday: NotificationCommitment[]
}

export const NotificationDataContext = createContext({} as NotificationData);
