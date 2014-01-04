$(document).ready(function() {
	$('button.form-control').click(function() {
	
		iconBox = $('i',$(this).prev('span'));
		iconBoxes = $('i',$(this).parent());
		checkBoxes = $('input[type="checkbox"]',$(this).prev('span'));
		if (checkBoxes.length) {
			if (iconBox.hasClass('fa-check-square-o'))
				iconBox.removeClass('fa-check-square-o').addClass('fa-square-o'); 
			else
				iconBox.addClass('fa-check-square-o').removeClass('fa-square-o');
			checkBoxes.click();
		}
		radioBoxes = $('input[type="radio"]',$(this).prev('span'));
		if (radioBoxes.length) {
				//alert('hi');
				//alert(iconBox.length);
			if (iconBox.hasClass('fa-circle-o')) {
				iconBoxes.removeClass('fa-dot-circle-o').addClass('fa-circle-o');
				iconBox.removeClass('fa-circle-o').addClass('fa-dot-circle-o');
			} else {
				iconBoxes.removeClass('fa-dot-circle-o').addClass('fa-circle-o');
			}
			radioBoxes.click();
		}
	});
	$('form i').click(function() {
		$(this).parent().next().click();
	});
	$('.input-group .dropdown-menu li a').click(function(e) {
		e.preventDefault();
		$(this).parent('li').parent('ul').parent('div').prev().prev().val($(this).attr('href'));
		$(this).parent('li').parent('ul').parent('div').prev().html($(this).html());
	});
});	