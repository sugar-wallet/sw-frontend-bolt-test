import { useQueryClient, type QueryKey } from '@tanstack/react-query'

export const useGetFetchQuery = (name: QueryKey) => {
  const queryClient = useQueryClient()

  return queryClient.getQueryData(name)
}
