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
		increaseBalance(state, action: PayloadAction<number>) {
			if (state.balances !== null) {
				state.balances += action.payload
			}
		},
		decreaseBalance(state, action: PayloadAction<number>) {
			if (state.balances !== null) {
				state.balances -= action.payload
			}
		},
	},
})

export const {
	setStats,
	increaseWins,
	increaseLoses,
	increaseBalance,
	decreaseBalance,
} = statsSlice.actions
export default statsSlice.reducer
