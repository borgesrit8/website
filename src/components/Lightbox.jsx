import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function Lightbox({ images, index, onClose, onNext, onPrev }) {
  useEffect(() => {
    if (index === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onNext, onPrev])

  if (index === null) return null
  const img = images[index]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[95] flex items-center justify-center bg-bg-primary/95 backdrop-blur-md px-4"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          data-cursor-hover
          aria-label="Fechar"
          className="absolute top-6 right-6 text-cream/70 hover:text-pink transition-colors text-2xl"
        >
          <FiX />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          data-cursor-hover
          aria-label="Imagem anterior"
          className="absolute left-4 md:left-8 text-cream/70 hover:text-pink transition-colors text-3xl"
        >
          <FiChevronLeft />
        </button>

        <motion.figure
          key={img.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[85vh] max-w-4xl"
        >
          <img src={img.src} alt={img.alt} className="max-h-[80vh] w-auto mx-auto rounded-2xl shadow-soft object-contain" />
          <figcaption className="mt-4 text-center text-xs tracking-widest2 uppercase text-cream/50">
            {img.group}
          </figcaption>
        </motion.figure>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          data-cursor-hover
          aria-label="Imagem seguinte"
          className="absolute right-4 md:right-8 text-cream/70 hover:text-pink transition-colors text-3xl"
        >
          <FiChevronRight />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
