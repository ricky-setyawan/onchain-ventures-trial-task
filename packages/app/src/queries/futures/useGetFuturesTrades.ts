import { NetworkId, FuturesTrade } from '@kwenta/sdk/types'
import { mapTrades, notNill, FuturesTradeResult } from '@kwenta/sdk/utils'
import { wei } from '@synthetixio/wei'
import { getFuturesTrades } from 'api/futures'
import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query'

import { MAX_TIMESTAMP } from 'constants/defaults'
import QUERY_KEYS from 'constants/queryKeys'
import Connector from 'containers/Connector'
import logError from 'utils/logError'

const useGetFuturesTrades = (
	currencyKey: string | undefined,
	options?: UseInfiniteQueryOptions<FuturesTrade[] | null> & { forceAccount: boolean }
) => {
	const { network } = Connector.useContainer()

	return useInfiniteQuery<FuturesTrade[] | null>(
		QUERY_KEYS.Futures.Trades(network?.id as NetworkId, currencyKey || null),
		async () => {
			if (!currencyKey) return null

			try {
				const response = await getFuturesTrades()
				if (Array.isArray(response) && response.length > 0) {
					response.forEach((item) => {
						item.timestamp = wei(item.timestamp)
						item.margin = wei(item.margin)
						item.size = wei((item.size / 10) ^ 18)
						item.positionSize = wei(item.positionSize)
						item.pnl = wei(item.pnl)
						item.feesPaid = wei(item.feesPaid)
						item.fundingAccrued = wei(item.fundingAccrued)
						item.keeperFeesPaid = wei(item.keeperFeesPaid)
					})
				}

				return response ? mapTrades(response as FuturesTradeResult[]) : null
			} catch (e) {
				logError(e)
				return null
			}
		},
		{
			...options,
			refetchInterval: 15000,
			getNextPageParam: (lastPage) => {
				return notNill(lastPage) && lastPage?.length > 0
					? {
							maxTs: lastPage[lastPage.length - 1].timestamp,
					  }
					: {
							maxTs: 0,
					  }
			},
			getPreviousPageParam: (firstPage) => {
				return notNill(firstPage) && firstPage?.length > 0
					? {
							minTs: firstPage[0].timestamp,
							maxTs: MAX_TIMESTAMP,
					  }
					: null
			},
		}
	)
}

export default useGetFuturesTrades
