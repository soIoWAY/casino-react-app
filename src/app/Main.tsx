import Banner from '../components/Banner'
import TopEvents from '../components/footballEvents/TopEvents.tsx'
import Footer from '../components/footer/Footer.tsx'
import Header from '../components/header/Header.tsx'
import SlotGames from '../components/slotGames/SlotGames'

const Main = () => {
	return (
		<div>
			<Header />
			<Banner />
			<TopEvents />
			<SlotGames />
			<Footer />
		</div>
	)
}

export default Main
