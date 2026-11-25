import { FormEvent, useEffect, useState } from 'react'

type Page = 'home' | 'work' | 'project' | 'services' | 'studio' | 'contact'
type Filter = 'Todos' | 'Branding' | 'UI & UX' | 'Editorial'

const paths: Record<Page, string> = {
  home: '/',
  work: '/work',
  project: '/project/fred-miah',
  services: '/services',
  studio: '/studio',
  contact: '/contact',
}

const pageFromPath = (): Page => {
  const path = window.location.pathname
  if (path.startsWith('/project')) return 'project'
  if (path.startsWith('/work')) return 'work'
  if (path.startsWith('/services')) return 'services'
  if (path.startsWith('/studio')) return 'studio'
  if (path.startsWith('/contact')) return 'contact'
  return 'home'
}

const projects = [
  {
    id: 'fred',
    title: 'FRED & MIAH',
    category: 'Branding' as Filter,
    image: '/assets/work-fred.jpg',
    description:
      'Identidad visual y empaque para una línea contemporánea de cosméticos y skincare dirigida a un segmento joven (18 a 35 años) enfocado en el cuidado personal, el diseño y el lujo.',
  },
  {
    id: 'orbit',
    title: 'ORBIT',
    category: 'UI & UX' as Filter,
    image: '/assets/work-orbit.jpg',
    description:
      'Aplicación móvil y plataforma digital diseñada para optimizar la organización personal, con calendario espacial, recordatorios, diario y navegación intuitiva.',
  },
  {
    id: 'revista',
    title: 'REVISTA 360',
    category: 'Editorial' as Filter,
    image: '/assets/work-revista.jpg',
    description:
      'Diseño editorial y maquetación para la publicación institucional Revista 360 UDEM, enfocada en la difusión de arte, cultura y vida académica universitaria a través de un lenguaje visual vanguardista.',
  },
]

function Brand({ large = false }: { large?: boolean }) {
  return (
    <span className={`brand ${large ? 'brand--large' : ''}`} aria-label="nexo studio">
      nexo <i /> studio
    </span>
  )
}

function Arrow({ left = false }: { left?: boolean }) {
  return <span className="arrow" aria-hidden="true">{left ? '←' : '→'}</span>
}

