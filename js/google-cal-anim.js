// https://codepen.io/WhiteWolfWizard/pen/haEGA

function animateCalIcon () {
		$('#google_calendar').animate({
			top: '-2em',
			bottom: '2em'
		}, 500).animate({
			top: '2em',
			bottom: '-2em'
		}, 500).animate({
			top: '-1em',
			bottom: '1em'
		}, 500).animate({
			top: '1em',
			bottom: '-1em'
		}, 500).animate({
			top: '',
			bottom: ''
		}, 500);
}

// $(document).ready();