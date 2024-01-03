import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Firestore } from 'firebase/firestore'

interface IDBState {
	db: Firestore | null
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
