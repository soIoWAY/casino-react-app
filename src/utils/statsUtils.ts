import axios from 'axios'

const statsHref = `https://casino-app-54eb7-default-rtdb.europe-west1.firebasedatabase.app/stats/`
const balanceHref = `https://casino-app-54eb7-default-rtdb.europe-west1.firebasedatabase.app/balances/`

export const fetchAdminStatus = async (uid: string | null) => {
	try {
		if (uid) {
			const href = `https://casino-app-54eb7-default-rtdb.europe-west1.firebasedatabase.app/admins/${uid}.json`
			const res = await axios.get(href)
			const adminsData = res.data
			if (adminsData && typeof adminsData.isAdmin === 'boolean') {
				return adminsData.isAdmin
			} else {
				await axios.put(href, { isAdmin: false })
				return false
			}
		}
	} catch (error) {
		throw error
	}
}

export const fetchStats = async (uid: string | null) => {
	try {
		if (uid) {
			const href = statsHref + `${uid}.json`
			const res = await axios.get(href)
			const statsData = res.data
			if (statsData && typeof statsData === 'object') {
				return statsData
			} else {
				await axios.put(href, { wins: 0, loses: 0 })
				return { wins: 0, loses: 0 }
			}
		}
	} catch (error) {
		throw error
	}
}

export const updateWins = async (uid: string | null) => {
	try {
		const href = statsHref + `${uid}.json`
		const res = await axios.get(href)
		const statsData = res.data
		if (statsData && typeof statsData === 'object') {
			const updateWins = statsData.wins + 1
			await axios.put(href, { ...statsData, wins: updateWins })
		}
	} catch (error) {
		throw error
	}
}

export const updateLoses = async (uid: string | null) => {
	if (uid) {
		try {
			const href = statsHref + `${uid}.json`
			const res = await axios.get(href)
			const statsData = res.data
			if (statsData && typeof statsData === 'object') {
				const updateLoses = statsData.loses + 1
				await axios.put(href, { ...statsData, loses: updateLoses })
			}
		} catch (error) {
			throw error
		}
	}
}

export const fetchBalance = async (uid: string | null) => {
	try {
		if (uid) {
			const href = balanceHref + `${uid}.json`
			const response = await axios.get(href)
			const balanceData = response.data
			if (balanceData && typeof balanceData.balance === 'number') {
				return balanceData.balance
			} else {
				await axios.put(href, { balance: 100 })
				return 100
			}
		}
	} catch (error) {
		throw error
	}
	return 0
}

export const updateWinBalances = async (
	uid: string | null,
	userBet: number
) => {
	try {
		if (uid) {
			const href = balanceHref + `${uid}.json`
			const res = await axios.get(href)
			const balanceData = res.data
			if (balanceData && typeof balanceData.balance === 'number') {
				const updateBalance = balanceData.balance + userBet
				await axios.put(href, { balance: updateBalance })
			}
		}
	} catch (error) {
		throw error
	}
}

export const updateLosesBalances = async (
	uid: string | null,
	userBet: number
) => {
	try {
		if (uid) {
			const href = balanceHref + `${uid}.json`
			const res = await axios.get(href)
			const balanceData = res.data
			if (balanceData && typeof balanceData.balance === 'number') {
				const updateBalance = balanceData.balance - userBet
				await axios.put(href, { balance: updateBalance })
			}
		}
	} catch (error) {
		throw error
	}
}
