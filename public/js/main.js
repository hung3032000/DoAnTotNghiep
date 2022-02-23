$(document).ready(function () {

	// click
	$(".search-link-container").click(function () {
		if ($("#search").hasClass("open")) {
			$("#search").removeClass("open");
		} else {
			$("#search").addClass("open");
		}
	});


	$(".close-search").click(function () {
		$("#search").removeClass("open");
	});


	$("#minicartnotempty").click(function (e) {
		$(".minicart").addClass("hover");
		$("html").addClass("minicart-active");
		$("#minicart-container").addClass("minicart-active");
		e.stopPropagation();
	});

	$(".minicart-close").click(function () {
		$(".minicart").removeClass("hover");
		$("html").removeClass("minicart-active");
		$("#minicart-container").removeClass("minicart-active");
	});

	$("#js-overlay").click(function () {
		$("html").removeClass("minicart-active");
		$("#minicart-container").removeClass("minicart-active");

	});

	// $("#variation-Size-header").click(function () {
	// 	if ($(".tab-pane").hasClass("active") || $(".tab-header").hasClass("active")) {
	// 		$(".tab-pane").removeClass("active");
	// 		$(".tab-header").removeClass("active");
	// 	}
	// 	else {
	// 		$(".tab-pane").addClass("active");
	// 		$(".tab-header").addClass("active");
	// 	}
	// });

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


// Đối tượng `Validator`
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];
        
        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }
        
        if (errorMessage) {
            errorElement.innerText = errorMessage;
        } else {
            errorElement.innerText = '';
           
        }

        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
    
        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function (rule) {

            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function (inputElement) {
               // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                } 
            });
        });
    }

}



// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined :  message || 'Vui lòng nhập trường này'
        }
    };
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined :  message || 'Trường này phải là email';
        }
    };
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined :  message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}
document.addEventListener('DOMContentLoaded', function () {
	// Mong muốn của chúng ta
	Validator({
		form: '#form-register',
		formGroupSelector: '.form-group',
		errorSelector: '.error',
		rules: [
		  Validator.isRequired('#fullname', 'Vui lòng nhập tên đầy đủ của bạn'),
		  Validator.isEmail('#email'),
		  Validator.minLength('#password', 6),
		  Validator.isRequired('#password_confirmation'),
		  Validator.isConfirmed('#password_confirmation', function () {
			return document.querySelector('#form-1 #password').value;
		  }, 'Mật khẩu nhập lại không chính xác')
		],
		onSubmit: function (data) {
		  // Call API
		  console.log(data);
		}
	  });
	  Validator({
		form: '#form-login',
		formGroupSelector: '.form-group',
		errorSelector: '.error',
		rules: [
            Validator.isEmail('#email'),
		  Validator.minLength('#password', 6),
		],
	  });
      Validator({
		form: '#form-login-header',
		formGroupSelector: '.form-group',
		errorSelector: '.error',
		rules: [
            Validator.isEmail('#email_header'),
            Validator.minLength('#password_header', 6),
		],
	  });
  });