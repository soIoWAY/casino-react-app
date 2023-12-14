import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface UserState {
	email: string | null
	uid: string | null
}

const initialState: UserState = {
	email: null,
	uid: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<UserState>) {
			return { ...state, ...action.payload }
		},
	},
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
