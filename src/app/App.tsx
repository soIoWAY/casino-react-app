import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Diamonds from '../pages/slots/diamonds'
import LoginPage from '../pages/login'
import Main from './Main'
import RegisterPage from '../pages/register'

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/slots/diamonds' element={<Diamonds />} />
				</Routes>
			</Router>
		</>
	)
}

export default App
