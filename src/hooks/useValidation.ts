import { useState } from 'react'

const useValidation = () => {
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const validate = () => {
		if (password != confirmPassword) {
			alert('Паролі не збігаються')
			return false
		}

		if (password.length < 8) {
			alert('Мінімальна довжина пароля - 8 символів')
			return false
		}

		return true
	}

	return {
		password,
		confirmPassword,
		setPassword,
		setConfirmPassword,
		validate,
	}
}

export default useValidation
