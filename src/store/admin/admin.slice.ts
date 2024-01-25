import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IAdminState {
	isAdmin: boolean | null
}

const initialState: IAdminState = {
	isAdmin: null,
}

const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		setAdmin(state, action: PayloadAction<IAdminState>) {
			return { ...state, ...action.payload }
		},
	},
})

export const { setAdmin } = adminSlice.actions
export default adminSlice.reducer
