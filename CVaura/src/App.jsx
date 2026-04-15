import { startTransition, useEffect, useEffectEvent, useMemo, useRef, useState } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import emailjs from '@emailjs/browser'
import './App.css'

const SHEET_ID = '1ZnIgvXhhld9W1F6TgqpRCLt1mULRRxlPb5hntLYxJzU'
const EMAILJS_PUBLIC_KEY = 'NagH5tRuSAjvWj56m'
const EMAILJS_SERVICE_ID = 'service_0ek3p4d'
const EMAILJS_TEMPLATE_ID = 'template_ikmroyv'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'profile', label: 'Profile' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const EXPERIENCE = [
  {
    period: 'July 2023 - Present',
    title: 'Full-Stack Developer',
    company: 'Datacorp Traffic Private Limited',
    location: 'Bangalore, Karnataka',
    points: [
      'Build and maintain data-driven web applications with Django, Python, JavaScript, HTML, CSS, and APIs.',
      'Develop full-stack tools for processing large datasets and transforming them into practical visual insights.',
      'Design responsive interfaces that improve usability, efficiency, and day-to-day operations.',
      'Collaborate across teams to troubleshoot production issues and deliver features on schedule.',
      'Continuously adopt better engineering practices, tools, and frameworks to improve delivery quality.',
    ],
  },
  {
    period: 'February 2023 - June 2023',
    title: 'Software Intern',
    company: 'Datacorp Traffic Private Limited',
    location: 'Bangalore, Karnataka',
    points: [
      'Supported financial statement preparation with a focus on accuracy and consistency.',
      'Helped conduct internal audits and resolve discrepancies in operational records.',
    ],
  },
]

const PROJECTS = [
  'Built and maintain a tool to calculate employee performance using trackers and factor-based scoring.',
  'Designed a secure data migration tool to move information from a public server to a local server.',
  'Created a questionnaire generation platform and API flow to deliver survey questions to mobile apps.',
  'Developed a manpower monitoring tool that tracks footage status and estimates staffing needs.',
  'Migrated legacy visualizations to AMCharts to make business data easier to read and act on.',
  'Implemented a manpower and cost calculator to support delivery planning and forecasting.',
]

const SKILL_GROUPS = [
  {
    title: 'Back-End',
    items: ['Python', 'Django', 'PostgreSQL', 'REST APIs', 'AWS', 'Java', 'Version Control'],
  },
  {
    title: 'Front-End',
    items: ['React', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'Materialize', 'AMCharts'],
  },
  {
    title: 'Tools',
    items: ['VS Code', 'PyCharm', 'Eclipse', 'Bitbucket', 'Git', 'Google Sheets'],
  },
  {
    title: 'Soft Skills',
    items: ['Team Player', 'Action Planning', 'Documentation', 'Project Management', 'Customer Experience'],
  },
]

