import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { useSelector } from 'react-redux'
import LoginPage from '../pages/login'
import RegisterPage from '../pages/register'
import Diamonds from '../pages/slots/diamonds'
import { RootState } from '../store/store'
import Main from './Main'

function App() {
	const { uid } = useSelector((state: RootState) => state.user)
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route
						path='/slots/diamonds'
						element={uid ? <Diamonds /> : <LoginPage />}
					/>
				</Routes>
			</Router>
		</>
	)
}

export default App
