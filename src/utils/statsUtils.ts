import {
	DocumentData,
	Firestore,
	doc,
	getDoc,
	setDoc,
} from 'firebase/firestore'

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

export const fetchStats = async (db: Firestore, uid: string) => {
	try {
		if (db && uid) {
			const statsDocRef = doc(db, 'stats', uid)
			const statsDocSnap = await getDoc(statsDocRef)
			if (statsDocSnap.exists()) {
				const data = statsDocSnap.data() as DocumentData
				console.log(data)
			} else {
				await setDoc(doc(db, 'stats', uid), { wins: 0, loses: 0 })
			}
		}
	} catch (err) {
		console.error('Error fetching stats - ', err)
	}
}
