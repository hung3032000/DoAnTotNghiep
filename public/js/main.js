$(document).ready(function () {

	// login
	const inputs = document.querySelectorAll(".form-field");
	function addcl() {
		let parent = this.parentNode.parentNode;
		parent.classList.add("focus");
	}
	function remcl() {
		let parent = this.parentNode.parentNode;
		if (this.value === "") {
			parent.classList.remove("focus");
		}
	}
	inputs.forEach((input) => {
		input.addEventListener("focus", addcl);
		input.addEventListener("blur", remcl);
	});




	// scroll
	var position = $(window).scrollTop(); 
	$(window).scroll(function () {
		var scroll = $(window).scrollTop();
		if (scroll > position) {
			$("html").addClass("sticky-header-hidden");
		} else {
			$("html").removeClass("sticky-header-hidden");
		}
		position = scroll;
	});


	var swiper = new Swiper('.swiper-container', {
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},

	});
	var swiper2 = new Swiper('.value', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true

		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

	});


});