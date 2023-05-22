import { motion } from 'framer-motion';

export default function SelectedBackground() {
    return (
        <motion.div layoutId="selected" className="absolute top-0 z-10 h-full w-full">
            <div className="h-full w-full rounded bg-indigo-900" />
        </motion.div>
    );
}
