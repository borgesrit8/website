import Reveal from '../components/Reveal'
import StatCounter from '../components/StatCounter'

export default function About() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <p className="text-[11px] tracking-widest2 uppercase text-gold mb-3">About me</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-6 leading-tight">
          Where Speed Meets Emotion
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-cream/60 leading-relaxed mb-4">
            I'm a rally photographer and a Computer Engineering student, always chasing the split second where speed, light and emotion become one frame.
          </p>
          <p className="text-cream/60 leading-relaxed mb-10">
            Every stage is different. Dust, rain, mist or sunlight—I'm drawn to the moments where precision meets unpredictability, capturing the raw emotion that makes rally unforgettable.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="font-script text-4xl text-pink mb-14">Rita Borges</p>
        </Reveal>

        <Reveal delay={0.4} className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <StatCounter value={13} label="Events Covered" />
          <StatCounter value={3} suffix="k+" label="Photos Taken" />
          <StatCounter value={3} label="Years of Experience" />

        </Reveal>
      </div>
    </div>
  )
}