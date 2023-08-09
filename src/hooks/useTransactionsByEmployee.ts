import { useCallback, useState } from "react"
import { RequestByEmployeeParams, Transaction } from "../utils/types"
import { TransactionsByEmployeeResult } from "./types"
import { useCustomFetch } from "./useCustomFetch"

export function useTransactionsByEmployee(): TransactionsByEmployeeResult {
  const { fetchWithoutCache, loading } = useCustomFetch()
  const [transactionsByEmployee, setTransactionsByEmployee] = useState<Transaction[] | null>(null)

  const fetchById = useCallback(
    async (employeeId: string) => {
      //fixes bug 7: fetch without cache since cache prevents filtered results from
      //reading updates in api after the initial load. 
      // from what I understand, my reasoning behind the bug and fix: if data is not overwritten since the initial load,
      // the website never needs to load data using fetchWithCache from the api again after initial load with fetchWithCache.
      // subsequent fetchs with cache utilize the cache (which is faster by nature) to retreive data instead of the api,
      //and this results in not having the most recent transaction checkbox data, which is bug 7.
      //subsequent fetchs with cache are needed for overwriting transaction checkbox data.
      // overwriting data occurs with invalidate functions that reset the data.
      //this means the bug occurs anytime a checkbox edit is made, then the opposite of 
      //the last fetch function is called (fetchAll is opposite of fetchById).
      //overwriting also occurs here when one employee's data overwrites another here.
      //For example, fetchById data with employee 1 is overwritten with another employee's, 
      // and requires the call fetchWithCache after the initial load when 
      // returning to employee 1's filter. due to fetching w/cache, employee1's initial load's
      //data is loaded instead of the most recent api's data, which is incorrect
      const data = await fetchWithoutCache<Transaction[], RequestByEmployeeParams>(
        "transactionsByEmployee",
        {
          employeeId,
        }
      )
      setTransactionsByEmployee(data)
    },
    [fetchWithoutCache]
  )

  const invalidateData = useCallback(() => {
    setTransactionsByEmployee(null)
  }, [])

  return { data: transactionsByEmployee, loading, fetchById, invalidateData }
}
