interface ITopEvent {
	league: string
	team1Name: string
	team1: string
	team2Name: string
	team2: string
	coeff1: string
	coeff2: string
	x: string
	stadium: string
	date: string
}

const TopEvent = ({
	league,
	team1Name,
	team1,
	team2Name,
	team2,
	coeff1,
	coeff2,
	x,
	stadium,
	date,
}: ITopEvent) => {
	const cmnStyles = 'bg-[#3b3350] p-1 rounded-md hover:bg-red-600 transition'
	return (
		<div className='flex flex-col bg-[#1C1632] w-[90%] md:w-2/5 lg:w-1/4 rounded-md py-2 px-6 mt-3'>
			<div className='border-b-2 pb-1 flex text-xl md:text-lg font-bold items-center justify-between'>
				<h2 className=''>{league}</h2>
				<span>{date}</span>
			</div>
			<div className='border-b-2 border-red-600 px-2 pt-4'>
				<div className='flex justify-between items-center'>
					<div className='team-1'>
						<img src={team1} alt={team1Name} />
					</div>
					<span className='text-xl font-bold'>VS</span>
					<div className='team-2'>
						<img src={team2} alt={team2Name} />
					</div>
				</div>
				<div className='stadium flex justify-center py-2 font-semibold'>
					{stadium} Stadium
				</div>
			</div>
			<div className='flex justify-between mt-2 px-1 lg:text-[15px]'>
				<button className={cmnStyles}>1 | {coeff1}</button>
				<button className={cmnStyles}>X | {x}</button>
				<button className={cmnStyles}>2 | {coeff2}</button>
			</div>
		</div>
	)
}

export default TopEvent
