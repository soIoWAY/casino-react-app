import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateLoses, updateWins } from '../../utils/statsUtils'

import Layout from '../../app/Layout'
import { RootState } from '../../store/store'

const Diamonds = () => {
	const items: string[] = ['💎', '❄️', '⛄️', '🎁', '🎄', '🎅🏻']
	const randomItems: () => number = () => {
		return Math.floor(Math.random() * items.length)
	}
	const [item1, setItem1] = useState<string>('💎')
	const [item2, setItem2] = useState<string>('💎')
	const [item3, setItem3] = useState<string>('💎')

	const [isAnimating, setIsAnimating] = useState<boolean>(false)
	const [isAnimatingCompleted, setIsAnimatingCompleted] =
		useState<boolean>(false)

	const { db } = useSelector((state: RootState) => state.db)
	const { uid } = useSelector((state: RootState) => state.user)

	const dispatch = useDispatch()

	const updateItems = () => {
		const delay = 150

		const animate = () => {
			setIsAnimating(true)
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
		}

		animate()
	}

	useEffect(() => {
		if (!isAnimating && isAnimatingCompleted) {
			const items = [item1, item2, item3]
			if (item1 === item2 && item2 === item3) {
				updateWins(db, uid, dispatch)
			} else if (item1 === item2 || item2 === item3) {
				updateWins(db, uid, dispatch)
			} else {
				updateLoses(db, uid, dispatch)
			}
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
				<div className='flex flex-col items-center justify-center h-[60vh]'>
					<div className='game border-2 rounded-md w-9/12 md:w-4/12 py-12 md:py-16 flex justify-center md:h-8/12'>
						<div className='text-5xl md:text-6xl flex justify-center  items-center border-red-600 border-t-2 border-b-2 py-3'>
							<span className='p-1'>{item1}</span>
							<span className='p-1'>{item2}</span>
							<span className='p-1'>{item3}</span>
						</div>
					</div>
					<div className='betsButton'>
						<button
							className='border-2 border-red-600 rounded-md uppercase text-bold  px-8 py-2 mt-5 tracking-wide'
							onClick={updateItems}
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
