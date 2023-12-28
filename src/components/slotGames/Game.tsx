interface IGameProps {
	title: string
	img: string
}

const Game = ({ title, img }: IGameProps) => {
	return (
		<div className='border-2 rounded-md w-3/4 md:w-1/5 lg:w-1/6'>
			<img src={img} alt={title} className='object-contain h-full w-full' />
		</div>
	)
}

export default Game
