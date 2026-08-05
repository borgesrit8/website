import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { featuredImages } from '../data/featured'

const slides = featuredImages

export default function FeaturedCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4500)
    return () => clearInterval(t)
  }, [])

  const go = (dir) => setIndex((i) => (i + dir + slides.length) % slides.length)

  return (
    <div className="relative mx-auto max-w-6xl px-6">
      <div className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden rounded-[2rem] shadow-soft">
        <AnimatePresence mode="wait">
          <motion.img
            key={slides[index].id}
            src={slides[index].src}
            alt={slides[index].alt}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <p className="font-display text-xl md:text-2xl text-cream">{slides[index].label}</p>
          <div className="flex gap-2">
            <button
              onClick={() => go(-1)}
              data-cursor-hover
              aria-label="Anterior"
              className="glass rounded-full p-3 text-cream hover:text-pink transition-colors"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => go(1)}
              data-cursor-hover
              aria-label="Seguinte"
              className="glass rounded-full p-3 text-cream hover:text-pink transition-colors"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            aria-label={`Ir para slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? 'w-8 bg-gold' : 'w-1.5 bg-cream/25'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
