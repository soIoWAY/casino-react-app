import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Layout from '../../app/Layout'
import Controls from '../../components/controls/Controls'
import TopCombine from '../../components/topCombines/TopCombine'
import { RootState } from '../../store/store'
import { decreaseBalance } from '../../store/user/stats.slice'
import { diamondsCombines } from '../../utils/combines'
import { diamondChecker } from '../../utils/diamondsUtils'
import { updateLosesBalances } from '../../utils/statsUtils'

import castleDefenseSounds from '../../assets/sounds/diamonds/castleDefenseSounds.mp3'
import crownJewelsSounds from '../../assets/sounds/diamonds/crownJewelsSounds.mp3'
import danceOfSwordSounds from '../../assets/sounds/diamonds/danceOfSwordSounds.mp3'
import deadlyTrioSounds from '../../assets/sounds/diamonds/deadlyTrioSounds.mp3'
import diamondsSounds from '../../assets/sounds/diamonds/diamondsSounds.mp3'
import epicBattleSounds from '../../assets/sounds/diamonds/epicBattleSounds.mp3'
import fanfareOfVictorySounds from '../../assets/sounds/diamonds/fanfareOfVictorySounds.mp3'
import fortressStoneSounds from '../../assets/sounds/diamonds/fortressSroneSounds.mp3'
import regalDefenseSounds from '../../assets/sounds/diamonds/regalDefenseSounds.mp3'
import royalSounds from '../../assets/sounds/diamonds/royalSounds.mp3'
//@ts-ignore
import useSound from 'use-sound'

const Diamonds = () => {
	const items: string[] = ['💎', '⚔️', '🗡', '👑', '🏰', '☠️', '🛡', '📯'] // ['💎', '⚔️', '🗡', '👑', '🏰', '☠️', '🛡', '📯']
	const randomItems: () => number = () => {
		return Math.floor(Math.random() * items.length)
	}
	const [item1, setItem1] = useState<string>('💎')
	const [item2, setItem2] = useState<string>('💎')
	const [item3, setItem3] = useState<string>('💎')

	const [isAnimating, setIsAnimating] = useState<boolean>(false)
	const [isAnimatingCompleted, setIsAnimatingCompleted] =
		useState<boolean>(false)

	const [disabled, setDisabled] = useState(false)

	const [userBet, setUserBet] = useState(0)

	const { db } = useSelector((state: RootState) => state.db)
	const { uid } = useSelector((state: RootState) => state.user)

	const dispatch = useDispatch()

	const { balances } = useSelector((state: RootState) => state.stats)

	const [diamondsSound] = useSound(diamondsSounds, { volume: 0.35 })
	const [royalTriumphSound] = useSound(royalSounds, { volume: 0.35 })
	const [castleDefenseSound] = useSound(castleDefenseSounds, { volume: 0.35 })
	const [epicBattleSound] = useSound(epicBattleSounds, { volume: 0.35 })
	const [danceOfSwordSound] = useSound(danceOfSwordSounds, { volume: 0.35 })
	const [fortressStoneSound] = useSound(fortressStoneSounds, { volume: 0.35 })
	const [deadlyTrioSound] = useSound(deadlyTrioSounds, { volume: 0.35 })
	const [fanfareOfVictorySound] = useSound(fanfareOfVictorySounds, {
		volume: 0.35,
	})
	const [regalDefenseSound] = useSound(regalDefenseSounds, { volume: 0.35 })
	const [crownJewelsSound] = useSound(crownJewelsSounds, { volume: 0.35 })

	const slotSounds = {
		diamondsSound,
		royalTriumphSound,
		castleDefenseSound,
		epicBattleSound,
		danceOfSwordSound,
		fortressStoneSound,
		deadlyTrioSound,
		fanfareOfVictorySound,
		regalDefenseSound,
		crownJewelsSound,
	}

	const updateItems = () => {
		const delay = 145

		if (isNaN(userBet)) {
			setUserBet(0)
		} else if (userBet < 2) {
			alert('Сума ставки має бути більшою або рівною 2')
		} else if (userBet > 999) {
			alert('Сума ставки має бути меншою за 1000')
		} else if (balances && balances - userBet < 0) {
			alert('Недостатньо коштів на балансів')
		} else {
			const animate = () => {
				updateLosesBalances(uid, userBet)
				dispatch(decreaseBalance(userBet))
				setIsAnimating(true)
				setDisabled(true)
				setItem1(items[randomItems()])
				setTimeout(() => {
					setItem2(items[randomItems()])
				}, delay)
				setTimeout(() => {
					setItem3(items[randomItems()])
				}, delay * 2)
				setTimeout(() => {
					setIsAnimating(false)
					setIsAnimatingCompleted(true)
				}, delay * 3)
				setTimeout(() => {
					setDisabled(false)
				}, delay * 5)
			}

			animate()
		}
	}

	const topCombineDelay = () => {
		setDisabled(true)
		setTimeout(() => {
			setDisabled(false)
		}, 3500)
	}

	useEffect(() => {
		if (!isAnimating && isAnimatingCompleted) {
			const items = [item1, item2, item3]
			diamondChecker(items, uid, dispatch, userBet, slotSounds, topCombineDelay)
		}
	}, [
		item1,
		item2,
		item3,
		isAnimating,
		dispatch,
		db,
		uid,
		isAnimatingCompleted,
	])

	return (
		<div>
			<Layout>
				{/* components */}
				<div className='flex flex-col items-center justify-center h-[75vh]'>
					<div className='game border-2 rounded-md w-9/12 md:w-4/12 py-12 md:py-16 flex justify-center md:h-8/12'>
						<div className='text-5xl md:text-6xl flex justify-center  items-center border-red-600 border-t-2 border-b-2 py-3'>
							<span className='p-1'>{item1}</span>
							<span className='p-1'>{item2}</span>
							<span className='p-1'>{item3}</span>
						</div>
					</div>
					<div className='controlsButtons mt-5'>
						<Controls userBet={userBet} setUserBet={setUserBet} />
					</div>
					<div className='spinButton'>
						<button
							className='border-2 border-red-600 rounded-md uppercase text-bold px-8 py-2 mt-5 tracking-wide'
							onClick={updateItems}
							disabled={disabled}
						>
							spin
						</button>
					</div>
				</div>
				<div className='flex justify-center'>
					<TopCombine combines={diamondsCombines} />
				</div>
			</Layout>
		</div>
	)
}

export default Diamonds
