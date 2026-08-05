import { FiInstagram, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-white/10 bg-bg-secondary px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-display text-2xl text-cream">Rita Borges</p>
          <p className="text-[10px] tracking-widest2 uppercase text-gold">Photography</p>
        </div>

        <div className="flex items-center gap-5 text-cream/70">
          <a href="https://www.instagram.com/photos.b0/" target="_blank" rel="noreferrer" aria-label="Instagram" data-cursor-hover className="hover:text-pink transition-colors">
            <FiInstagram size={19} />
          </a>
          <a href="https://www.linkedin.com/in/rita-borges-802609405/" target="_blank" rel="noreferrer" aria-label="LinkedIn" data-cursor-hover className="hover:text-pink transition-colors">
            <FiLinkedin size={19} />
          </a>
        </div>

        <button
          onClick={scrollTop}
          data-cursor-hover
          aria-label="Voltar ao topo"
          className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs text-cream/70 hover:border-gold hover:text-gold transition-colors"
        >
          <FiArrowUp /> Topo
        </button>
      </div>

      <p className="text-center text-[11px] text-cream/30 mt-10">
        © {new Date().getFullYear()} Rita Borges Photography. Todos os direitos reservados.
      </p>
    </footer>
  )
}
