// Animation variants
export const chevronVariants = {
  closed: { rotate: 0 },
  open: { rotate: 90 },
} as const;

export const contentVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
} as const;

export const subItemVariants = {
  closed: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.15,
    },
  },
  open: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.2,
      ease: "easeOut",
    },
  }),
} as any;

export const activeIndicatorVariants = {
  initial: { scaleX: 0, opacity: 0 },
  animate: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    scaleX: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
} as const;

// Animation variants
export const triggerVariants = {
  closed: {
    scale: 1,
    backgroundColor: "transparent",
  },
  open: {
    scale: 1.02,
    backgroundColor: "hsl(var(--sidebar-accent))",
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
} as const;

export const logoVariants = {
  idle: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
  tap: { scale: 0.95 },
} as const;

export const itemVariants = {
  closed: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.1,
    },
  },
  open: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.03,
      duration: 0.2,
      ease: "easeOut",
    },
  }),
} as any;
