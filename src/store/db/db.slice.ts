import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Database } from 'firebase/database'

interface IDBState {
	db: Database | null
}

const initialState: IDBState = {
	db: null,
}

const dbSlice = createSlice({
	name: 'db',
	initialState,
	reducers: {
		setDB(state, action: PayloadAction<IDBState>) {
			return { ...state, ...action.payload }
		},
	},
})

export const { setDB } = dbSlice.actions
export default dbSlice.reducer
