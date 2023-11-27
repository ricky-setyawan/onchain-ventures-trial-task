import { NetworkId } from '@kwenta/sdk/types'
import { getRatesEndpoint, getCandles } from '@kwenta/sdk/utils'
import { getPythCandles } from 'api/futures'

import { DEFAULT_NETWORK_ID } from 'constants/defaults'

import { mapCandles } from './utils'

export const requestCandlesticks = async (
	currencyKey: string | null,
	minTimestamp: number,
	maxTimestamp = Math.floor(Date.now() / 1000),
	period: number,
	networkId: NetworkId = DEFAULT_NETWORK_ID
) => {
	const ratesEndpoint = getRatesEndpoint(networkId)

	if (period <= 3600) {
		const response = await getPythCandles()
		return response
	} else {
		const response = await getCandles(
			ratesEndpoint,
			{
				first: 999999,
				where: {
					synth: `${currencyKey}`,
					timestamp_gt: `${minTimestamp}`,
					timestamp_lt: `${maxTimestamp}`,
					period: `${period}`,
				},
				orderBy: 'timestamp',
				orderDirection: 'asc',
			},
			{
				id: true,
				synth: true,
				open: true,
				high: true,
				low: true,
				close: true,
				timestamp: true,
				average: true,
				period: true,
				aggregatedPrices: true,
			}
		).then((response) => {
			return mapCandles(response)
		})
		return response
	}
}
