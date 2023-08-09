import { useCallback, useState } from "react"
import { PaginatedRequestParams, PaginatedResponse, Transaction } from "../utils/types"
import { PaginatedTransactionsResult } from "./types"
import { useCustomFetch } from "./useCustomFetch"

export function usePaginatedTransactions(): PaginatedTransactionsResult {
  const { fetchWithCache, loading } = useCustomFetch()
  const [paginatedTransactions, setPaginatedTransactions] = useState<PaginatedResponse<
    Transaction[]
  > | null>(null)

//added new state to keep track of if there is a page after the current transaction page
  const [noNextPage, setNoNextPage] = useState(false);

  const fetchAll = useCallback(async () => {

    const response = await fetchWithCache<PaginatedResponse<Transaction[]>, PaginatedRequestParams>(
      "paginatedTransactions",
      {
        page: paginatedTransactions === null ? 0 : paginatedTransactions.nextPage,
      }
    )

    setPaginatedTransactions((previousResponse) => {
      if (response === null || previousResponse === null) {
        return response
      }

      //set noNextPage as "true" to represent that there's "no next page"
      if(response.nextPage === null) {
        setNoNextPage(true);
      }

      return { data: [...previousResponse.data, ...response.data], nextPage: response.nextPage}
    })
  }, [fetchWithCache, paginatedTransactions])

  const invalidateData = useCallback(() => {
    setPaginatedTransactions(null)
  }, [])

  //return noNextPage state in return object
  return { data: paginatedTransactions, loading, fetchAll, invalidateData, no_next: noNextPage}
}
