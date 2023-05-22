import { motion } from 'framer-motion';

export default function SelectedBackground() {
    return (
        <motion.div layoutId="selected" className="absolute top-0 h-full w-full">
            <div className="h-full w-full rounded bg-indigo-950" />
        </motion.div>
    );
}
