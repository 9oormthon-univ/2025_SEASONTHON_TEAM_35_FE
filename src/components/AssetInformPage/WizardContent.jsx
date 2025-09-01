import { AnimatePresence, motion } from "framer-motion";
import AmountStep from "./AmountStep";

const variants = {
    enter: (dir) => ({ x: dir > 0 ? 150 : -150, opacity: 0, position: "absolute" }),
    center: { x: 0, opacity: 1, position: "relative" },
    exit:  (dir) => ({ x: dir > 0 ? -150 : 150, opacity: 0, position: "absolute" }),
};

export default function WizardContent({ direction, stepData, formValue, onValueChange, error }) {
    return (
        <div className="flex-1 relative">
            <AnimatePresence custom={direction} initial={false} mode="popLayout">
                <motion.div
                    key={stepData.key}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                    className="absolute w-full h-full"
                >
                    <AmountStep
                        title={stepData.title}
                        keyword={stepData.keyword}
                        value={formValue}
                        onChange={onValueChange}
                        error={error}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}