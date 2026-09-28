import { useEffect, useState, type ReactNode } from 'react'
import { content, type Lang } from './content'
import { LangContext } from './context'

const KEY = 'lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'pt' || saved === 'en') return saved
  } catch {
    return 'pt'
  }
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const t = content[lang]

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang, t])

  function setLang(next: Lang) {
    setLangState(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      return
    }
  }

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}
