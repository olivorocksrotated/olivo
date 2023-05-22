import { motion } from 'framer-motion';

export default function HoverMark() {
    return (
        <motion.div layoutId="hovered" className="absolute top-0 h-full w-2">
            <div className="h-full w-full rounded bg-purple-900" />
        </motion.div>
    );
}
