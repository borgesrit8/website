import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../hooks/useScrollReveal'

export default function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  )
}
