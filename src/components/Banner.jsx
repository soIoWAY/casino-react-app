const Banner = () => {
	return (
		<div className='p-10'>
			<div className='banner flex justify-center'>
				<img
					src='../../public/banner1.jpg'
					alt='banner'
					className='md:w-90% h-[380px] object-cover hidden md:block'
				/>
				<img
					src='../../public/mob-banner.jpg'
					alt='mob-banner'
					className='object-cover md:hidden w-full'
				/>
			</div>
		</div>
	)
}

export default Banner
