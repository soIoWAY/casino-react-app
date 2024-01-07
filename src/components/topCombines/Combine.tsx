interface ICombineProps {
	title: string
	combine: string
	x: string
}

const Combine = ({ title, combine, x }: ICombineProps) => {
	return (
		<div className='p-2 border-b border-red-600'>
			<span className='text-lg'>
				<span>{combine}</span> - <span>x{x}</span>{' '}
				<span className='font-bold'>|</span> <span className=''>{title}</span>
			</span>
		</div>
	)
}

export default Combine
