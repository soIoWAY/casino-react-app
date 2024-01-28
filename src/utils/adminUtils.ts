import {
	DocumentData,
	Firestore,
	collection,
	doc,
	getDoc,
	getDocs,
	setDoc,
} from 'firebase/firestore'

interface GameStats {
	wins: number
	loses: number
	total: number
}

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

export const fetchTotalGame = async (
	db: Firestore | null,
	setTotalGames: React.Dispatch<React.SetStateAction<GameStats>>
) => {
	let totalWins = 0
	let totalLoses = 0
	try {
		if (db) {
			const statsCollectionRef = collection(db, 'stats')
			const statsQuerySnapshot = await getDocs(statsCollectionRef)

			statsQuerySnapshot.forEach(doc => {
				const data = doc.data()
				if (data.wins) {
					totalWins += data.wins
				}

				if (data.loses) {
					totalLoses += data.loses
				}
			})
		}
	} catch (err) {
		console.error(err)
	}
	setTotalGames({
		wins: totalWins,
		loses: totalLoses,
		total: totalWins + totalLoses,
	})
}
