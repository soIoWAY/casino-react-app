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
	email: string | null,
	dispatch: Dispatch,
	userBet: number,
	slotSounds: any,
	topCombineDelay: () => void
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
	fanfareOfVictory: 4, // 📯📯📯 - х3 Fanfare of Victory
	classic: 2,
}
export const diamondChecker: DiamondCheckerFunction = (
	items,
	db,
	email,
	dispatch,
	userBet,
	slotSounds,
	topCombineDelay
) => {
	if (items.every(item => item === '💎')) {
		winCombineFunction(db, email, dispatch, userBet * combines.diamondFortune)
		slotSounds.diamondsSound()
		topCombineDelay()
	} else if (items.every(item => item === '👑')) {
		winCombineFunction(db, email, dispatch, userBet * combines.royalTriumph)
		slotSounds.royalTriumphSound()
		topCombineDelay()
	} else if (items[0] === '🛡' && items[1] === '🏰' && items[2] === '📯') {
		winCombineFunction(db, email, dispatch, userBet * combines.castleDefense)
		slotSounds.castleDefenseSound()
		topCombineDelay()
	} else if (items[0] === '⚔️' && items[1] === '🗡' && items[2] === '☠️') {
		winCombineFunction(db, email, dispatch, userBet * combines.epicBattle)
		slotSounds.epicBattleSound()
		topCombineDelay()
	} else if (items.every(item => item === '🗡')) {
		winCombineFunction(db, email, dispatch, userBet * combines.swordDance)
		slotSounds.danceOfSwordSound()
		topCombineDelay()
	} else if (items.every(item => item === '🏰')) {
		winCombineFunction(db, email, dispatch, userBet * combines.fortressStone)
		slotSounds.fortressStoneSound()
		topCombineDelay()
	} else if (items.every(item => item === '☠️')) {
		winCombineFunction(db, email, dispatch, userBet * combines.deadlyTrio)
		slotSounds.deadlyTrioSound()
		topCombineDelay()
	} else if (items[0] === '👑' && items[1] === items[0] && items[2] === '🛡') {
		winCombineFunction(db, email, dispatch, userBet * combines.regalDefence)
		slotSounds.regalDefenseSound()
		topCombineDelay()
	} else if (items[0] === '💎' && items[1] === items[0] && items[2] === '👑') {
		winCombineFunction(db, email, dispatch, userBet * combines.crownJewels)
		slotSounds.crownJewelsSound()
		topCombineDelay()
	} else if (items.every(item => item === '📯')) {
		winCombineFunction(db, email, dispatch, userBet * combines.fanfareOfVictory)
		slotSounds.fanfareOfVictorySound()
		topCombineDelay()
	} else if (items[0] === items[1] || items[1] === items[2]) {
		winCombineFunction(db, email, dispatch, userBet * combines.classic)
		slotSounds.crownJewelsSound()
	} else {
		loseFunction(db, email, dispatch)
	}
}

const winCombineFunction = (
	db: Firestore | null,
	email: string | null,
	dispatch: Dispatch,
	userBet: number
) => {
	updateWins(db, email)
	dispatch(increaseWins())
	dispatch(increaseBalance(userBet))
	updateWinBalances(db, email, userBet)
}

const loseFunction = (
	db: Firestore | null,
	email: string | null,
	dispatch: Dispatch
) => {
	updateLoses(db, email)
	dispatch(increaseLoses())
}
