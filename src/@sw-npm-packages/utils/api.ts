import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * (60 * 1000),
      cacheTime: 10 * (60 * 1000)
    }
  }
})

export { queryClient }
