import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from 'firebase/auth'

import { Dispatch } from '@reduxjs/toolkit'
import { initializeFirebase } from '../../firebase'
import { setUser } from '../store/user/user.slice'

const auth = getAuth(initializeFirebase())
export const logoutUser = async () => {
	try {
		await auth.signOut()
	} catch (err) {
		console.error(err)
	}
}

export const loginUser = async (
	email: string,
	password: string,
	dispatch: Dispatch,
	setError: (error: string) => void
) => {
	try {
		const userCredentials = await signInWithEmailAndPassword(
			auth,
			email,
			password
		)
		dispatch(
			setUser({
				email: userCredentials.user.email,
				uid: userCredentials.user.uid,
			})
		)
	} catch (error: unknown) {
		if (error instanceof Error) {
			setError(error.message)
		}
	}
}

export const registerUser = async (
	email: string,
	password: string,
	setError: (error: string) => void
) => {
	try {
		const userCredentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
		console.log(userCredentials.user.displayName)
	} catch (error: unknown) {
		if (error instanceof Error) {
			setError(error.message)
		}
	}
}