const LOGO_ITEMS = [
  { name: 'Python', image: '/legacy-assets/images/python_img.png', href: 'https://www.python.org/' },
  { name: 'AWS', image: '/legacy-assets/images/aws.png', href: 'https://aws.amazon.com/' },
  { name: 'Django', image: '/legacy-assets/images/dj.png', href: 'https://www.djangoproject.com/' },
  { name: 'PostgreSQL', image: '/legacy-assets/images/p_sql.png', href: 'https://www.postgresql.org/' },
  { name: 'APIs', image: '/legacy-assets/images/API.png', href: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction' },
  { name: 'Bitbucket', image: '/legacy-assets/images/bit.png', href: 'https://bitbucket.org/product/' },
  { name: 'Java', image: '/legacy-assets/images/java.png', href: 'https://www.java.com/' },
  { name: 'JavaScript', image: '/legacy-assets/images/js.png', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'jQuery', image: '/legacy-assets/images/jq.png', href: 'https://jquery.com/' },
  { name: 'Materialize', image: '/legacy-assets/images/Materialize.png', href: 'https://materializecss.com/' },
  { name: 'Bootstrap', image: '/legacy-assets/images/Bootstrap.png', href: 'https://getbootstrap.com/' },
  { name: 'HTML', image: '/legacy-assets/images/html.png', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'CSS', image: '/legacy-assets/images/css.png', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { name: 'AMCharts', image: '/legacy-assets/images/am.png', href: 'https://www.amcharts.com/' },
  { name: 'VS Code', image: '/legacy-assets/images/vs.png', href: 'https://code.visualstudio.com/' },
  { name: 'Atom', image: '/legacy-assets/images/atoms.png', href: 'https://atom-editor.cc/' },
  { name: 'PyCharm', image: '/legacy-assets/images/pyc.png', href: 'https://www.jetbrains.com/pycharm/' },
  { name: 'Eclipse', image: '/legacy-assets/images/eclipse.png', href: 'https://www.eclipse.org/' },
]

const EDUCATION = [
  {
    title: 'B.E Computer Science and Engineering',
    school: 'Sona College of Technology, Salem',
    period: '2020 - 2023',
    badge: '/legacy-assets/images/75_per.png',
    chartTitle: 'Semester Performance',
    data: [
      { category: 'Sem III', value: 7.96 },
      { category: 'Sem IV', value: 8.14 },
      { category: 'Sem V', value: 7.55 },
      { category: 'Sem VI', value: 7.26 },
      { category: 'Sem VII', value: 8.1 },
      { category: 'Sem VIII', value: 8.0 },
    ],
  },
  {
    title: 'Diploma in Computer Science and Engineering',
    school: 'Thiagarajar Polytechnic College, Salem',
    period: '2017 - 2020',
    badge: '/legacy-assets/images/85_per.png',
    chartTitle: 'Semester Scores',
    data: [
      { category: 'Sem I', value: 80.33 },
      { category: 'Sem II', value: 76.88 },
      { category: 'Sem III', value: 87.57 },
      { category: 'Sem IV', value: 83.28 },
      { category: 'Sem V', value: 88.75 },
      { category: 'Sem VI', value: 97.57 },
    ],
  },
  {
    title: 'SSLC',
    school: 'Government Higher Secondary School, Cettimangurichi, Salem',
    period: '2017',
    badge: '/legacy-assets/images/82_per.png',
    chartTitle: 'Subject Breakdown',
    data: [
      { category: 'Tamil', value: 93 },
      { category: 'English', value: 68 },
      { category: 'Mathematics', value: 76 },
      { category: 'Science', value: 78 },
      { category: 'Social Science', value: 95 },
    ],
  },
]

const DEFAULT_PROFILE =
  'Full-stack developer with experience building business tools, data workflows, APIs, and responsive interfaces. I focus on turning operational needs into practical products that are clear, reliable, and easy to use.'

const DEFAULT_CONTACTS = {
  email_icon: '',
  linkedin_icon: '',
  number_icon: '',
  whatsapp_icon: '',
  github_icon: '',
  facebook_icon: '',
  instagram_icon: '',
  youtube_icon: '',
}

const CONTACT_META = {
  email_icon: { label: 'Email', glyph: '?' },
  linkedin_icon: { label: 'LinkedIn', glyph: 'in' },
  number_icon: { label: 'Phone', glyph: '?' },
  whatsapp_icon: { label: 'WhatsApp', glyph: 'WA' },
  github_icon: { label: 'GitHub', glyph: 'GH' },
  facebook_icon: { label: 'Facebook', glyph: 'f' },
  instagram_icon: { label: 'Instagram', glyph: 'IG' },
  youtube_icon: { label: 'YouTube', glyph: 'YT' },
}

const DEFAULT_LABELS = {
  email_icon: 'Email',
  linkedin_icon: 'LinkedIn',
  number_icon: 'Phone Number',
  whatsapp_icon: 'WhatsApp',
  github_icon: 'GitHub',
  facebook_icon: 'Facebook',
  instagram_icon: 'Instagram',
  youtube_icon: 'YouTube',
}

const DEFAULT_EMOJI_PRESETS = [
  { id: 'thumbs_up', symbol: '??', text: 'Your portfolio looks impressive and professional.' },
  { id: 'heart', symbol: '??', text: 'Loved the visual style and the way the projects are presented.' },
  { id: 'squint_tears', symbol: '??', text: 'Clean work. I would be happy to discuss relevant opportunities.' },
  { id: 'face_angry', symbol: '??', text: 'A few details felt unclear. Could you share more context about the projects?' },
  { id: 'thumbs_down', symbol: '??', text: 'Please refresh the presentation and project details for stronger impact.' },
]

function parseGvizJson(text) {
  return JSON.parse(text.substring(47).slice(0, -2))
}

async function fetchSheetColumns(sheetName) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}&headers=1`
  const response = await fetch(url)
  const text = await response.text()
  const json = parseGvizJson(text)
  const headers = json.table.cols.map((col) => col.label)
  const rows = json.table.rows ?? []
  const columns = Object.fromEntries(headers.map((header) => [header, []]))

  rows.forEach((row) => {
    headers.forEach((header, index) => {
      const rawValue = row.c?.[index]?.v
      const value = rawValue instanceof Date ? rawValue.toISOString().split('T')[0] : rawValue ?? ''
      columns[header].push(value)
    })
  })

  return columns
}

function resolveContactHref(id, value) {
  if (!value) {
    return '#contact'
  }

  if (/^https?:\/\//i.test(value) || /^mailto:/i.test(value) || /^tel:/i.test(value)) {
    return value
  }

  if (id === 'email_icon') {
    return `mailto:${value}`
  }

  if (id === 'number_icon') {
    return `tel:${value}`
  }

  if (id === 'whatsapp_icon') {
    const normalized = value.replace(/[^\d+]/g, '')
    return `https://wa.me/${normalized.replace('+', '')}`
  }

  return `https://${value}`
}

