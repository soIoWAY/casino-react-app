import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Layout from '../../app/Layout'
import Controls from '../../components/controls/Controls'
import { RootState } from '../../store/store'
import { decreaseBalance } from '../../store/user/stats.slice'
import { diamondChecker } from '../../utils/diamondsUtils'
import { updateLosesBalances } from '../../utils/statsUtils'

const Diamonds = () => {
	const items: string[] = ['💎', '⚔️', '🗡', '👑', '🏰', '☠️', '🛡', '📯']
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

	const updateItems = () => {
		const delay = 150

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
				updateLosesBalances(db, uid, userBet)
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

	useEffect(() => {
		if (!isAnimating && isAnimatingCompleted) {
			const items = [item1, item2, item3]
			console.log(items.length)
			diamondChecker(items, db, uid, dispatch, userBet)
			// if (item1 === item2 && item2 === item3) {
			// 	updateWins(db, uid)
			// 	dispatch(increaseWins())
			// 	updateWinBalances(db, uid, userBet * 15)
			// } else if (item1 === item2 || item2 === item3) {
			// 	updateWins(db, uid)
			// 	dispatch(increaseWins())
			// 	updateWinBalances(db, uid, userBet * 2)
			// 	dispatch(increaseBalance(userBet * 2))
			// } else {
			// 	updateLoses(db, uid)
			// 	dispatch(increaseLoses())
			// }
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
				<div className='flex flex-col items-center justify-center h-[80vh]'>
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
			</Layout>
		</div>
	)
}

export default Diamonds
