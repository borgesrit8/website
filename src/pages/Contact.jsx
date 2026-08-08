import { useState } from 'react'
import { FiInstagram, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi'
import Reveal from '../components/Reveal'
import { useLanguage } from '../hooks/LanguageContext'
import pt from '../i18n/pt'
import en from '../i18n/en'
import fr from '../i18n/fr'
import de from '../i18n/de'

export default function Contact() {
  const { language } = useLanguage()
  const translations = { pt, en, fr, de }
  const t = translations[language]

  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })


  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <Reveal>
          <p className="text-[11px] tracking-widest2 uppercase text-gold mb-3">{t.contact.label}</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-6 leading-tight">
            {t.contact.title}
            <br />
            {t.contact.titleAccent}
          </h1>
          <p className="text-cream/60 leading-relaxed mb-10 max-w-md">
         
          </p>

          <div className="flex flex-col gap-4 mb-10">
            <a href="mailto:photographyrb07@gmail.com" data-cursor-hover className="flex items-center gap-3 text-cream/70 hover:text-pink transition-colors">
              <FiMail /> photographyrb07@gmail.com
            </a>
            <a href="https://www.instagram.com/photos.b0/" target="_blank" rel="noreferrer" data-cursor-hover className="flex items-center gap-3 text-cream/70 hover:text-pink transition-colors">
              <FiInstagram /> @photos.b0
            </a>
            <a href="https://www.linkedin.com/in/rita-borges-802609405/" target="_blank" rel="noreferrer" data-cursor-hover className="flex items-center gap-3 text-cream/70 hover:text-pink transition-colors">
              <FiLinkedin /> Rita Borges
            </a>
            <p className="flex items-center gap-3 text-cream/70">
              <FiMapPin /> {t.contact.location} 
            </p>
          </div>

        
        </Reveal>

        <Reveal delay={0.15}>
         <form
          action="https://formspree.io/f/mjybvkjn"
          method="POST"
          className="rounded-[2rem] bg-card border border-white/5 p-8 md:p-10 shadow-soft"
        >
            {sent ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                <p className="font-display text-3xl text-pink mb-3">{t.contact.thankYou}</p>
                <p className="text-cream/60">{t.contact.sentMessage}</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-xs tracking-widest2 uppercase text-cream/50 mb-2">
                    {t.contact.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-bg-secondary border border-white/10 px-4 py-3 text-cream placeholder:text-cream/30 focus:border-pink outline-none transition-colors"
                    placeholder={t.contact.namePlaceholder}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-xs tracking-widest2 uppercase text-cream/50 mb-2">
                    {t.contact.emailLabel}
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-bg-secondary border border-white/10 px-4 py-3 text-cream placeholder:text-cream/30 focus:border-pink outline-none transition-colors"
                    placeholder={t.contact.emailPlaceholder}
                  />
                </div>
                <div className="mb-8">
                  <label htmlFor="message" className="block text-xs tracking-widest2 uppercase text-cream/50 mb-2">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-bg-secondary border border-white/10 px-4 py-3 text-cream placeholder:text-cream/30 focus:border-pink outline-none transition-colors resize-none"
                    placeholder={t.contact.messagePlaceholder}
                  />
                </div>
                <button
                  type="submit"
                  data-cursor-hover
                  className="w-full rounded-full bg-pink py-3.5 text-sm tracking-wide text-bg-primary transition-transform duration-300 hover:scale-[1.02]"
                >
                  {t.contact.send}
                </button>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </div>
  )
}