function normalizeContacts(data) {
  const titles = data.title ?? []
  const values = data.data ?? []
  const subTitles = data.sub_title ?? []
  const contacts = { ...DEFAULT_CONTACTS }
  const labels = { ...DEFAULT_LABELS }

  titles.forEach((id, index) => {
    contacts[id] = values[index] ?? ''
    labels[id] = subTitles[index] || labels[id] || 'Contact'
  })

  return { contacts, labels }
}

function normalizeEmojiPresets(data) {
  if (!data.id?.length) {
    return DEFAULT_EMOJI_PRESETS
  }

  return data.id.map((id, index) => ({
    id,
    symbol: DEFAULT_EMOJI_PRESETS.find((item) => item.id === id)?.symbol ?? '??',
    text: data.text?.[index] ?? '',
  }))
}

function usePortfolioData() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE)
  const [contacts, setContacts] = useState(DEFAULT_CONTACTS)
  const [labels, setLabels] = useState(DEFAULT_LABELS)
  const [emojiPresets, setEmojiPresets] = useState(DEFAULT_EMOJI_PRESETS)

  useEffect(() => {
    let ignore = false

    async function loadData() {
      try {
        const [profileData, emojiData, contactData] = await Promise.all([
          fetchSheetColumns('profile'),
          fetchSheetColumns('emoji'),
          fetchSheetColumns('personal_details'),
        ])

        if (ignore) {
          return
        }

        startTransition(() => {
          setProfile(profileData.profile_content?.[0] || DEFAULT_PROFILE)
          setEmojiPresets(normalizeEmojiPresets(emojiData))

          const normalized = normalizeContacts(contactData)
          setContacts(normalized.contacts)
          setLabels(normalized.labels)
        })
      } catch (error) {
        console.error('Unable to load Google Sheet data', error)
      }
    }

    loadData()

    return () => {
      ignore = true
    }
  }, [])

  return { profile, contacts, labels, emojiPresets }
}

function useTheme() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('cvaura-theme')
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const nextTheme = storedTheme || preferredTheme
    setTheme(nextTheme)
    document.documentElement.dataset.theme = nextTheme
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('cvaura-theme', theme)
  }, [theme])

  return [theme, setTheme]
}

function useScrollSpy(sectionIds) {
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)

  const onScroll = useEffectEvent(() => {
    const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const currentScroll = window.scrollY
    setScrollProgress(maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0)
  })

  useEffect(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0.25, 0.5, 0.75],
      },
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return { activeSection, scrollProgress }
}

function EducationChart({ data }) {
  const chartRef = useRef(null)

  useEffect(() => {
    const root = am5.Root.new(chartRef.current)
    root.setThemes([am5themes_Animated.new(root)])
    root._logo?.dispose()

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(42),
      }),
    )

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: 'value',
        categoryField: 'category',
        legendLabelText: '{category}',
        legendValueText: '{value}',
      }),
    )

    series.slices.template.setAll({
      cornerRadius: 8,
      strokeWidth: 2,
      stroke: am5.color(0x0f172a),
    })

    series.labels.template.setAll({
      fill: am5.color(0xe2e8f0),
      fontSize: 12,
    })

    series.ticks.template.setAll({
      stroke: am5.color(0x94a3b8),
    })

    series.data.setAll(data)

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 16,
        useDefaultMarker: true,
      }),
    )

    legend.labels.template.setAll({
      fill: am5.color(0xcbd5e1),
      fontSize: 13,
    })

    legend.valueLabels.template.setAll({
      fill: am5.color(0x94a3b8),
      fontSize: 12,
    })

    legend.data.setAll(series.dataItems)
    series.appear(1000, 100)

    return () => {
      root.dispose()
    }
  }, [data])

  return <div ref={chartRef} className="education-chart" />
}

