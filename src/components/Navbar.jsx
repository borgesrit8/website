import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/events', label: 'Events' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        <NavLink to="/" className="leading-tight" data-cursor-hover>
          <span className="block font-display text-xl md:text-2xl tracking-wide text-cream">Rita Borges</span>
          <span className="block text-[9px] md:text-[10px] tracking-widest2 uppercase text-gold -mt-1">
            Photography
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-cursor-hover
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors duration-300 ${
                  isActive ? 'text-pink' : 'text-cream/80 hover:text-pink'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/contact"
          data-cursor-hover
          className="hidden md:inline-flex items-center rounded-full border border-gold/60 px-5 py-2 text-sm text-gold hover:bg-gold hover:text-bg-primary transition-all duration-300"
        >
          Let&apos;s Talk
        </NavLink>

        <button
          className="md:hidden text-cream text-2xl"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

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
                    `font-display text-2xl ${isActive ? 'text-pink' : 'text-cream'}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex justify-center rounded-full border border-gold/60 px-5 py-2.5 text-sm text-gold"
              >
                Let&apos;s Talk
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
