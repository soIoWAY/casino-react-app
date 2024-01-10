import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
const Balance = () => {
	const { balances } = useSelector((state: RootState) => state.stats)
	return (
		<>
			{balances !== null ? (
				<div className='font-semibold inline-block mr-1 min-w-[2.25rem]'>
					<span className=''>{balances}₴</span>
				</div>
			) : (
				<div className='font-semibold inline-block mr-1 min-w-[3.25rem]'>
					<span className=''>{balances}₴</span>
				</div>
			)}
		</>
	)
}

export default Balance
