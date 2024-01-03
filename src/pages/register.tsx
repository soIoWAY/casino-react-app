import { Link, useNavigate } from 'react-router-dom'

import { useState } from 'react'
import useValidation from '../hooks/useValidation'
import { registerUser } from '../utils/authUtils'

const RegisterPage = () => {
	const [email, setEmail] = useState('')

	const {
		password,
		confirmPassword,
		setPassword,
		setConfirmPassword,
		validate,
	} = useValidation()

	const navigate = useNavigate()

	const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isValid = validate()
		if (isValid) {
			try {
				registerUser(email, password)
			} catch (error) {
				console.log(error)
			}
			navigate('/login')
		}
		setEmail('')
		setPassword('')
		setConfirmPassword('')
	}

	return (
		<div className='min-h-screen flex justify-center items-center'>
			<div className='bg-[#1C1632] py-11 px-12 rounded-md'>
				<form
					onSubmit={submitFormHandler}
					className='flex flex-col items-center gap-5'
				>
					<h2 className='text-2xl'>Register</h2>
					<input
						type='text'
						className='border-2 bg-transparent p-1 rounded-md text-center outline-none'
						placeholder='email'
						required
						name='email'
						value={email}
						maxLength={24}
						onChange={e => setEmail(e.target.value)}
					/>
					<input
						type='password'
						className='border-2 bg-transparent p-1 rounded-md text-center outline-none'
						placeholder='password'
						name='password'
						value={password}
						required
						onChange={e => setPassword(e.target.value)}
					/>
					<input
						type='password'
						className='border-2 bg-transparent p-1 rounded-md text-center outline-none'
						placeholder='confirm password'
						name='confirmPassword'
						value={confirmPassword}
						required
						onChange={e => setConfirmPassword(e.target.value)}
					/>
					<div className='flex flex-col items-center'>
						<button className='bg-red-600 px-10 py-2 rounded-md mt-3'>
							Register
						</button>
						<p className='mt-1'>or</p>
						<Link to='/login'>
							<span className='text-lg border-b'>login</span>
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default RegisterPage
