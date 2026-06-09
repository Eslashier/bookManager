import { useState, useEffect, useMemo, useRef } from 'react'
import { BOOKS, CATEGORIES } from './books'
import './App.css'

const STORAGE_KEY = 'sk-books-checklist'
const THEME_KEY = 'sk-books-theme'

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

export default function App() {
  const [checks, setChecks] = useState(loadState)
  const [activeCategory, setActiveCategory] = useState('all')
  const [theme, setTheme] = useState(loadTheme)
  const [importMsg, setImportMsg] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    saveState(checks)
  }, [checks])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  function toggleTheme() {
    setTheme(t => (t === 'light' ? 'dark' : 'light'))
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

  const haveCount = BOOKS.filter(b => checks[b.id]?.have).length
  const readCount = BOOKS.filter(b => checks[b.id]?.read).length
  const total = BOOKS.length

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

        <div className="stats">
          <span className="stat">
            <span className="stat-number">{haveCount}</span>
            <span className="stat-label"> de {total} tengo</span>
          </span>
          <span className="stat-sep">·</span>
          <span className="stat">
            <span className="stat-number">{readCount}</span>
            <span className="stat-label"> de {total} leídos</span>
          </span>
        </div>
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

      <main className="book-list">
        <div className="book-list-header">
          <span className="col-year">Año</span>
          <span className="col-title">Título</span>
          <span className="col-check">Lo tengo</span>
          <span className="col-check">Lo leí</span>
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
