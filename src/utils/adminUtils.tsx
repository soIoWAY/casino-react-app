import { Firestore, collection, getDocs } from 'firebase/firestore'

interface GameStats {
	wins: number
	loses: number
	total: number
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
			console.log(totalWins)
			console.log(totalLoses)
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
