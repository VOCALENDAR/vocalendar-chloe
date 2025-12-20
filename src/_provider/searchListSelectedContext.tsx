import { createContext, useContext, useState } from 'react'
import { Event } from '../app/types/event'

interface searchListSelectedContextValue {
  selectedEvnet: Event | undefined
  setSelectedEvnet: (event: Event) => void
}

const searchListSelectedContext = createContext<searchListSelectedContextValue | null>(null)

/**
 * SearchListで選択された値を子コンポーネントに伝搬させるためのプロバイダー
 * @param children
 * @returns
 */
export function SearchListSelectedProvider({ children }: { children: React.ReactNode }) {
  const [selectedEvnet, setSelectedEvnet] = useState<Event | undefined>()
  return (
    <searchListSelectedContext.Provider value={{ selectedEvnet, setSelectedEvnet }}>
      {children}
    </searchListSelectedContext.Provider>
  )
}

/**
 * SearchListで選択された値を授受するためのコンテキスト
 * @returns
 */
export const useSearchListSelectedContext = (): searchListSelectedContextValue => {
  const ctx = useContext(searchListSelectedContext)
  if (!ctx) throw new Error('useUser must be used within a SearchListSelectedProvider')

  return { ...ctx }
}