function App() {
  const [theme, setTheme] = useTheme()
  const { profile, contacts, labels, emojiPresets } = usePortfolioData()
  const [form, setForm] = useState({
    recipient_from_name: '',
    recipient_from_email: '',
    end_user_message: '',
  })
  const [mailState, setMailState] = useState({ status: 'idle', message: '' })
  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), [])
  const { activeSection, scrollProgress } = useScrollSpy(sectionIds)

  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })
  }, [])

  const contactCards = useMemo(
    () =>
      Object.keys(CONTACT_META).map((id) => ({
        id,
        label: labels[id] || CONTACT_META[id].label,
        value: contacts[id] || '',
        href: resolveContactHref(id, contacts[id] || ''),
        glyph: CONTACT_META[id].glyph,
      })),
    [contacts, labels],
  )

  const featuredMetrics = [
    { value: '2+', label: 'Years building business tools and interfaces' },
    { value: '6', label: 'Portfolio highlights carried over from the source app' },
    { value: '3', label: 'Academic performance visuals rebuilt with AMCharts' },
  ]

  const handleNavClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handlePresetClick = (text) => {
    setForm((current) => ({ ...current, end_user_message: text }))
  }

  const handleCopy = async (label, value) => {
    if (!value) {
      setMailState({ status: 'error', message: `${label} is not available right now.` })
      return
    }

    try {
      await navigator.clipboard.writeText(value)
      setMailState({ status: 'success', message: `${label} copied to clipboard.` })
    } catch (error) {
      console.error('Copy failed', error)
      setMailState({ status: 'error', message: `Unable to copy ${label.toLowerCase()}.` })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMailState({ status: 'loading', message: 'Sending your message...' })

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: form.recipient_from_name,
        email: form.recipient_from_email,
        message: form.end_user_message,
      })

      setForm({
        recipient_from_name: '',
        recipient_from_email: '',
        end_user_message: '',
      })
      setMailState({
        status: 'success',
        message: 'Message sent successfully. Thank you for reaching out.',
      })
    } catch (error) {
      console.error('EmailJS send failed', error)
      setMailState({
        status: 'error',
        message: 'The message could not be sent right now. Please use the direct contact links below.',
      })
    }
  }

  return (
    <div className="app-shell">
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} />

      <header className="site-header">
        <a
          className="brand"
          href="#home"
          onClick={(event) => {
            event.preventDefault()
            handleNavClick('home')
          }}
        >
          <span className="brand-mark">CV</span>
          <span>
            <strong>CVaura</strong>
            <small>Pushparaj Murugesan</small>
          </span>
        </a>

        <nav className="main-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeSection === item.id ? 'nav-pill active' : 'nav-pill'}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
      </header>

      <main>
        <section id="home" className="hero-section section-block">
          <div className="hero-copy">
            <p className="eyebrow">Full-stack developer portfolio</p>
            <h1>Modern engineering, calm execution, and recruiter-ready clarity.</h1>
            <p className="hero-text">
              CVaura reframes the original portfolio into a sharper React experience while preserving the source
              features: EmailJS contact flow, Google Sheets content sync, AMCharts education visuals, and the original
              asset library.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="/legacy-assets/images/Pushparaj_Murugesan.pdf" target="_blank" rel="noreferrer">
                Download Resume
              </a>
              <button type="button" className="secondary-button" onClick={() => handleNavClick('contact')}>
                Contact Me
              </button>
            </div>
            <div className="metrics-grid">
              {featuredMetrics.map((item) => (
                <article key={item.label} className="metric-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-orb hero-orb-one" />
            <div className="hero-orb hero-orb-two" />
            <div className="hero-image-frame">
              <img
                src="/legacy-assets/images/Professional tech developer portfolio design.png"
                alt="Pushparaj portfolio cover artwork"
              />
            </div>
            <div className="status-card">
              <p>Now running on React + Vite</p>
              <strong>Dark mode, charts, sheet data, and portfolio assets fully migrated.</strong>
            </div>
          </div>
        </section>

        <section id="profile" className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Profile</p>
            <h2>Professional summary</h2>
          </div>
          <div className="profile-grid">
            <article className="glass-card narrative-card">
              <p>{profile}</p>
            </article>
            <article className="glass-card profile-highlights">
              <h3>What recruiters can expect</h3>
              <ul>
                <li>Full-stack delivery across APIs, dashboards, forms, and internal tools.</li>
                <li>Experience translating business workflows into practical products.</li>
                <li>Comfort with data visualization, migration work, and responsive UI design.</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="experience" className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h2>Hands-on product and platform work</h2>
          </div>
          <div className="timeline">
            {EXPERIENCE.map((item) => (
              <article key={`${item.company}-${item.period}`} className="timeline-card glass-card">
                <div className="timeline-meta">
                  <span>{item.period}</span>
                  <span>{item.location}</span>
                </div>
                <h3>{item.title}</h3>
                <p className="timeline-company">{item.company}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Projects</p>
            <h2>Source portfolio work, presented with more focus</h2>
          </div>
          <div className="project-grid">
            {PROJECTS.map((project, index) => (
              <article key={project} className="project-card glass-card">
                <span className="project-index">0{index + 1}</span>
                <p>{project}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Skills</p>
            <h2>Technology coverage from the original site, organized for quick scanning</h2>
          </div>
          <div className="skills-layout">
            <div className="skills-groups">
              {SKILL_GROUPS.map((group) => (
                <article key={group.title} className="glass-card skill-group">
                  <h3>{group.title}</h3>
                  <div className="chip-wrap">
                    {group.items.map((item) => (
                      <span key={item} className="skill-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="logo-grid">
              {LOGO_ITEMS.map((item) => (
                <a key={item.name} className="logo-card glass-card" href={item.href} target="_blank" rel="noreferrer">
                  <img src={item.image} alt={`${item.name} logo`} />
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Education</p>
            <h2>AMCharts rebuilt inside React</h2>
          </div>
          <div className="education-grid">
            {EDUCATION.map((item) => (
              <article key={item.title} className="glass-card education-card">
                <div className="education-header">
                  <div>
                    <span className="education-period">{item.period}</span>
                    <h3>{item.title}</h3>
                    <p>{item.school}</p>
                  </div>
                  <img src={item.badge} alt={`${item.title} score badge`} />
                </div>
                <p className="chart-title">{item.chartTitle}</p>
                <EducationChart data={item.data} />
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Contact</p>
            <h2>EmailJS form and source-driven contact details</h2>
          </div>
          <div className="contact-layout">
            <form className="glass-card contact-form" onSubmit={handleSubmit}>
              <label htmlFor="recipient_from_name">Name</label>
              <input
                id="recipient_from_name"
                name="recipient_from_name"
                type="text"
                placeholder="Your name"
                value={form.recipient_from_name}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="recipient_from_email">Email</label>
              <input
                id="recipient_from_email"
                name="recipient_from_email"
                type="email"
                placeholder="example@gmail.com"
                value={form.recipient_from_email}
                onChange={handleInputChange}
                required
              />

              <div className="preset-header">
                <label htmlFor="end_user_message">Message</label>
                <span>Quick feedback presets</span>
              </div>
              <div className="preset-row">
                {emojiPresets.map((preset) => (
                  <button key={preset.id} type="button" className="emoji-preset" onClick={() => handlePresetClick(preset.text)}>
                    <span>{preset.symbol}</span>
                  </button>
                ))}
              </div>

              <textarea
                id="end_user_message"
                name="end_user_message"
                placeholder="Share your message"
                value={form.end_user_message}
                onChange={handleInputChange}
                required
              />

              <button type="submit" className="primary-button submit-button" disabled={mailState.status === 'loading'}>
                {mailState.status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {mailState.message ? (
                <p className={mailState.status === 'error' ? 'form-status error' : 'form-status success'}>{mailState.message}</p>
              ) : null}
            </form>

            <div className="contact-cards">
              {contactCards.map((item) => (
                <article key={item.id} className="glass-card contact-card">
                  <div className="contact-icon" aria-hidden="true">
                    {item.glyph}
                  </div>
                  <div className="contact-copy">
                    <p>{item.label}</p>
                    <strong>{item.value || 'Syncing from Google Sheets'}</strong>
                  </div>
                  <div className="contact-actions">
                    <a className="contact-link" href={item.href} target="_blank" rel="noreferrer">
                      Open
                    </a>
                    <button type="button" className="contact-copy-button" onClick={() => handleCopy(item.label, item.value)}>
                      Copy
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
