import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { initializeFirebase } from '../../firebase.ts'
const LoginPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [error, setError] = useState('')

	const auth = getAuth(initializeFirebase())

	const navigate = useNavigate()

	const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const userCredentials = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)
			// dispatch(setUser({ email: userCredentials.user.email }))
			console.log(userCredentials.user)
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message)
			}
		}

		setEmail('')
		setPassword('')

		navigate('/')
	}
	return (
		<div className='min-h-screen flex justify-center items-center'>
			<div className='bg-[#1C1632] py-11 px-12 rounded-md'>
				<form
					onSubmit={submitFormHandler}
					className='flex flex-col items-center gap-5'
				>
					<h2 className='text-2xl'>Login</h2>
					<input
						type='text'
						className='border-2 bg-transparent p-1 rounded-md text-center outline-none'
						placeholder='email'
						name='email'
						value={email}
						required
						onChange={e => setEmail(e.target.value)}
					/>
					<input
						type='password'
						className='border-2 bg-transparent p-1 rounded-md text-center outline-none'
						placeholder='password'
						required
						name='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<div className='flex flex-col items-center'>
						<button className='bg-red-600 px-10 py-2 rounded-md mt-3'>
							Login
						</button>
						<p className='mt-1'>or</p>
						<Link to='/register'>
							<span className='text-lg border-b'>register</span>
						</Link>
					</div>
					{error && <p>{error}</p>}
				</form>
			</div>
		</div>
	)
}

export default LoginPage
