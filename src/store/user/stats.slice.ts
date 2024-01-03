import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IStatsState {
	balances: number | null
	wins: number | null
	loses: number | null
}

const initialState: IStatsState = {
	balances: null,
	wins: null,
	loses: null,
}

const statsSlice = createSlice({
	name: 'stats',
	initialState,
	reducers: {
		setStats(state, action: PayloadAction<IStatsState>) {
			return { ...state, ...action.payload }
		},
		increaseWins(state) {
			if (state.wins !== null) {
				state.wins += 1
			}
		},
		increaseLoses(state) {
			if (state.loses !== null) {
				state.loses += 1
			}
		},
	},
})

export const { setStats, increaseWins, increaseLoses } = statsSlice.actions
export default statsSlice.reducer
