import { Link } from 'react-router-dom'
import { FiMapPin, FiCalendar, FiArrowRight } from 'react-icons/fi'
import Reveal from '../components/Reveal'
import { events } from '../data/events'
import { useLanguage } from '../hooks/LanguageContext'
import pt from '../i18n/pt'
import en from '../i18n/en'
import fr from '../i18n/fr'
import de from '../i18n/de'

export default function Events() {
  const { language } = useLanguage()
  const translations = { pt, en, fr, de }
  const t = translations[language]

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-20">
          <p className="text-[11px] tracking-widest2 uppercase text-gold mb-3">{t.events.label}</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream">{t.events.title}</h1>
        </Reveal>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

          <div className="flex flex-col gap-16">
            {events.map((ev, i) => (
              <Reveal key={ev.id} delay={i * 0.1} className="relative pl-16 md:pl-0">
                <div
                  className={`md:flex md:items-center md:gap-12 ${
                    i % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 top-2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-gold ring-4 ring-bg-primary" />

                  <div className="md:w-1/2">
                    <div className="overflow-hidden rounded-3xl shadow-soft">
                      <img
                        src={ev.cover}
                        alt={t.events[ev.id].name}
                        loading="lazy"
                        className="h-64 w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className="md:w-1/2 mt-6 md:mt-0">
                    <h3 className="font-display text-2xl md:text-3xl text-cream mb-2">{t.events[ev.id].name}</h3>
                    <div className="flex flex-wrap gap-4 text-xs text-cream/50 mb-4">
                      <span className="flex items-center gap-1.5">
                        <FiMapPin /> {t.events[ev.id].location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FiCalendar /> {t.events[ev.id].date}
                      </span>
                    </div>
                    <p className="text-cream/60 text-sm leading-relaxed mb-5">{t.events[ev.id].description}</p>
                    <Link
                      to="/gallery"
                      data-cursor-hover
                      className="inline-flex items-center gap-2 text-sm text-pink hover:text-gold transition-colors"
                    >
                      {t.events.viewGallery} <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
