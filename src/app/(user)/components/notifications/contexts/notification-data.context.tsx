import { Commitment } from '@prisma/client';
import { createContext } from 'react';

import { NotificationItem } from '../types';

interface NotificationData {
    notification: NotificationItem,
    commitments: Pick<Commitment, 'doneBy'>[]
}

export const NotificationDataContext = createContext({} as NotificationData);
