import Game from './Game'
import cherrySlot from '../../assets/cherry.png'
import classicSlot from '../../assets/classic.png'
import diamondSlot from '../../assets/diamond-slot.png'

const gamesList = [
	{
		title: 'diamonds',
		img: diamondSlot,
	},
	{
		title: 'cherrys',
		img: cherrySlot,
	},
	{
		title: 'classic',
		img: classicSlot,
	},
]

const GamesList = () => {
	return (
		<div className='mt-5'>
			<div className='flex flex-wrap md:justify-start justify-center gap-6 md:gap-4'>
				{gamesList.map((game, index) => (
					<Game key={index} img={game.img} title={game.title} />
				))}
			</div>
		</div>
	)
}

export default GamesList
