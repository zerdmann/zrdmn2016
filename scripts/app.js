$(document).ready( e => {
	const $contact = $('.contact_box');
	const $cPlaceholder = $('.contact_placeholder')
	let cPos = $cPlaceholder.offset();
	$(window).resize (e => {
		if(!$contact.hasClass('fixed'))
			cPos = $cPlaceholder.offset()
	})
	$(window).scroll( e => {
		// console.log(cPos, $(window).scrollTop() )
		if( (cPos.top - $(window).scrollTop()) < 0 )
			 fix($contact)
		else
			unfix($contact)
	})

	if(window.matchMedia("(min-width: 1080px) and (orientation:landscape)").matches)
	{
		$('.work--thumb').each( (idx, thumb) => {
			let $t = $(thumb)
			if ($t.data('gif'))
				$t.css('background-image',"url("+$t.data('gif')+")")
		})
	}
})

let fix = ($t) => {
	if(!$t.hasClass('fixed'))
		{ $t.addClass('fixed')
		$t.children('a').text('Contact'); }
}


let unfix = ($t) => {
	if($t.hasClass('fixed'))
		{ $t.removeClass('fixed')
		$t.children('a').text('Contact Him'); }
}