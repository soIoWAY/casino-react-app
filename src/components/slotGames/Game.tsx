import { Link } from 'react-router-dom'

interface IGameProps {
	title: string
	img: string
	href: string
}

const Game = ({ title, img, href }: IGameProps) => {
	return (
		<div className='border-2 rounded-md w-3/4 md:w-1/5 lg:w-1/6'>
			<Link to={href}>
				<img src={img} alt={title} className='object-contain h-full w-full' />
			</Link>
		</div>
	)
}

export default Game
