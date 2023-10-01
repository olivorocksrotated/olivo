import { motion } from 'framer-motion';

export default function HoverMark() {
    return (
        <motion.div layoutId="hovered" className="absolute top-0 z-30 h-full w-0.5">
            <div className="h-full w-full rounded" style={{ background: '#ff6363' }} />
        </motion.div>
    );
}
