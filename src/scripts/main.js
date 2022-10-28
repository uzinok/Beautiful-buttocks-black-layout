// спойлеры, готовый плагин
class Details {
	constructor(details, transitionDuration) {
		this._details = details;
		this._summary = details.querySelector('.details__summary');
		this._content = details.querySelector('.details__content');

		this.transitionDuration = transitionDuration;

		this.initD();
	}

	initD() {
		if (!this._details.open)
			this.closeD();
		else
			this.openD();

		window.addEventListener('resize', () => {
			if (this._details.open)
				this._details.style.height = this._summary.offsetHeight + this._content.offsetHeight + 'px';
		});

		this._summary.addEventListener('click', (event) => {
			event.preventDefault();

			if (this._details.open)
				this.closeD();
			else
				this.openD();
		});
	}

	closeD() {
		this._details.style.height = this._summary.offsetHeight + 'px';
		this._details.classList.remove('details--open');
		this._details.classList.add('details--close');

		setTimeout(() => {
			this._details.open = false;
		}, this.transitionDuration);
	}

	openD() {
		this._details.open = true;
		this._details.classList.add('details--open');
		this._details.classList.remove('details--close');
		this._details.style.height = this._summary.offsetHeight + this._content.offsetHeight + 'px';
	}

}

if (document.querySelector('.details')) {
	document.querySelectorAll('.details').forEach(elem => {
		let details = new Details(elem, 300);
	})
}

// скролл сертификатов

const about = document.querySelector('.about');
const scrollList = document.querySelector('.about__list');

function elementInViewport(el) {
	var top = el.offsetTop;
	var height = el.offsetHeight;
	while (el.offsetParent) {
		el = el.offsetParent;
		top += el.offsetTop;
	}
	return (
		top < (window.pageYOffset + window.innerHeight) &&
		(top + height) > window.pageYOffset
	);
}

if (elementInViewport(scrollList))
	scrollList.style.transform = 'translateX(-' + (scrollList.getBoundingClientRect().top / window.innerHeight * 100) + '%)';

document.addEventListener('scroll', () => {
	if (elementInViewport(scrollList))
		scrollList.style.transform = 'translateX(-' + (scrollList.getBoundingClientRect().top / window.innerHeight * 100) + '%)';
});

// таймер

document.addEventListener('DOMContentLoaded', function() {
	const arrTimer = document.querySelectorAll('.timer');
	for (let i = 0; i < arrTimer.length; i++) {
		timer(arrTimer[i]);
	}
});

// сегодняшняя дата
const date = new Date();
const arrMount = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

function timer(timer) {

	// конечная дата
	const deadline = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 19, 0, 0, 0);
	// id таймера
	let timerId = null;

	// добавление ведущего нуля
	function leadingZero(number) {
		return number = number < 10 ? '0' + number : number;
	}
	// вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
	function countdownTimer() {

		const diff = deadline.getTime() - new Date().getTime();
		if (diff <= 0) {
			clearInterval(timerId);
		}

		// console.log(new Date());

		let hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) : 0;

		const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
		const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

		$hours.textContent = leadingZero(hours);
		$minutes.textContent = leadingZero(minutes);
		$seconds.textContent = leadingZero(seconds);

		// добавить условия для вывода
		if (date.getDate() == deadline.getDate() && date.getMonth() == deadline.getMonth()) {
			$timerEndDate.textContent = 'сегодня в ' + leadingZero(deadline.getHours()) + ':' + leadingZero(deadline.getMinutes());
		} else if (deadline.getDate() - date.getDate() == 1 && date.getMonth() == deadline.getMonth()) {
			$timerEndDate.textContent = 'завтра в ' + leadingZero(deadline.getHours()) + ':' + leadingZero(deadline.getMinutes());
		} else {
			$timerEndDate.textContent = deadline.getDate() + ' ' + arrMount[deadline.getMonth()] + ' в ' + leadingZero(deadline.getHours()) + ':' + leadingZero(deadline.getMinutes());
		}

	}
	// получаем элементы, содержащие компоненты даты
	const $hours = timer.querySelector('.timer__hours');
	const $minutes = timer.querySelector('.timer__minutes');
	const $seconds = timer.querySelector('.timer__seconds');
	const $timerEndDate = timer.querySelector('.timer__end-date');
	// вызываем функцию countdownTimer
	countdownTimer();
	// вызываем функцию countdownTimer каждую секунду
	timerId = setInterval(countdownTimer, 1000);

	// дата на ленде
	const today = document.querySelectorAll('.today');

	for (let i = 0; i < today.length; i++) {
		today[i].textContent = deadline.getDate() + ' ' + arrMount[deadline.getMonth()] + ' в ' + leadingZero(deadline.getHours()) + ':' + leadingZero(deadline.getMinutes());
	}
}
