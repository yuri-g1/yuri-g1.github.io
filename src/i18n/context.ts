import { createContext, useContext } from 'react'
import { content, type Content, type Lang } from './content'

export type LangValue = { lang: Lang; setLang: (lang: Lang) => void; t: Content }

export const LangContext = createContext<LangValue>({ lang: 'pt', setLang: () => {}, t: content.pt })

export const useLang = () => useContext(LangContext)
