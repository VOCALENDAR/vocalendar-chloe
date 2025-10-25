import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}
export const AppQueryProvider: FC<Props> = props => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, //デフォルトでコンポーネントにフォーカスが当たるとフェッチするのを無効化
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
