import Combine from './Combine'

interface ITopCombineProps {
	combines: {
		title: string
		combine: string
		x: string
	}[]
}

const TopCombine = ({ combines }: ITopCombineProps) => {
	return (
		<div className='flex flex-col items-center mb-3'>
			<h1 className='text-3xl font-semibold'>Top Combines</h1>
			<div className='mt-5 border-2 border-red-600 rounded-md p-3'>
				{combines.map((combine, index) => (
					<Combine
						combine={combine.combine}
						title={combine.title}
						x={combine.x}
						key={index}
					/>
				))}
			</div>
		</div>
	)
}

export default TopCombine
