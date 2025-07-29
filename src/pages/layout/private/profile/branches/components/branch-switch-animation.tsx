import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect } from "react";

/**
 * A component that displays an animation when switching branches
 * @param {Object} props - Component props
 * @param {boolean} props.isAnimating - Whether the animation is currently playing
 * @param {Function} props.onAnimationComplete - Callback function when animation completes
 * @param {string} props.branchName - Name of the branch being switched to (optional)
 * @returns {JSX.Element | null}
 */


const BranchSwitchAnimation = ({
  isAnimating,
  onAnimationComplete,
  branchName = "",
}: {
  isAnimating: boolean;
  onAnimationComplete: () => void;
  branchName: string;
}) => {
  // Call onAnimationComplete callback after animation finishes
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        if (onAnimationComplete) onAnimationComplete();
      }, 2000); // Animation duration (2 seconds)

      return () => clearTimeout(timer);
    }
  }, [isAnimating, onAnimationComplete]);

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[100]"
        >
          <div className="relative flex flex-col items-center">
            {/* Large circle background */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                times: [0, 0.6, 1],
                ease: "easeOut",
              }}
              className="bg-green-600 rounded-full p-12 shadow-xl"
            >
              {/* Check icon animation */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.2, 1],
                  opacity: [0, 1, 1],
                }}
                transition={{
                  delay: 0.3,
                  duration: 0.7,
                  times: [0, 0.7, 1],
                }}
              >
                <Check size={64} strokeWidth={3} className="text-white" />
              </motion.div>
            </motion.div>

            {/* Branch name text */}
            {branchName && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-16 text-center"
              >
                <p className="text-white text-lg font-semibold">Switching to</p>
                <p className="text-white text-2xl font-bold mt-1">
                  {branchName}
                </p>
              </motion.div>
            )}

            {/* Ripple effect */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{
                scale: [1, 1.8],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.2,
              }}
              className="absolute inset-0 bg-green-500 rounded-full"
              style={{ zIndex: -1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BranchSwitchAnimation;
