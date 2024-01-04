interface IControlsProps {
	userBet: number
	setUserBet: (bet: number) => void
}

const Controls = ({ userBet, setUserBet }: IControlsProps) => {
	const commonButtonClasses =
		'border-2 border-red-600 px-2 py-1 rounded-md font-semibold'

	const updateBetHandler = (value: string) => {
		const intValue = parseInt(value)
		setUserBet(intValue)
	}

	const x2BetHandler = () => {
		setUserBet(userBet * 2)
	}

	const halfBetHandler = () => {
		setUserBet(Math.round(userBet / 2))
	}

	return (
		<div>
			<div className='main-buttons flex gap-2 items-center justify-center'>
				<input
					type='number'
					name='balance'
					className='border-red-600 border-2 bg-transparent rounded-md text-center w-24 h-8 outline-none font-bold'
					maxLength={3}
					value={userBet}
					onChange={e => {
						setUserBet(parseInt(e.currentTarget.value))
					}}
					min={0}
					max={999}
				/>
				<button className={commonButtonClasses} onClick={x2BetHandler}>
					X2
				</button>
				<button className={commonButtonClasses} onClick={halfBetHandler}>
					1/2
				</button>
				<button
					className={commonButtonClasses}
					value='0'
					onClick={e => updateBetHandler(e.currentTarget.value)}
				>
					0
				</button>
			</div>
			<div className='num-buttons flex gap-2 justify-center mt-2'>
				<button
					className={commonButtonClasses}
					value='5'
					onClick={e => updateBetHandler(e.currentTarget.value)}
				>
					5
				</button>
				<button
					className={commonButtonClasses}
					value='10'
					onClick={e => updateBetHandler(e.currentTarget.value)}
				>
					10
				</button>
				<button
					className={commonButtonClasses}
					value='25'
					onClick={e => updateBetHandler(e.currentTarget.value)}
				>
					25
				</button>
				<button
					className={commonButtonClasses}
					value='50'
					onClick={e => updateBetHandler(e.currentTarget.value)}
				>
					50
				</button>
				<button
					className={commonButtonClasses}
					value='100'
					onClick={e => updateBetHandler(e.currentTarget.value)}
				>
					100
				</button>
				<button
					className={commonButtonClasses}
					value='250'
					onClick={e => updateBetHandler(e.currentTarget.value)}
				>
					250
				</button>
			</div>
		</div>
	)
}

export default Controls
