import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './admin/admin.slice'
import dbReducer from './db/db.slice'
import statsReducer from './user/stats.slice'
import userReducer from './user/user.slice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		stats: statsReducer,
		db: dbReducer,
		admin: adminReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
