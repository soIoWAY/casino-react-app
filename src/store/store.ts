import { configureStore } from '@reduxjs/toolkit'
import dbReducer from './db/db.slice'
import statsReducer from './user/stats.slice'
import userReducer from './user/user.slice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		stats: statsReducer,
		db: dbReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