function App() {
  const [page, setPage] = useState<Page>(pageFromPath)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onPopState = () => setPage(pageFromPath())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (next: Page) => {
    if (window.location.pathname !== paths[next]) window.history.pushState({}, '', paths[next])
    setPage(next)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const activePage = page === 'project' ? 'work' : page

  return (
    <div className="app">
      <Header active={activePage} navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        {page === 'home' && <Home navigate={navigate} />}
        {page === 'work' && <Work navigate={navigate} />}
        {page === 'project' && <Project navigate={navigate} />}
        {page === 'services' && <Services />}
        {page === 'studio' && <Studio />}
        {page === 'contact' && <Contact />}
      </main>
      <Footer navigate={navigate} />
    </div>
  )
}

function Header({
  active,
  navigate,
  menuOpen,
  setMenuOpen,
}: {
  active: Page
  navigate: (page: Page) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}) {
  const links: [Page, string][] = [
    ['work', 'Work'],
    ['services', 'Services'],
    ['studio', 'Studio'],
    ['contact', 'Contact'],
  ]
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="logo-button" onClick={() => navigate('home')}><Brand /></button>
        <button
          className="menu-button"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span />
        </button>
        <nav className={menuOpen ? 'open' : ''} aria-label="Navegación principal">
          {links.map(([key, label]) => (
            <button className={active === key ? 'active' : ''} onClick={() => navigate(key)} key={key}>
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Footer({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <button className="footer-brand" onClick={() => navigate('home')}><Brand large /></button>
        <nav aria-label="Navegación de pie">
          <button onClick={() => navigate('work')}>Work</button>
          <button onClick={() => navigate('services')}>Services</button>
          <button onClick={() => navigate('studio')}>Studio</button>
          <button onClick={() => navigate('contact')}>Contact</button>
        </nav>
        <a className="footer-email" href="mailto:hola@nexostudio.mx">hola@nexostudio.mx | © 2026</a>
      </div>
    </footer>
  )
}

function Home({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <>
      <section className="home-hero content-shell">
        <div className="hero-copy">
          <h1>Diseño con<br />propósito</h1>
          <p>Sistemas visuales que conectan<br />ideas, personas y experiencias.</p>
          <button className="dark-button" onClick={() => navigate('work')}>Ver proyectos <Arrow /></button>
        </div>
        <div className="hero-system">
          <div className="hero-brand"><Brand large /></div>
          <div className="service-pills">
            <span>01 / IDENTIDAD</span><span>02 / UI-UX</span><span>03 / EDITORIAL</span>
          </div>
        </div>
      </section>

      <section className="home-work content-shell">
        <h2>Proyectos seleccionados</h2>
        <button className="featured-card" onClick={() => navigate('project')}>
          <img src="/assets/work-fred.jpg" alt="Proyecto de identidad Fred & Miah" />
          <span className="featured-copy">
            <strong>FRED & MIAH</strong><small>Branding & Packaging</small><Arrow />
          </span>
        </button>
        <div className="small-projects">
          {projects.slice(1).map((project) => (
            <button className="small-project" onClick={() => navigate('work')} key={project.id}>
              <img src={project.image} alt={`Proyecto ${project.title}`} />
              <span><strong>{project.title}</strong><small>{project.category}</small></span>
            </button>
          ))}
        </div>
      </section>

      <section className="home-services content-shell">
        <h2>Nuestros servicios</h2>
        <div className="home-services-grid">
          <article><h3>01<br />Branding</h3><p>Identidad visual y empaque para línea contemporánea de cosméticos y skincare.</p></article>
          <article><h3>02<br />UI & UX</h3><p>Aplicación móvil y plataforma digital con temática espacial enfocada en gestión de actividades, calendario y diario personal.</p></article>
          <article><h3>03<br />Editorial</h3><p>Diseño editorial y maquetación para publicación institucional enfocada en arte, cultura y vida universitaria.</p></article>
        </div>
      </section>

      <section className="contact-banner">
        <h2>¿Tienes un proyecto en mente?</h2>
        <p>Construyamos algo significativo juntos</p>
        <button onClick={() => navigate('contact')}>Contactar <Arrow /></button>
      </section>
    </>
  )
}

function Work({ navigate }: { navigate: (page: Page) => void }) {
  const [filter, setFilter] = useState<Filter>('Todos')
  const visible = filter === 'Todos' ? projects : projects.filter((project) => project.category === filter)

  return (
    <section className="page-section content-shell work-page">
      <div className="page-intro">
        <h1>Proyectos seleccionados</h1>
        <p>Una selección de proyectos donde el concepto, la experimentación<br className="desktop-break" /> visual y el rigor estructural trabajan en conjunto.</p>
      </div>
      <div className="filters" aria-label="Filtrar proyectos">
        {(['Todos', 'Branding', 'UI & UX', 'Editorial'] as Filter[]).map((item) => (
          <button className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>
        ))}
      </div>
      <div className="project-list">
        {visible.map((project) => (
          <article className="work-row" key={project.id}>
            <button className="work-image" onClick={() => project.id === 'fred' && navigate('project')} aria-label={`Ver ${project.title}`}>
              <img src={project.image} alt={`Proyecto ${project.title}`} />
            </button>
            <div className="work-copy">
              <span className="category-pill">{project.category}</span>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              {project.id === 'fred' && (
                <button className="dark-button" onClick={() => navigate('project')}>Ver caso de estudio <Arrow /></button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Project({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <article className="project-page content-shell">
      <header className="project-intro">
        <h1>FRED & MIAH</h1>
        <p>Sistema de identidad y empaque para una línea contemporánea de<br className="desktop-break" /> cosméticos y skincare dirigida a un público de 18 a 35 años.</p>
      </header>
      <img className="project-hero-image" src="/assets/fred-hero.jpg" alt="Sistema de empaque Fred & Miah" />
      <dl className="project-meta">
        <div><dt>Cliente</dt><dd>Fred & Miah</dd></div>
        <div><dt>Rol</dt><dd>Identidad Visual &<br />Packaging</dd></div>
        <div><dt>Categoría</dt><dd>Branding & Empaque</dd></div>
        <div><dt>Herramientas</dt><dd>Illustrator, Photoshop</dd></div>
      </dl>

      <section className="case-section problem">
        <h2>01 / Problema</h2>
        <p>Rediseñar la identidad visual y un sistema de empaque para una marca contemporánea de cosméticos y skincare dirigida a un segmento joven (18 a 35 años). El reto consistió en proyectar cuidado personal, diseño y lujo accesible, logrando diferenciarse en el mercado mediante una propuesta gráfica con carácter propio y alta recordación visual.</p>
      </section>

      <section className="case-section process">
        <div className="case-heading">
          <h2>02 / Proceso</h2>
          <p>Se creó el concepto “Pop Structure”, una dirección que combina la energía cromática del Pop Art con la rigidez de la geometría contemporánea. El sistema se construyó sobre una paleta vibrante de seis tonos saturados, patrones modulares de puntos y tipografías sólidas que equilibran la expresividad visual con la sofisticación estructural.</p>
        </div>
        <div className="palette" aria-label="Paleta de colores">
          {['#ffc43d', '#dc0b32', '#db5997', '#2477ac', '#2ba452', '#782277'].map((color) => <i style={{ background: color }} key={color} />)}
        </div>
        <img className="process-image wordmark" src="/assets/fred-wordmark.jpg" alt="Logotipo Fred & Miah" />
        <img className="process-image" src="/assets/fred-type.jpg" alt="Tipografía Engravers Gothic" />
        <img className="process-image" src="/assets/fred-pattern.jpg" alt="Retícula de patrones de puntos" />
        <img className="process-image package-flat" src="/assets/fred-package-flat.jpg" alt="Desarrollo del empaque" />
        <img className="process-image package-system" src="/assets/fred-package-system.jpg" alt="Sistema gráfico aplicado" />
      </section>

      <section className="case-section result">
        <div className="case-heading">
          <h2>03 / Resultado</h2>
          <p>Un sistema integral de identidad y empaque listo para producción que mantiene coherencia en cada formato —desde cajas plegadizas hasta envases de producto—. La combinación de retículas geométricas, color de alto impacto y tipografía estructurada consolidó una marca versátil, reconocible y alineada con su audiencia.</p>
        </div>
        <img className="result-wide" src="/assets/fred-result-wide.jpg" alt="Empaques Fred & Miah en iluminación dramática" />
        <div className="result-grid">
          <img src="/assets/fred-result-left.jpg" alt="Papelería y cosmético Fred & Miah" />
          <img src="/assets/fred-result-right.jpg" alt="Línea de productos Fred & Miah" />
        </div>
      </section>
      <button className="back-link" onClick={() => navigate('work')}><Arrow left /> Volver a Work</button>
    </article>
  )
}

const services = [
  {
    title: <>01 / Identidad de Marca &<br />Packaging</>,
    description: 'Construcción de sistemas visuales completos desde el concepto hasta su aplicación física.',
    deliverables: 'Entregables: Identidad visual y logotipo, diseño de empaque y troqueles, sistemas cromáticos y manual de marca.',
  },
  {
    title: <>02 / Diseño UI/UX & Producto<br />Digital</>,
    description: 'Diseño centrado en el usuario para aplicaciones móviles y plataformas web interactivas.',
    deliverables: 'Entregables: Arquitectura de información, wireframes, diseño de interfaz (Hi-fi) y prototipos interactivos en Figma.',
  },
  {
    title: <>03 / Diseño Editorial</>,
    description: 'Dirección de arte y maquetación para revistas, publicaciones culturales y piezas impresas.',
    deliverables: 'Entregables: Retículas editoriales, dirección fotográfica, composición tipográfica y preparación de archivos para impresión.',
  },
]

function Services() {
  return (
    <section className="page-section content-shell services-page">
      <div className="page-intro">
        <h1>Servicios</h1>
        <p>Sistema de identidad y empaque para una línea contemporánea de<br className="desktop-break" /> cosméticos y skincare dirigida a un público de 18 a 35 años.</p>
      </div>
      <div className="service-rows">
        {services.map((service, index) => (
          <article className="service-row" key={index}>
            <div><h2>{service.title}</h2><p>{service.description}</p></div>
            <p className="deliverables">•&nbsp; {service.deliverables}</p>
          </article>
        ))}
      </div>
      <section className="methodology">
        <h2>Metodología</h2>
        <div>
          <article><h3>01&nbsp; Concepto</h3><p>Investigación y definición de una dirección visual clara que respalde cada decisión gráfica.</p></article>
          <article><h3>02&nbsp; Sistema</h3><p>Desarrollo de retículas, tipografía y color para garantizar coherencia y escalabilidad.</p></article>
          <article><h3>03&nbsp; Ejecución</h3><p>Producción de piezas finales, prototipos o empaques listos para implementación real.</p></article>
        </div>
      </section>
    </section>
  )
}

function Studio() {
  return (
    <div className="studio-page">
      <section className="studio-hero" aria-label="nexo studio, diseño con propósito">
        <img src="/assets/studio-desk.jpg" alt="Mesa de trabajo de diseño con muestras de color y papelería" />
      </section>
      <section className="studio-content content-shell">
        <div className="profile">
          <img src="/assets/cecilia.jpg" alt="Retrato de Cecilia, fundadora de nexo studio" />
          <div>
            <h1>Cecilia</h1>
            <h2>Fundadora & Directora de Diseño</h2>
            <p>Soy Cecilia, diseñadora gráfica interesada en crear sistemas visuales que conecten ideas, personas y experiencias. Mi viaje creativo comenzó con el dibujo —desde lápices y papel hasta la pintura y el diseño digital—, explorando siempre nuevas formas de comunicar a través del lenguaje visual. Hoy me enfoco en Identidad de Marca, UI/UX y Diseño Editorial para crear piezas que no solo sean atractivas visualmente, sino que cuenten una historia y resuelvan un problema real.</p>
          </div>
        </div>
        <div className="studio-details">
          <article>
            <h2>Trayectoria reciente</h2>
            <ul>
              <li>Hey Banco (AMAPRO, 2025): Desarrollo de campaña publicitaria seleccionada y reconocida con material promocional oficial de la marca.</li>
              <li>MC Mermeladas y Salsas (2024–2025): Diseño de etiquetas e identidad para envases de productos artesanales.</li>
            </ul>
          </article>
          <article>
            <h2>Herramientas & flujo</h2>
            <p>Figma, Adobe Illustrator, Adobe Photoshop, Adobe InDesign.</p>
          </article>
        </div>
      </section>
    </div>
  )
}

function MailIcon() {
  return <svg viewBox="0 0 64 48" aria-hidden="true"><rect x="2" y="2" width="60" height="44" rx="5" /><path d="m5 6 27 23L59 6M5 43l18-17m36 17L41 26" /></svg>
}

function SocialIcon({ label }: { label: string }) {
  return <span className="social-icon" aria-hidden="true">{label}</span>
}

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const nextErrors: Record<string, string> = {}
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const type = String(data.get('type') || '').trim()
    const message = String(data.get('message') || '').trim()
    if (name.length < 2) nextErrors.name = 'Escribe tu nombre.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Escribe un correo válido.'
    if (!type) nextErrors.type = 'Selecciona un tipo de proyecto.'
    if (message.length < 10) nextErrors.message = 'Cuéntanos un poco más sobre tu proyecto.'
    setErrors(nextErrors)
    if (!Object.keys(nextErrors).length) {
      data.set('form-name', 'contact')
      setSent(true)
      void fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      }).catch(() => {
        // The visual confirmation remains available in local previews without Netlify's form endpoint.
      })
    }
  }

  return (
    <section className="contact-page content-shell">
      <div className="contact-copy">
        <h1>Hablemos</h1>
        <p>¿Tienes un proyecto en mente o buscas colaborar?<br />Escríbeme y platiquemos sobre cómo darle forma visual a tu idea.</p>
        <a className="contact-email" href="mailto:hola@nexostudio.mx"><MailIcon /> hola@nexostudio.mx</a>
        <div className="socials" aria-label="Redes sociales">
          <a href="#" aria-label="Instagram"><SocialIcon label="◎" /></a>
          <a href="#" aria-label="Pinterest"><SocialIcon label="P" /></a>
          <a href="#" aria-label="LinkedIn"><SocialIcon label="in" /></a>
        </div>
      </div>
      <div className="form-panel">
        {sent ? (
          <div className="success-message" role="status">
            <span>Mensaje enviado</span>
            <h2>Gracias por escribirnos.</h2>
            <p>Tu idea ya está en camino. Te responderemos muy pronto para comenzar la conversación.</p>
            <button className="dark-button" onClick={() => setSent(false)}>Enviar otro mensaje <Arrow /></button>
          </div>
        ) : (
          <form name="contact" method="POST" data-netlify="true" onSubmit={submit} noValidate>
            <input type="hidden" name="form-name" value="contact" />
            <Field name="name" label="Nombre" error={errors.name} />
            <Field name="email" label="Correo electrónico" type="email" error={errors.email} />
            <label className={errors.type ? 'field has-error' : 'field'}>
              <span className="sr-only">Tipo de proyecto</span>
              <select name="type" defaultValue="">
                <option value="" disabled>Tipo de proyecto</option>
                <option>Identidad de marca</option>
                <option>UI & UX</option>
                <option>Diseño editorial</option>
                <option>Otro</option>
              </select>
              {errors.type && <small>{errors.type}</small>}
            </label>
            <label className={errors.message ? 'field textarea-field has-error' : 'field textarea-field'}>
              <span className="sr-only">Mensaje</span>
              <textarea name="message" placeholder="Mensaje" />
              {errors.message && <small>{errors.message}</small>}
            </label>
            <button className="submit-button" type="submit">Enviar mensaje <Arrow /></button>
          </form>
        )}
      </div>
    </section>
  )
}

function Field({ name, label, type = 'text', error }: { name: string; label: string; type?: string; error?: string }) {
  return (
    <label className={error ? 'field has-error' : 'field'}>
      <span className="sr-only">{label}</span>
      <input name={name} type={type} placeholder={label} />
      {error && <small>{error}</small>}
    </label>
  )
}

export default App
