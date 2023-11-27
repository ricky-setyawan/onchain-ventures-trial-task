import { getUpdatedPrices } from 'api/prices'
import { useEffect } from 'react'

import { fetchBalances } from 'state/balances/actions'
import { fetchEarnTokenPrices } from 'state/earn/actions'
import { selectMarkets } from 'state/futures/selectors'
import { useAppDispatch, useAppSelector, usePollAction } from 'state/hooks'
import { fetchPreviousDayPrices, updatePrices } from 'state/prices/actions'
import { setConnectionError } from 'state/prices/reducer'
import sdk from 'state/sdk'
import { selectNetwork, selectWallet } from 'state/wallet/selectors'
import { serializePrices } from 'utils/futures'
import logError from 'utils/logError'

import { checkSynthetixStatus } from './actions'

export async function useAppData(ready: boolean) {
	const dispatch = useAppDispatch()
	const wallet = useAppSelector(selectWallet)
	const markets = useAppSelector(selectMarkets)
	const network = useAppSelector(selectNetwork)

	usePollAction('fetchEarnTokenPrices', fetchEarnTokenPrices, {
		intervalTime: 60000 * 10,
		dependencies: [wallet],
		disabled: !wallet,
	})

	usePollAction('fetchBalances', fetchBalances, { dependencies: [wallet, network] })

	//@ts-ignore
	usePollAction('fetchPreviousDayPrices', fetchPreviousDayPrices, {
		intervalTime: 60000 * 15,
		dependencies: [markets.length, network],
		disabled: !markets.length,
	})

	usePollAction('checkSynthetixStatus', checkSynthetixStatus, {
		intervalTime: 2 * 60 * 1000,
		dependencies: [network],
	})

	useEffect(() => {
		if (ready) {
			sdk.prices.startPriceUpdates(15000)
		}
	}, [ready])

	useEffect(() => {
		interface PricesResult {
			prices: object
			type: any
			source: string
		}

		// Define an asynchronous function to get updated prices
		const fetchAndHandlePrices = async () => {
			try {
				const item = await getUpdatedPrices()
				const pricesResult = item as PricesResult

				if (pricesResult.prices)
					dispatch(updatePrices(serializePrices(pricesResult.prices), pricesResult.type))
				if (pricesResult.source === 'stream') dispatch(setConnectionError(null))
			} catch (err) {
				logError(err)
			}
		}

		fetchAndHandlePrices()
		setInterval(fetchAndHandlePrices, 5000)

		sdk.prices.onPricesConnectionUpdated(({ error }) => {
			dispatch(setConnectionError(error?.message))
		})

		return () => {
			sdk.prices.removePricesListeners()
			sdk.prices.removeConnectionListeners()
		}
	}, [dispatch])
}
