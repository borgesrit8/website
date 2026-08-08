import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import { useLanguage } from '../hooks/LanguageContext'
import pt from '../i18n/pt'
import en from '../i18n/en'
import fr from '../i18n/fr'
import de from '../i18n/de'

const links = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/gallery', key: 'gallery' },
  { to: '/events', key: 'events' },
  { to: '/contact', key: 'contact' },
]

const languages = [
  { code: 'pt', label: 'PT', flag: '🇵🇹' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)

  const { language, changeLanguage } = useLanguage()
  const translations = { pt, en, fr, de }
  const t = translations[language]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const currentLanguage =
    languages.find((lang) => lang.code === language) || languages[0]

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className={`w-full max-w-6xl flex items-center justify-between rounded-full px-5 md:px-8 transition-all duration-500 ${
          scrolled ? 'glass py-2 shadow-soft' : 'bg-transparent py-4'
        }`}
      >
        <NavLink to="/" className="text-cream font-display">
          <div className="text-lg leading-tight">
            Rita Borges
          </div>
          <div className="text-xs tracking-widest text-gold">
            {t.footer.tagline.toUpperCase()}
          </div>
        </NavLink>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-cursor-hover
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors duration-300 ${
                  isActive
                    ? 'text-pink'
                    : 'text-cream/80 hover:text-pink'
                }`
              }
            >
             {t.nav[l.key]}
            </NavLink>
          ))}

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              data-cursor-hover
              className="flex items-center gap-1.5 text-sm text-cream/80 hover:text-pink transition-colors"
            >
              <span>{currentLanguage.flag}</span>
              <span>{currentLanguage.label}</span>
              <span className="text-xs">⌄</span>
            </button>

            <AnimatePresence>
              {languageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 top-10 glass rounded-2xl p-2 min-w-[130px]"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code)
                        setLanguageOpen(false)
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-left transition-colors ${
                        language === lang.code
                          ? 'text-pink'
                          : 'text-cream hover:text-pink'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <NavLink
            to="/contact"
            data-cursor-hover
            className="hidden md:inline-flex items-center rounded-full border border-gold/60 px-5 py-2 text-sm text-gold hover:bg-gold hover:text-bg-primary transition-all duration-300"
          >
            {t.nav.letsTalk}
          </NavLink>

          <button
            className="md:hidden text-cream text-2xl"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            {open ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-20 left-4 right-4 glass rounded-3xl overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-6 gap-5">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `font-display text-2xl ${
                      isActive ? 'text-pink' : 'text-cream'
                    }`
                  }
                >
                  {t.nav[l.key]}
                </NavLink>
              ))}

              {/* Mobile language selector */}
              <div className="border-t border-cream/10 pt-4">
                <p className="text-xs text-cream/50 mb-3">
                  {t.nav.language}
                </p>

                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code)
                        setOpen(false)
                      }}
                      className={`px-3 py-2 rounded-full text-sm ${
                        language === lang.code
                          ? 'bg-pink text-bg-primary'
                          : 'border border-cream/20 text-cream'
                      }`}
                    >
                      {lang.flag} {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex justify-center rounded-full border border-gold/60 px-5 py-2.5 text-sm text-gold"
              >
                {t.nav.letsTalk}
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
} 