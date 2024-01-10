import cherrySlot from '../../assets/cherry.png'
import diamondSlot from '../../assets/diamond-slot.png'
import Game from './Game'

const gamesList = [
	{
		title: 'diamonds',
		img: diamondSlot,
		href: '/slots/diamonds',
	},
	{
		title: 'cherrys',
		img: cherrySlot,
		href: '/slots/cherrys',
	},
]

const GamesList = () => {
	return (
		<div className='mt-5'>
			<div className='flex flex-wrap md:justify-start justify-center gap-6 md:gap-4'>
				{gamesList.map((game, index) => (
					<Game
						key={index}
						img={game.img}
						title={game.title}
						href={game.href}
					/>
				))}
			</div>
		</div>
	)
}

export default GamesList
