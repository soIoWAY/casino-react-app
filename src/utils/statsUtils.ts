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
	uid: string,
	dispatch: Dispatch
) => {
	try {
		if (db && uid) {
			const adminsDocRef = doc(db, 'admins', uid)
			const adminsDocSnap = await getDoc(adminsDocRef)
			if (adminsDocSnap.exists()) {
				const data = adminsDocSnap.data() as DocumentData
				dispatch(setAdmin({ isAdmin: data.isAdmin }))
			} else {
				await setDoc(doc(db, 'admins', uid), { isAdmin: false })
			}
		}
	} catch (err) {
		console.error(err)
	}
}

export const fetchBalance = async (
	db: Firestore,
	uid: string,
	setBalance: (balance: number) => void
) => {
	try {
		if (db && uid) {
			const balanceDocRef = doc(db, 'balance', uid)
			const balanceDocSnap = await getDoc(balanceDocRef)
			if (balanceDocSnap.exists()) {
				const data = balanceDocSnap.data() as DocumentData
				if (data && typeof data.balance === 'number') {
					setBalance(data.balance as number)
				}
			} else {
				await setDoc(doc(db, 'balance', uid), { balance: 100 })
				setBalance(100)
			}
		}
	} catch (err) {
		console.error('Error fetching balance - ', err)
	}
}

export const fetchStats = async (
	db: Firestore,
	uid: string,
	setWins: (wins: number) => void,
	setLoses: (loses: number) => void
) => {
	try {
		if (db && uid) {
			const statsDocRef = doc(db, 'stats', uid)
			const statsDocSnap = await getDoc(statsDocRef)
			if (statsDocSnap.exists()) {
				const data = statsDocSnap.data() as DocumentData
				setWins(data.wins as number)
				setLoses(data.loses as number)
			} else {
				await setDoc(doc(db, 'stats', uid), { wins: 0, loses: 0 })
				setWins(0)
				setLoses(0)
			}
		}
	} catch (err) {
		console.error('Error fetching stats - ', err)
	}
}

export const updateWins = async (db: Firestore | null, uid: string | null) => {
	try {
		if (db && uid) {
			const statsDocRef = doc(db, 'stats', uid)
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

export const updateLoses = async (db: Firestore | null, uid: string | null) => {
	try {
		if (db && uid) {
			const statsDocRef = doc(db, 'stats', uid)
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
	uid: string | null,
	userBet: number
) => {
	try {
		if (db && uid) {
			const balanceDocRef = doc(db, 'balance', uid)
			const balanceDocSnap = await getDoc(balanceDocRef)
			if (balanceDocSnap.exists()) {
				const data = balanceDocSnap.data() as DocumentData
				const currentBalance = data.balance as number
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
	uid: string | null,
	userBet: number
) => {
	try {
		if (db && uid) {
			const balanceDocRef = doc(db, 'balance', uid)
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
