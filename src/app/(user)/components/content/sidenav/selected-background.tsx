import { motion } from 'framer-motion';

export default function SelectedBackground() {
    return (
        <motion.div layoutId="selected" className="absolute top-0 z-10 h-full w-full rounded" style={{ background: 'hsla(0,0%,100%,.05)' }}>
            <div className="h-full w-full" />
        </motion.div>
    );
}
