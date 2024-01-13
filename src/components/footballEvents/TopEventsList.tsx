import arsenal from '../../assets/football/arsenal.png'
import barcelona from '../../assets/football/barcelona.png'
import chelsea from '../../assets/football/chelsea.png'
import fullham from '../../assets/football/fullham.png'
import juventus from '../../assets/football/juventus.png'
import liverpool from '../../assets/football/liverpool.png'
import manu from '../../assets/football/manu.png'
import realm from '../../assets/football/realmadrid.png'
import TopEvent from './TopEvent'

import { useEffect, useState } from 'react'
import TopEventsHeader from './TopEventsHeader'

const events = [
	{
		league: 'Premier League',
		team1Name: 'Arsenal',
		team1: arsenal,
		team2Name: 'Chelsea',
		team2: chelsea,
		coeff1: '1.72',
		coeff2: '3.21',
		x: '2.32',
		stadium: 'Emirates',
	},
	{
		league: 'La League',
		team1Name: 'Barcelona',
		team1: barcelona,
		team2Name: 'Real Madrid',
		team2: realm,
		coeff1: '2.46',
		coeff2: '1.91',
		x: '3.31',
		stadium: 'Camp Nou',
	},
	{
		league: 'Premier League',
		team1Name: 'Liverpool',
		team1: liverpool,
		team2Name: 'Fullham',
		team2: fullham,
		coeff1: '1.42',
		coeff2: '4.22',
		x: '4.71',
		stadium: 'Anfield',
	},
	{
		league: 'Champions League',
		team1Name: 'Juventus',
		team1: juventus,
		team2Name: 'Manchester United',
		team2: manu,
		coeff1: '1.71',
		coeff2: '3.33',
		x: '2.64',
		stadium: 'Juventus',
	},
]

const TopEventsList = () => {
	const currentDate = new Date()
	const day = currentDate.getDate().toString()
	const month = (currentDate.getMonth() + 1).toString()
	const formattedMonth = month.length === 1 ? '0' + month : month
	const todayDate = day + '.' + formattedMonth

	const [startIndex, setStartIndex] = useState(0)
	const [eventsPerPage, setEventsPerPage] = useState(3)

	useEffect(() => {
		const resizeHandler = () => {
			if (window.innerWidth >= 1024) {
				setEventsPerPage(3)
			} else if (window.innerWidth >= 768) {
				setEventsPerPage(2)
			} else {
				setEventsPerPage(1)
			}
		}

		window.addEventListener('resize', resizeHandler)

		resizeHandler()

		return () => {
			window.removeEventListener('resize', resizeHandler)
		}
	}, [])

	const visibleEvents = events.slice(startIndex, startIndex + eventsPerPage)

	const nextHandler = () => {
		const newStartIndex = startIndex + eventsPerPage
		if (newStartIndex < events.length) {
			setStartIndex(newStartIndex)
		} else {
			setStartIndex(0)
		}
	}
	const prevHandler = () => {
		setStartIndex(Math.max(startIndex - eventsPerPage, 0))
	}
	return (
		<div>
			<TopEventsHeader onNext={nextHandler} onPrev={prevHandler} />
			<div className='flex justify-center md:justify-between'>
				{visibleEvents.map((event, index) => (
					<TopEvent
						league={event.league}
						team1Name={event.team1Name}
						team1={event.team1}
						team2Name={event.team2Name}
						team2={event.team2}
						coeff1={event.coeff1}
						coeff2={event.coeff2}
						x={event.x}
						stadium={event.stadium}
						date={todayDate}
						key={index}
					/>
				))}
			</div>
		</div>
	)
}

export default TopEventsList
