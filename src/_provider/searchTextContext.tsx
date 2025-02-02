import { createContext, useContext, useState } from 'react'

interface SearchTextContextValue {
  searchText: string
  setSearchText: (text: string) => void
}

const SearchTextContext = createContext<SearchTextContextValue | null>(null)

/**
 * SearchBoxで入力された値を子コンポーネントに伝搬させるためのプロバイダー
 * @param children
 * @returns
 */
export function SearchTextProvider({ children }: { children: React.ReactNode }) {
  const [searchText, setSearchText] = useState<string>('')
  return <SearchTextContext.Provider value={{ searchText, setSearchText }}>{children}</SearchTextContext.Provider>
}

/**
 * SearchBoxで入力された値を授受するためのコンテキスト
 * @returns
 */
export const useSearchTextContext = (): SearchTextContextValue => {
  const ctx = useContext(SearchTextContext)
  if (!ctx) throw new Error('useUser must be used within a SearchTextProvider')

  return { ...ctx }
}
