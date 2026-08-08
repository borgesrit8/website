import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiCamera, FiHeart, FiWind, FiFlag, FiChevronDown } from 'react-icons/fi'
import Reveal from '../components/Reveal'
import FeaturedCarousel from '../components/FeaturedCarousel'
import { fadeUp, viewportOnce } from '../hooks/useScrollReveal'
import { useLanguage } from '../hooks/LanguageContext'
import pt from '../i18n/pt'
import en from '../i18n/en'
import fr from '../i18n/fr'
import de from '../i18n/de'

const cards = [
  { icon: FiCamera, key: 'photography' },
  { icon: FiHeart, key: 'emotion' },
  { icon: FiWind, key: 'adventure' },
  { icon: FiFlag, key: 'motorsport' },
]

export default function Home() {
    const { language } = useLanguage()

  const translations = { pt, en, fr, de }
  const t = translations[language]
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/70 via-bg-primary/40 to-bg-primary" />
          <div className="absolute inset-0 bg-bg-primary/20" />
        </motion.div>

        <div className="speed-streaks">
          {[18, 34, 62, 78].map((top, i) => (
            <span
              key={i}
              style={{ top: `${top}%`, left: `${i % 2 === 0 ? -10 : 40}%`, width: '160px', transform: `rotate(-8deg)` }}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-script text-3xl md:text-4xl text-pink mb-4"
          >
            {t.home.heroSubtitle}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-display text-5xl sm:text-6xl md:text-8xl leading-[1.05] text-cream"
          >
            {t.home.heroTitle}
            <br />
            <span className="text-gradient-gold">{t.home.heroTitleAccent}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/gallery"
              data-cursor-hover
              className="rounded-full bg-pink px-8 py-3.5 text-sm tracking-wide text-bg-primary transition-transform duration-300 hover:scale-105"
            >
              {t.home.viewGallery}
            </Link>
            <Link
              to="/about"
              data-cursor-hover
              className="rounded-full border border-cream/30 px-8 py-3.5 text-sm tracking-wide text-cream transition-all duration-300 hover:border-gold hover:text-gold hover:scale-105"
            >
              {t.home.aboutMe}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-cream/60"
        >
          <FiChevronDown size={24} />
        </motion.div>
      </section>

      {/* FOUR CARDS */}
      <section className="relative bg-bg-primary px-6 py-28 md:py-36">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-[11px] tracking-widest2 uppercase text-gold mb-3">{t.home.guidesTitle}</p>
            <h2 className="font-display text-4xl md:text-5xl text-cream">{t.home.moreThanImages}</h2>
          </Reveal> 

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                variants={fadeUp}
                custom={i * 0.12}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="group rounded-3xl bg-card border border-white/5 p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow hover:border-pink/30"
              >
                <c.icon className="text-gold mb-5" size={26} />
                <h3 className="font-display text-2xl text-cream mb-2">
                {t.home.cards[c.key].title}
                </h3>

                <p className="text-sm text-cream/55 leading-relaxed">
                {t.home.cards[c.key].text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CAROUSEL */}
      <section className="relative bg-bg-secondary py-28 md:py-36">
        <div className="max-w-6xl mx-auto px-6 mb-14 text-center">
          <Reveal>
            <p className="text-[11px] tracking-widest2 uppercase text-gold mb-3">{t.home.selection}</p>
            <h2 className="font-display text-4xl md:text-5xl text-cream">{t.home.featuredPhotos}</h2>
          </Reveal>
        </div>
        <FeaturedCarousel />
      </section>
    </div>
  )
}
