import { fetchSignInMethodsForEmail, getAuth } from 'firebase/auth'
import { Firestore, collection, getDocs } from 'firebase/firestore'
import { initializeFirebase } from '../../firebase'

interface GameStats {
	wins: number
	loses: number
	total: number
}

const auth = getAuth(initializeFirebase())

export default async function getUidByEmail(
	email: string
): Promise<string | null> {
	try {
		const signInMethods = await fetchSignInMethodsForEmail(auth, email)
		if (signInMethods && signInMethods.length > 0) {
			const user = auth.currentUser
			if (user) {
				return user.uid
			}
		}
	} catch (error) {
		console.error('Error fetching user data:', error)
	}
	return null
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
