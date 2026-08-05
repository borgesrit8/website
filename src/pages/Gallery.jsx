import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion'
import Reveal from '../components/Reveal'
import Lightbox from '../components/Lightbox'
import { categories, galleryImages } from '../data/gallery'

function useColumnCount() {
  const [cols, setCols] = useState(3)
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      if (w < 640) setCols(1)
      else if (w < 1024) setCols(2)
      else setCols(3)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])
  return cols
}

function useMasonryColumns(images, columnCount) {
  return useMemo(() => {
    const cols = Array.from({ length: columnCount }, () => ({ items: [], height: 0 }))
    images.forEach((img) => {
      const shortest = cols.reduce((a, b) => (b.height < a.height ? b : a))
      shortest.items.push(img)
      shortest.height += img.h / img.w
    })
    return cols.map((c) => c.items)
  }, [images, columnCount])
}

function MasonryGrid({ images, columnCount, onOpen }) {
  const columns = useMasonryColumns(images, columnCount)
  return (
    <div className="flex gap-5 items-start">
      {columns.map((col, ci) => (
        <div key={ci} className="flex-1 flex flex-col gap-5 min-w-0">
          <AnimatePresence>
            {col.map((img) => (
              <motion.button
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onOpen(img)}
                data-cursor-hover
                className="group relative block w-full overflow-hidden rounded-2xl"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  style={{ aspectRatio: `${img.w} / ${img.h}` }}
                  className="w-full object-cover transition-transform duration-700 ease-silk group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <span className="text-xs tracking-widest2 uppercase text-cream">{img.group}</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export default function Gallery() {
  const [active, setActive] = useState('All')
  const [activeGroup, setActiveGroup] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const columnCount = useColumnCount()

  const selectCategory = (cat) => {
    setActive(cat)
    setActiveGroup(null)
  }

  const categoryImages = useMemo(
    () => (active === 'All' ? galleryImages : galleryImages.filter((img) => img.category === active)),
    [active]
  )

  const availableGroups = useMemo(() => {
  return [...new Set(categoryImages.map((img) => img.group))]
}, [categoryImages])

const hasGroups = availableGroups.length > 0

 const visibleImages = useMemo(() => {
  if (!hasGroups) return categoryImages
  if (!activeGroup) return []
  return categoryImages.filter((img) => img.group === activeGroup)
}, [categoryImages, hasGroups, activeGroup])

  const openAt = (img) => setLightboxIndex(visibleImages.findIndex((i) => i.id === img.id))
  const close = () => setLightboxIndex(null)
  const next = () => setLightboxIndex((i) => (i + 1) % visibleImages.length)
  const prev = () => setLightboxIndex((i) => (i - 1 + visibleImages.length) % visibleImages.length)

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <p className="text-[11px] tracking-widest2 uppercase text-gold mb-3">Portfolio</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream">Gallery</h1>
        </Reveal>
    </div>
        <LayoutGroup>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => selectCategory(cat)}
                data-cursor-hover
                className={`relative rounded-full px-5 py-2 text-sm transition-colors duration-300 ${
                  active === cat ? 'text-bg-primary' : 'text-cream/60 hover:text-cream'
                }`}
              >
                {active === cat && (
                  <motion.span
                    layoutId="pill"
                    className="absolute inset-0 rounded-full bg-pink"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>

        {hasGroups && (
  <div className="flex flex-wrap justify-center gap-3 mb-14">
    {availableGroups.map((group) => (
      <button
        key={group}
        onClick={() => setActiveGroup(group)}
        data-cursor-hover
        className={`rounded-full border px-6 py-2 font-display text-lg transition-all duration-300 ${
          activeGroup === group
            ? 'border-gold bg-gold text-bg-primary'
            : 'border-white/15 text-cream/70 hover:border-gold hover:text-gold'
        }`}
      >
        {group}
      </button>
    ))}
  </div>
)}

      {!hasGroups || activeGroup ? (
  <MasonryGrid images={visibleImages} columnCount={columnCount} onOpen={openAt} />
) : (
  <p className="text-center text-cream/40 text-sm">
    Choose a rally to view the photos.
  </p>
)}

      <Lightbox images={visibleImages} index={lightboxIndex} onClose={close} onNext={next} onPrev={prev} />
    </div>
  )
}