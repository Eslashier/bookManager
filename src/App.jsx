import { useState, useEffect, useMemo, useRef } from 'react'
import { BOOKS, CATEGORIES } from './books'
import './App.css'

const STORAGE_KEY = 'sk-books-checklist'
const THEME_KEY = 'sk-books-theme'
const STATS_KEY = 'sk-books-stats-open'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function loadTheme() {
  return localStorage.getItem(THEME_KEY) || 'light'
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function pct(n, total) {
  return total ? Math.round((n / total) * 100) : 0
}

export default function App() {
  const [checks, setChecks] = useState(loadState)
  const [activeCategory, setActiveCategory] = useState('all')
  const [theme, setTheme] = useState(loadTheme)
  const [statsOpen, setStatsOpen] = useState(
    () => localStorage.getItem(STATS_KEY) !== 'false'
  )
  const [importMsg, setImportMsg] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => { saveState(checks) }, [checks])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  function toggleTheme() {
    setTheme(t => (t === 'light' ? 'dark' : 'light'))
  }

  function toggleStats() {
    setStatsOpen(o => {
      localStorage.setItem(STATS_KEY, String(!o))
      return !o
    })
  }

  function toggle(id, field) {
    setChecks(prev => {
      const current = prev[id] || { have: false, read: false }
      const updated = { ...current, [field]: !current[field] }
      if (field === 'read' && updated.read) updated.have = true
      if (field === 'have' && !updated.have) updated.read = false
      return { ...prev, [id]: updated }
    })
  }

  function exportData() {
    const json = JSON.stringify(checks, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sk-books.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function importData(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = evt => {
      try {
        const data = JSON.parse(evt.target.result)
        if (typeof data !== 'object' || Array.isArray(data)) throw new Error()
        setChecks(data)
        setImportMsg('✓ Datos cargados correctamente')
        setTimeout(() => setImportMsg(null), 3000)
      } catch {
        setImportMsg('✗ Archivo inválido')
        setTimeout(() => setImportMsg(null), 3000)
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const filtered = useMemo(
    () =>
      activeCategory === 'all'
        ? BOOKS
        : BOOKS.filter(b => b.category === activeCategory),
    [activeCategory]
  )

  // Estadísticas del filtro activo (panel de gráfico)
  const stats = useMemo(() => {
    const t = filtered.length
    const have = filtered.filter(b => checks[b.id]?.have).length
    const read = filtered.filter(b => checks[b.id]?.read).length
    const haveOnly = have - read
    const neither = t - have
    return {
      total: t,
      have,
      read,
      haveOnly,
      neither,
      havePct: pct(have, t),
      readPct: pct(read, t),
      haveOnlyPct: pct(haveOnly, t),
      neitherPct: pct(neither, t),
    }
  }, [filtered, checks])

  const activeCatLabel = CATEGORIES.find(c => c.id === activeCategory)?.label ?? 'Todo'

  return (
    <div className="app">
      <header className="header">
        <div className="header-top">
          <h1>Stephen King — Lista de libros</h1>
          <div className="toolbar">
            <button className="tool-btn" onClick={exportData} title="Guardar progreso en archivo JSON">
              <span className="btn-icon">↓</span> Exportar
            </button>
            <button
              className="tool-btn"
              onClick={() => fileInputRef.current.click()}
              title="Cargar progreso desde archivo JSON"
            >
              <span className="btn-icon">↑</span> Importar
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={importData}
            />
            <button
              className="tool-btn theme-btn"
              onClick={toggleTheme}
              title={theme === 'light' ? 'Activar tema oscuro' : 'Activar tema claro'}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>

        {importMsg && (
          <div className={`import-msg${importMsg.startsWith('✓') ? ' ok' : ' err'}`}>
            {importMsg}
          </div>
        )}


      </header>

      <nav className="filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`filter-btn${activeCategory === cat.id ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      {/* Panel de estadísticas */}
      <div className={`chart-panel${statsOpen ? '' : ' chart-collapsed'}`}>
        <button className="chart-toggle" onClick={toggleStats} aria-expanded={statsOpen}>
          <span className="chart-title">Estadísticas</span>
          {!statsOpen && (
            <span className="chart-summary">
              {activeCatLabel} · <strong>{stats.have}</strong>/{stats.total} tengo · <strong>{stats.read}</strong>/{stats.total} leídos
            </span>
          )}
          <span className="chart-chevron">{statsOpen ? '▲' : '▼'}</span>
        </button>

        {statsOpen && (
          <>
            <div className="progress-row">
              <span className="progress-label">Lo tengo</span>
              <div className="progress-track">
                <div className="progress-fill have" style={{ width: `${stats.havePct}%` }} />
              </div>
              <span className="progress-info">
                <strong>{stats.have}</strong>/{stats.total}
                <span className="progress-pct">{stats.havePct}%</span>
              </span>
            </div>

            <div className="progress-row">
              <span className="progress-label">Lo leí</span>
              <div className="progress-track">
                <div className="progress-fill read" style={{ width: `${stats.readPct}%` }} />
              </div>
              <span className="progress-info">
                <strong>{stats.read}</strong>/{stats.total}
                <span className="progress-pct">{stats.readPct}%</span>
              </span>
            </div>

            <div className="stacked-bar">
              {stats.read > 0 && (
                <div className="seg seg-read" style={{ width: `${stats.readPct}%` }} title={`Leídos: ${stats.read}`} />
              )}
              {stats.haveOnly > 0 && (
                <div className="seg seg-have" style={{ width: `${stats.haveOnlyPct}%` }} title={`Tengo, sin leer: ${stats.haveOnly}`} />
              )}
              {stats.neither > 0 && (
                <div className="seg seg-none" style={{ width: `${stats.neitherPct}%` }} title={`Sin leer: ${stats.neither}`} />
              )}
            </div>

            <div className="stacked-legend">
              <span className="legend-item">
                <span className="legend-dot dot-read" />
                Leídos <strong>{stats.read}</strong>
              </span>
              <span className="legend-item">
                <span className="legend-dot dot-have" />
                Tengo <strong>{stats.haveOnly}</strong>
              </span>
              <span className="legend-item">
                <span className="legend-dot dot-none" />
                Sin leer <strong>{stats.neither}</strong>
              </span>
            </div>
          </>
        )}
      </div>

      <main className="book-list">
        <div className="book-list-header">
          <span className="col-year">Año</span>
          <span className="col-title">Título</span>
          <span className="col-check">
            Lo tengo
            <span className="col-count">{stats.have}/{stats.total}</span>
          </span>
          <span className="col-check">
            Lo leí
            <span className="col-count">{stats.read}/{stats.total}</span>
          </span>
        </div>
        {filtered.map(book => {
          const state = checks[book.id] || { have: false, read: false }
          return (
            <div
              key={book.id}
              className={`book-row${state.read ? ' row-read' : state.have ? ' row-have' : ''}`}
            >
              <span className="col-year">{book.year}</span>
              <span className="col-title">
                {book.title}
                {book.note && <span className="book-note"> — {book.note}</span>}
              </span>
              <span className="col-check">
                <input
                  type="checkbox"
                  checked={state.have}
                  onChange={() => toggle(book.id, 'have')}
                  aria-label={`Tengo ${book.title}`}
                />
              </span>
              <span className="col-check">
                <input
                  type="checkbox"
                  checked={state.read}
                  onChange={() => toggle(book.id, 'read')}
                  aria-label={`Leí ${book.title}`}
                />
              </span>
            </div>
          )
        })}
      </main>

      <footer className="footer">
        <p>Los datos se guardan en tu navegador (localStorage).</p>
      </footer>
    </div>
  )
}
