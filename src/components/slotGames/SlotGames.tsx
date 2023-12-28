import GamesList from './GamesList'
import SlotGamesHeader from './SlotGamesHeader'

const SlotGames = () => {
	return (
		<div className='px-6 md:px-12 mt-6' id='slots'>
			<SlotGamesHeader />
			<GamesList />
		</div>
	)
}

export default SlotGames
