import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(true)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { damping: 25, stiffness: 300 })
  const springY = useSpring(y, { damping: 25, stiffness: 300 })

  useEffect(() => {
    const move = (e) => {
      setHidden(false)
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      const el = e.target.closest('a, button, [data-cursor-hover]')
      setHovering(Boolean(el))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [x, y])

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden md:block mix-blend-difference"
      style={{ x: springX, y: springY, opacity: hidden ? 0 : 1 }}
    >
      <motion.div
        className="rounded-full border border-cream"
        animate={{
          width: hovering ? 52 : 22,
          height: hovering ? 52 : 22,
          x: hovering ? -26 : -11,
          y: hovering ? -26 : -11,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  )
}
