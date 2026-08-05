# Rita Borges Photography

Portfolio de fotografia de ralis e automobilismo — React 19 + Vite + Tailwind CSS + Framer Motion.

## Como correr

```bash
npm install
npm run dev
```

Abre depois o endereço que aparece no terminal (normalmente `http://localhost:5173`).

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## O que personalizar primeiro

1. **Fotos** — todas as imagens usam placeholders do Unsplash (`src="https://images.unsplash.com/..."`).
   Substitui pelos teus ficheiros reais:
   - `src/data/gallery.js` — imagens da galeria (mantém `w`/`h` parecidos com o original para o masonry não desalinhar)
   - `src/data/events.js` — capas dos eventos
   - `src/pages/Home.jsx` — imagem do hero
   - `src/pages/About.jsx` — foto de perfil

2. **Textos** — a bio em `About.jsx`, a descrição dos eventos em `data/events.js`, e os números das estatísticas.

3. **Contactos** — Instagram, LinkedIn e email estão em `Navbar.jsx`, `Footer.jsx` e `Contact.jsx`.

4. **Formulário de contacto** — atualmente só simula o envio. Liga a um serviço como
   [Formspree](https://formspree.io) ou [EmailJS](https://www.emailjs.com) dentro de `handleSubmit` em `Contact.jsx`.

5. **Mapa** — em `Contact.jsx` há um placeholder onde podes colocar um Google Maps embed (`<iframe>`).

## Estrutura

```
src/
  components/   Navbar, Footer, Lightbox, cursor custom, loading screen, carousel...
  pages/        Home, About, Gallery, Events, Contact
  data/         gallery.js, events.js — conteúdo fácil de editar
  hooks/        variantes de animação reutilizáveis (fade/scale)
  index.css     estilos globais, cursor, scrollbar, motivo "speed streaks"
```

## Notas

- O cursor customizado desliga-se automaticamente em ecrãs táteis/mobile.
- `prefers-reduced-motion` é respeitado — as animações desativam-se se o utilizador preferir menos movimento.
- Todas as imagens usam `loading="lazy"` fora do hero.
