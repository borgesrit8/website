import Reveal from '../components/Reveal'
import StatCounter from '../components/StatCounter'
import { useLanguage } from '../hooks/LanguageContext'
import pt from '../i18n/pt'
import en from '../i18n/en'
import fr from '../i18n/fr'
import de from '../i18n/de'

export default function About() {
  const { language } = useLanguage()
  const translations = { pt, en, fr, de }
  const t = translations[language]

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <p className="text-[11px] tracking-widest2 uppercase text-gold mb-3">{t.about.label}</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-6 leading-tight">
          {t.about.title}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-cream/60 leading-relaxed mb-4">
            {t.about.paragraph1}
          </p>
          <p className="text-cream/60 leading-relaxed mb-10">
            {t.about.paragraph2}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="font-script text-4xl text-pink mb-14">Rita Borges</p>
        </Reveal>

        <Reveal delay={0.4} className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <StatCounter value={13} label={t.about.eventsCovered} />
          <StatCounter value={3} suffix="k+" label={t.about.photosTaken} />
          <StatCounter value={3} label={t.about.yearsExperience} />

        </Reveal>
      </div>
    </div>
  )
}