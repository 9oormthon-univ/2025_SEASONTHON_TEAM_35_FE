import { AnimatePresence, motion } from "framer-motion";

const variants = {
    enter: (dir) => ({ x: dir > 0 ? 150 : -150, opacity: 0, position: "absolute" }),
    center: { x: 0, opacity: 1, position: "relative" },
    exit:  (dir) => ({ x: dir > 0 ? -150 : 150, opacity: 0, position: "absolute" }),
};

export default function WizardContent({ direction, stepKey, children }) {
    return (
        <div className="flex-1 relative">
            <AnimatePresence custom={direction} initial={false} mode="popLayout">
                <motion.div
                    key={stepKey}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                    className="absolute w-full h-full"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
