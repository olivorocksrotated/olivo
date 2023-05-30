import Link from 'next/link';

import { SignupWelcomeNotificationType } from '../types';

interface Props {
    notification: SignupWelcomeNotificationType;
}

export default function SignupWelcomeNotification({}: Props) {
    return (
        <div>
            <p className="mb-2">We are very happy to have you here.</p>
            <p>If you have any questions please reach out to <Link href="mailto:olivo.rocks.rotate@gmail.com" className="text-sky-500">olivo.rocks.rotate@gmail.com</Link></p>
        </div>);
}
