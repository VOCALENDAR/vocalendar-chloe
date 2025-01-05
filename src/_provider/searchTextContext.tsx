import { createContext, useContext, useState } from 'react'

interface SearchTextContextValue {
  text: string
  setText: (text: string) => void
}

const SearchTextContext = createContext<SearchTextContextValue | null>(null)

/**
 * SearchBoxで入力された値を子コンポーネントに伝搬させるためのプロバイダー
 * @param children
 * @returns
 */
export function SearchTextProvider({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState<string>('')
  return <SearchTextContext.Provider value={{ text, setText }}>{children}</SearchTextContext.Provider>
}

/**
 * SearchBoxで入力された値を授受するためのコンテキスト
 * @returns
 */
export const useSearchTextContext = (): SearchTextContextValue => {
  const ctx = useContext(SearchTextContext)
  if (!ctx) throw new Error('useUser must be used within a SearchTextProvider')

  return { text: ctx.text, setText: ctx.setText }
}
