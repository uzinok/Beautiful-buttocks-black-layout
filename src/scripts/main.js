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
			if (!this._details.open)
				this.closeD();
			else
				this.openD();
		})

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

		setTimeout(() => {
			this._details.open = false;
		}, this.transitionDuration);
	}

	openD() {
		this._details.open = true;
		this._details.classList.add('details--open');
		this._details.style.height = this._summary.offsetHeight + this._content.offsetHeight + 'px';
	}

}

if (document.querySelector('.details')) {
	document.querySelectorAll('.details').forEach(elem => {
		let details = new Details(elem, 300);
	})
}
