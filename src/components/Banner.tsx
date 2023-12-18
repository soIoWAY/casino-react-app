import banner from '../assets/banner1.jpg'
import mobBanner from '../assets/mob-banner.jpg'
const Banner = () => {
	return (
		<div className='p-4 md:p-10'>
			<div className='banner flex justify-center'>
				<img
					src={banner}
					alt='banner'
					className='md:w-90% h-[380px] object-cover hidden md:block'
				/>
				<img
					src={mobBanner}
					alt='mob-banner'
					className='object-cover md:hidden w-full'
				/>
			</div>
		</div>
	)
}

export default Banner
