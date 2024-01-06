// 📯 👑 ☠️ - x50 Король помер
// 🏰 🛡️ 🏹 - x47 Замок в облозі
//📯 🗡 🛡️ - х44 Розпочалась війна
//⚔️ 👑 ☠️ - x41 Громадянська війна
// 👑 x5 = x125
// 💎 x4 = x64
// 🗡 x3 = x27

import {
	increaseBalance,
	increaseLoses,
	increaseWins,
} from '../store/user/stats.slice'
import { updateLoses, updateWinBalances, updateWins } from './statsUtils'

import { Dispatch } from '@reduxjs/toolkit'
import { Firestore } from 'firebase/firestore'

type DiamondCheckerFunction = (
	items: string[],
	db: Firestore | null,
	uid: string | null,
	dispatch: Dispatch,
	userBet: number
) => void

export const diamondChecker: DiamondCheckerFunction = (
	items,
	db,
	uid,
	dispatch,
	userBet
) => {
	if (items[0] === '📯' && items[1] === '👑' && items[2] === '☠️') {
		winCombineFunction(db, uid, dispatch, userBet * 50)
	} else if (items[0] === '🏰' && items[1] === '🛡️' && items[2] === '🏹') {
		winCombineFunction(db, uid, dispatch, userBet * 47)
	} else if (items[0] === '📯' && items[1] === '🗡' && items[2] === '🛡️') {
		winCombineFunction(db, uid, dispatch, userBet * 44)
	} else if (items[0] === '⚔️' && items[1] === '👑' && items[2] === '☠️') {
		winCombineFunction(db, uid, dispatch, userBet * 41)
	} else if (items.every(item => item === '👑')) {
		winCombineFunction(db, uid, dispatch, userBet * 38)
	} else if (items.every(item => item === '💎')) {
		winCombineFunction(db, uid, dispatch, userBet * 35)
	} else if (items.every(item => item === '🗡')) {
		winCombineFunction(db, uid, dispatch, userBet * 33)
	} else if (items.includes('⚔️')) {
		updateLoses(db, uid)
		dispatch(increaseLoses())
	} else if (items[0] === items[1] && items[2] === items[1]) {
		winCombineFunction(db, uid, dispatch, userBet * 15)
	} else if (items[0] === items[1] || items[1] === items[2]) {
		winCombineFunction(db, uid, dispatch, userBet * 2)
	}
}

const winCombineFunction = (
	db: Firestore | null,
	uid: string | null,
	dispatch: Dispatch,
	userBet: number
) => {
	updateWins(db, uid)
	dispatch(increaseWins())
	dispatch(increaseBalance(userBet))
	updateWinBalances(db, uid, userBet)
}
