import type { Transition, Variants } from 'framer-motion';

/** Premium ease — soft settle, never snappy */
export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -40px 0px',
} as const;

export const transitionBase: Transition = {
  duration: 0.65,
  ease: EASE_PREMIUM,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const fadeUpScale: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 380, damping: 18 },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.12,
    },
  },
};

export const chipItem: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: EASE_PREMIUM },
  },
};
