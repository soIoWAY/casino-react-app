import {
	DocumentData,
	Firestore,
	doc,
	getDoc,
	setDoc,
} from 'firebase/firestore'

import { Dispatch } from '@reduxjs/toolkit'
import { setAdmin } from '../store/admin/admin.slice'

export const fetchAdminStatus = async (
	db: Firestore,
	email: string,
	dispatch: Dispatch
) => {
	try {
		if (db && email) {
			const adminsDocRef = doc(db, 'admins', email)
			const adminsDocSnap = await getDoc(adminsDocRef)
			if (adminsDocSnap.exists()) {
				const data = adminsDocSnap.data() as DocumentData
				dispatch(setAdmin({ isAdmin: data.isAdmin }))
			} else {
				await setDoc(doc(db, 'admins', email), { isAdmin: false })
			}
		}
	} catch (err) {
		console.error(err)
	}
}

export const fetchBalance = async (
	db: Firestore,
	email: string,
	setBalance: (balance: number) => void
) => {
	try {
		if (db && email) {
			const balanceDocRef = doc(db, 'balances', email)
			const balanceDocSnap = await getDoc(balanceDocRef)
			if (balanceDocSnap.exists()) {
				const data = balanceDocSnap.data() as DocumentData
				if (data && typeof data.balance === 'number') {
					setBalance(data.balance as number)
				}
			} else {
				await setDoc(doc(db, 'balances', email), { balance: 100 })
				setBalance(100)
			}
		}
	} catch (err) {
		console.error('Error fetching balance - ', err)
	}
}

export const fetchStats = async (
	db: Firestore,
	email: string,
	setWins: (wins: number) => void,
	setLoses: (loses: number) => void
) => {
	try {
		if (db && email) {
			const statsDocRef = doc(db, 'stats', email)
			const statsDocSnap = await getDoc(statsDocRef)
			if (statsDocSnap.exists()) {
				const data = statsDocSnap.data() as DocumentData
				setWins(data.wins as number)
				setLoses(data.loses as number)
			} else {
				await setDoc(doc(db, 'stats', email), { wins: 0, loses: 0 })
				setWins(0)
				setLoses(0)
			}
		}
	} catch (err) {
		console.error('Error fetching stats - ', err)
	}
}

export const updateWins = async (
	db: Firestore | null,
	email: string | null
) => {
	try {
		if (db && email) {
			const statsDocRef = doc(db, 'stats', email)
			const statsDocSnap = await getDoc(statsDocRef)
			if (statsDocSnap.exists()) {
				const data = statsDocSnap.data() as DocumentData
				const currentWins = data.wins as number
				await setDoc(statsDocRef, { wins: currentWins + 1 }, { merge: true })
			}
		}
	} catch (error) {
		console.error(error)
	}
}

export const updateLoses = async (
	db: Firestore | null,
	email: string | null
) => {
	try {
		if (db && email) {
			const statsDocRef = doc(db, 'stats', email)
			const statsDocSnap = await getDoc(statsDocRef)
			if (statsDocSnap.exists()) {
				const data = statsDocSnap.data() as DocumentData
				const currentLoses = data.loses as number
				await setDoc(statsDocRef, { loses: currentLoses + 1 }, { merge: true })
			}
		}
	} catch (error) {
		console.error(error)
	}
}

export const updateWinBalances = async (
	db: Firestore | null,
	email: string | null,
	userBet: number
) => {
	try {
		if (db && email) {
			const balanceDocRef = doc(db, 'balances', email)
			const balanceDocSnap = await getDoc(balanceDocRef)
			if (balanceDocSnap.exists()) {
				const data = balanceDocSnap.data() as DocumentData
				const currentBalance = data.balance as number
				console.log(currentBalance)
				await setDoc(
					balanceDocRef,
					{ balance: currentBalance + userBet },
					{ merge: true }
				)
			}
		}
	} catch (error) {
		console.error(error)
	}
}

export const updateLosesBalances = async (
	db: Firestore | null,
	email: string | null,
	userBet: number
) => {
	try {
		if (db && email) {
			const balanceDocRef = doc(db, 'balances', email)
			const balanceDocSnap = await getDoc(balanceDocRef)
			if (balanceDocSnap.exists()) {
				const data = balanceDocSnap.data() as DocumentData
				const currentBalance = data.balance as number
				await setDoc(
					balanceDocRef,
					{ balance: currentBalance - userBet },
					{ merge: true }
				)
			}
		}
	} catch (error) {
		console.error(error)
	}
}
