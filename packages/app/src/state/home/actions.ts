import KwentaSDK from '@kwenta/sdk'
import { PerpsMarketV2 } from '@kwenta/sdk/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { providers } from 'ethers'

import { notifyError } from 'components/ErrorNotifier'
import { ThunkConfig } from 'state/types'
import { serializeV2Markets } from 'utils/futures'
import logError from 'utils/logError'

export const fetchOptimismMarkets = createAsyncThunk<
	{ markets: PerpsMarketV2<string>[] },
	providers.Provider,
	ThunkConfig
>('home/fetchOptimismMarkets', async (mainnetL2Provider, { extra: { api } }) => {
	// For the home page we always fetch OP mainnet markets
	const markets = await api.futures.getMarkets({ provider: mainnetL2Provider, networkId: 10 })
	const serializedMarkets = serializeV2Markets(markets)
	return { markets: serializedMarkets }
})

export const fetchFuturesStats = createAsyncThunk<
	Awaited<ReturnType<KwentaSDK['stats']['getFuturesStats']>>,
	void,
	ThunkConfig
>('home/fetchFuturesStats', async (_, { extra: { api } }) => {
	try {
		return await api.stats.getFuturesStats()
	} catch (error) {
		logError(error)
		notifyError('Failed to fetch futures stats', error)
		throw error
	}
})
