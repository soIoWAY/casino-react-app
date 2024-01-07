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

const combines = {
	diamondFortune: 77, // 💎💎💎 - х77 Diamond Fortune
	royalTriumph: 50, // 👑👑👑 - х50 Royal Triumph
	castleDefense: 30, // 🛡🏰📯 - х30 Castle Defense
	epicBattle: 20, // ⚔️🗡☠️ - х20 Epic Battle
	swordDance: 15, // 🗡🗡🗡 - х15 Sword Dance
	fortressStone: 10, // 🏰🏰🏰 - х10 Fortress Stone
	deadlyTrio: 5, // ☠️☠️☠️ - х5 Deadly Trio
	regalDefence: 3, // 👑👑🛡 - х3 Regal Defense
	crownJewels: 3, // 💎💎👑 - х3 Crown Jewels
	fanfareOfVictory: 3, // 📯📯📯 - х3 Fanfare of Victory
	classic: 2,
}

export const diamondChecker: DiamondCheckerFunction = (
	items,
	db,
	uid,
	dispatch,
	userBet
) => {
	if (items.every(item => item === '💎')) {
		winCombineFunction(db, uid, dispatch, userBet * combines.diamondFortune)
	} else if (items.every(item => item === '👑')) {
		winCombineFunction(db, uid, dispatch, userBet * combines.royalTriumph)
	} else if (items[0] === '🛡' && items[1] === '🏰' && items[2] === '📯') {
		winCombineFunction(db, uid, dispatch, userBet * combines.castleDefense)
	} else if (items[0] === '⚔️' && items[1] === '🗡' && items[2] === '☠️') {
		winCombineFunction(db, uid, dispatch, userBet * combines.epicBattle)
	} else if (items.every(item => item === '🗡')) {
		winCombineFunction(db, uid, dispatch, userBet * combines.swordDance)
	} else if (items.every(item => item === '🏰')) {
		winCombineFunction(db, uid, dispatch, userBet * combines.fortressStone)
	} else if (items.every(item => item === '☠️')) {
		winCombineFunction(db, uid, dispatch, userBet * combines.deadlyTrio)
	} else if (items[0] === '👑' && items[1] === items[0] && items[2] === '🛡') {
		winCombineFunction(db, uid, dispatch, userBet * combines.regalDefence)
	} else if (items[0] === '💎' && items[1] === items[0] && items[2] === '👑') {
		winCombineFunction(db, uid, dispatch, userBet * combines.crownJewels)
	} else if (items.every(item => item === '📯')) {
		winCombineFunction(db, uid, dispatch, userBet * combines.fanfareOfVictory)
	} else if (items.includes('⚔️')) {
		// loseFunction(db, uid, dispatch)
		winCombineFunction(db, uid, dispatch, userBet)
	} else if (items[0] === items[1] || items[1] === items[2]) {
		winCombineFunction(db, uid, dispatch, userBet * combines.classic)
	} else {
		loseFunction(db, uid, dispatch)
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

const loseFunction = (
	db: Firestore | null,
	uid: string | null,
	dispatch: Dispatch
) => {
	updateLoses(db, uid)
	dispatch(increaseLoses())
}
