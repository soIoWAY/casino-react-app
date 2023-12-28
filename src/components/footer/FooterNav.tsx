const FooterNav = () => {
	return (
		<div className='flex flex-wrap md:justify-between'>
			<div className='p-2 mt-5'>
				<h3 className='uppercase mb-4 font-bold text-lg tracking-wide'>
					Про нас
				</h3>
				<ul>
					<li>Про нас</li>
					<li>Договір оферти</li>
				</ul>
			</div>
			<div className='p-2 mt-5'>
				<h3 className='uppercase mb-4 font-bold text-lg tracking-wide'>
					Розділи
				</h3>
				<ul>
					<li>Ставки на спорт</li>
					<li>Ставки на футбол</li>
					<li>Казино онлайн</li>
					<li>Акції</li>
				</ul>
			</div>
			<div className='p-2 mt-5'>
				<h3 className='uppercase mb-4 font-bold text-lg tracking-wide'>
					допомога
				</h3>
				<ul>
					<li>Калькулятор систем</li>
					<li>Поповнення/Виведення рахунку</li>
				</ul>
			</div>
			<div className='p-2 mt-5'>
				<h3 className='uppercase mb-4 font-bold text-lg tracking-wide'>
					Правила
				</h3>
				<ul>
					<li>Правила організатора</li>
					<li>Ліцензія</li>
					<li>Відповідальна гра</li>
					<li>Програма лояльності</li>
				</ul>
			</div>
			<div className='p-2 mt-5'>
				<h3 className='uppercase mb-4 font-bold text-lg tracking-wide'>
					Контакти
				</h3>
				<ul>
					<li>support@7kings.ua</li>
					<li>Вакансії</li>
				</ul>
			</div>
		</div>
	)
}

export default FooterNav
