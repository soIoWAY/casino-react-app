import axios from 'axios'
import {
	DocumentData,
	Firestore,
	doc,
	getDoc,
	setDoc,
} from 'firebase/firestore'

// interface GameStats {
// 	wins: number
// 	loses: number
// 	total: number
// }

export const reduceUserBalance = async (
	db: Firestore | null,
	email: string,
	amount: number
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
					{ balance: currentBalance - amount },
					{ merge: true }
				)
			}
		}
	} catch (error) {
		console.error(error)
	}
}

export const addUserBalance = async (
	db: Firestore | null,
	email: string | null,
	amount: number
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
					{ balance: currentBalance + amount },
					{ merge: true }
				)
			}
		}
	} catch (error) {
		console.error(error)
	}
}

export const fetchTotalGame = async () => {
	try {
		const href = `https://casino-app-54eb7-default-rtdb.europe-west1.firebasedatabase.app/stats.json`
		const res = await axios.get(href)
		const statsData = res.data
		if (statsData && typeof statsData === 'object') {
			let wins = 0
			let loses = 0
			const objToArr = Object.values(statsData)

			objToArr.forEach(el => {
				if (
					typeof el === 'object' &&
					el !== null &&
					'wins' in el &&
					'loses' in el &&
					typeof el.wins === 'number' &&
					typeof el.loses === 'number'
				) {
					wins += el.wins ?? 0
					loses += el.loses ?? 0
				}
			})
			return { wins, loses }
		} else {
			return { wins: 0, loses: 0 }
		}
	} catch (error) {
		throw error
	}
}
