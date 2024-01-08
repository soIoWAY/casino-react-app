const useConvertEmail = (email: string | null) => {
	if (email) {
		const index = email.indexOf('@')

		if (index !== -1) {
			return email.substring(0, index)
		} else {
			console.log('Індекс не знайдено')
		}
	}
	return null
}

export default useConvertEmail
