import { KwentaStatus } from '@kwenta/sdk/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from 'state/types'

export const checkSynthetixStatus = createAsyncThunk<boolean, void, ThunkConfig>(
	'app/checkSynthetixStatus',
	(_, { extra: { api } }) => {
		return api.system.getSynthetixStatus()
	}
)

export const fetchKwentaStatus = createAsyncThunk<KwentaStatus, void, ThunkConfig>(
	'app/fetchKwentaStatus',
	(_, { extra: { api } }) => {
		return api.system.getKwentaStatus()
	}
)
