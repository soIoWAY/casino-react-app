import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LoginPage from '../pages/login'
import RegisterPage from '../pages/register'
import Main from './Main'

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
				</Routes>
			</Router>
		</>
	)
}

export default App
