const cmnStyles = 'p-2 mt-5 flex justify-center'
const cmnStylesText = 'text-center md:text-left'
const cmnStylesH3 = 'uppercase mb-4 font-bold text-lg tracking-wide'

const FooterNav = () => {
	return (
		// flex flex-wrap md:justify-between
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-center'>
			<div className={cmnStyles}>
				<div className={cmnStylesText}>
					<h3 className={cmnStylesH3}>Про нас</h3>
					<ul>
						<li>Про нас</li>
						<li>Договір оферти</li>
					</ul>
				</div>
			</div>
			<div className={cmnStyles}>
				<div className={cmnStylesText}>
					<h3 className={cmnStylesH3}>Розділи</h3>
					<ul>
						<li>Ставки на спорт</li>
						<li>Ставки на футбол</li>
						<li>Казино онлайн</li>
						<li>Акції</li>
					</ul>
				</div>
			</div>
			<div className={cmnStyles}>
				<div className={cmnStylesText}>
					<h3 className={cmnStylesH3}>допомога</h3>
					<ul>
						<li>Калькулятор систем</li>
						<li>Поповнення/Виведення рахунку</li>
					</ul>
				</div>
			</div>
			<div className={cmnStyles}>
				<div className={cmnStylesText}>
					<h3 className={cmnStylesH3}>Правила</h3>
					<ul>
						<li>Правила організатора</li>
						<li>Ліцензія</li>
						<li>Відповідальна гра</li>
						<li>Програма лояльності</li>
					</ul>
				</div>
			</div>
			<div className={cmnStyles}>
				<div className={cmnStylesText}>
					<h3 className={cmnStylesH3}>Контакти</h3>
					<ul>
						<li>support@7kings.ua</li>
						<li>Вакансії</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default FooterNav
