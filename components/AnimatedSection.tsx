'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
}

export default function AnimatedSection({ children, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        ...fadeInUp,
        animate: {
          ...fadeInUp.animate,
          transition: {
            ...fadeInUp.animate.transition,
            delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}
