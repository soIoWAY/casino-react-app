interface ITopEventHeaderProps {
	onNext: () => void
	onPrev: () => void
}

const TopEventsHeader = ({ onNext, onPrev }: ITopEventHeaderProps) => {
	return (
		<div className='flex items-center justify-between'>
			<h1 className='text-2xl font-bold tracking-wide'>Top Events</h1>
			<div className='flex gap-3 text-2xl bont-bold'>
				<button className='bg-[#1C1632] px-2 rounded-md' onClick={onPrev}>
					&lt;
				</button>
				<button className='bg-[#1C1632] px-2 rounded-md' onClick={onNext}>
					&gt;
				</button>
			</div>
		</div>
	)
}

export default TopEventsHeader
