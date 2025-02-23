import { motion } from 'framer-motion';
import { fadeInUp } from '@/app/utils/animations';
import { ComponentType } from 'react';

export function withAnimation<T extends object>(WrappedComponent: ComponentType<T>) {
  return function WithAnimationComponent(props: T) {
    return (
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <WrappedComponent {...props} />
      </motion.div>
    );
  };
}
