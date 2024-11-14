$(document).ready(function(){
	$('.js-change-search').on('click', function() {
		var $this = $(this);
		var $form = $this.closest('form');
		var $icon = $this.find('.svg-icon').clone();
		var action = $this.attr('data-action');
		var json_url = $this.attr('data-json-url');

		$('.js-change-search').removeClass('active')
		$this.addClass('active');

		$form.attr('action', action);
		$form.find('[data-icon-holder]').html($icon);
	});

	//mobile menu functions
	$('.js-mobile-menu').on('click', function() {
		var $this = $(this);
		$('body').toggleClass('show-menu');
		$this.toggleClass('active');
	});
	$('.overcover-menu, .js-close-menu').on('click', function() {
		$('body').removeClass('show-menu');
		$('.js-menu').removeClass('active');
	});

	$('.item-drop').on('click', function() {
		$(this).next().toggleClass('shown');
	});

	//show search in header on small resolution
	var $buttonSearch = $('.js-mobile-search');
	var $blockSearch = $('.search-block');
	var $activeBlocks = $('.search-block, .js-mobile-search');
	
	$buttonSearch.on('click', function() {
		var $this = $(this);
		$this.toggleClass('active');
		$blockSearch.toggleClass('shown');
	});
	$(document).on('click', function(event) {
		if(!$(event.target).closest($activeBlocks).length) {
			if($blockSearch.is(":visible")) {
				$blockSearch.removeClass('shown');
				$buttonSearch.removeClass('active');
			}
		}
	});

	//comments form
	$('.js-textarea').on('click', function() {
		var $this = $(this);
		var $parent = $this.parent();
		$parent.addClass('active');
		$parent.next().show();
	});
	$('.js-cancel').on('click', function() {
		var $this = $(this);
		var $wrap_textarea = $('.wrap-textarea');
		var $textarea = $wrap_textarea.find('textarea');
		$this.closest('.buttons').hide();
		$wrap_textarea.removeClass('active');
		$wrap_textarea.children().not($textarea).hide();
		$textarea.val('');
	});

	//scroll to block
	$(".js-scroll-to").on('click', function() {
		var id = $(this).attr('data-id-block');
		$('html, body').animate({
			scrollTop: $('#' + id).offset().top
		}, 700);
	});

	//autoupload video
	$('[name="content"]').on('change', function() {
		$(this).closest('form').submit();
	});
	//autoupload album
	// $('[name="content[]"]').on('change', function() {
	// 	$(this).closest('form').submit();
	// });

	$('.js_list').on('click', function() {
		$('.js_list').removeClass('active');
		$(this).addClass('active');
		$('.aside-thumbs').toggleClass('list');
	});
	$('.go-up').on("click", function() {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});

	//rate comments
	$('.list-comments').on('click', '.js-vote-comment', function(){
		var $this = $(this);
		var $parent = $this.closest('.rating');
		$parent.find('.js-vote-comment').addClass('not-active');
		var get_id = $this.attr('data-id');
		var get_vote = $this.attr('data-vote');
		var get_url = "?mode=async&format=json&action=vote_comment&comment_id=" + get_id + "&vote=" + get_vote;
		$.ajax({
			url: get_url,
			dataType: "text",
			success: function(msg) {
				var found_word = 'failure';
				if(msg.indexOf(found_word) != -1) {
					var $failure = $parent.find('.failure');
					$failure.fadeIn(300);
					setTimeout(function() {
						$failure.fadeOut(300);
					}, 2000);
				}
				else {
					var points = parseInt($parent.find('.points').text());
					$parent.find('.points').text(points + parseInt(get_vote));
				}
			}
		});
		return false;
	});

	//show more comments
	$.fn.hasAttr = function(name) {  
		return this.attr(name) !== undefined;
	};
	$('.js-show-comments').on('click', function(){
		var $this = $(this);
		var count = 2;
		if($this.hasAttr('data-count')) {
			count = $this.attr('data-count');
		}
		var block_id = $this.attr('data-id');
		var total = $this.attr('data-total');
		var params = {mode:'async', action:'get_block', block_id:block_id, from:count};
		var str = $.param(params);
		var get_url = '?' + str;
		$.ajax({
			url:get_url,
			success:function(data){
				if(data){
					var $result = $(data).find('.list-comments').html();
					$('.list-comments').append($result);
					count++;
					$this.attr('data-count', count);
					if(count > total) {
						$this.hide();
					}
				}
			}
		});
		return false;
	});

	$('.js-show-images').on('click', function(){
		var $this = $(this);
		var count = 2;
		if($this.hasAttr('data-count')) {
			count = $this.attr('data-count');
		}
		var block_id = $this.attr('data-id');
		var total = $this.attr('data-total');
		var params = {mode:'async', action:'get_block', block_id:block_id, from3:count};
		var str = $.param(params);
		var get_url = '?' + str;
		$.ajax({
			url:get_url,
			success:function(data){
				if(data){
					var $result = $(data).find('img');
					$('.list-images').append($result);
					count++;
					$this.attr('data-count', count);
					if(count > total) {
						$this.hide();
					}
				}
			}
		});
		return false;
	});



	$('#fav_link').on('click', function() {
		var $this = $(this);
		var $parent = $this.closest('.block-info');
		$this.addClass('not-active');
		setTimeout(function() {
			$parent.find('.result-fav').fadeOut();
		}, 2000);
	});

	$('.js-vote').on('click', function(){
		var $this = $(this);

		var $parent = $this.closest('.block-info');
		$this.addClass('not-active');

		var get_target = $this.attr('data-target');
		var get_id = $this.attr('data-id');
		var get_flag = $this.attr('data-flag');
		var get_url = "?mode=async&action=flag&" + get_target + "_id=" + get_id + "&flag_id=" + get_flag;
		$.ajax({
			url: get_url,
			dataType: "text",
			success: function(msg) {
				var found_word = 'failure';
				if(msg.indexOf(found_word) != -1) {
					var result = $parent.find('.failure.result-vote');
				} else {
					var result = $parent.find('.success.result-vote');
				}
				result.show();
				setTimeout(function() {
					result.fadeOut();
				}, 2000);
			}
		});
		return false;
	});

	//report
	$('.js-show-report').on('click', function() {
		$(this).toggleClass('active');
		$('.block-report').slideToggle(300);
	});
	$('.js-report-form').on('submit', function(e){
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		var $this = $(this);
		var $textarea = $this.find('textarea');
		if (!$textarea.val()) {
			$('#report_error').show();
			return false;
		}
		var action = $this.attr('action');
		var params = $this.serializeArray();
		$this.next().show();
		$this.remove();
		$.get(action, params, function(data) {
			console.log('done');
		});
	});

	//adding categories on page upload
	$('.js-add-categories').on('click', function() {
		$('.modal').modal('show');
		return false;
	});
	$('body').on('click', '.select-categories .holder .btn', function(){
		var $this = $(this);
		var thisValue = $this.data('value');
		$('input[value=' + thisValue + ']').attr('checked', false);
		$this.remove();
		return false;
	});
	function check_cat(){
		$(".select-categories .holder .btn").remove();
		$(".list-categories input:checked").each(function(){
			var category_name = $(this).parent().find('.text').text();
			var category_id = $(this).attr('value');
			$(".select-categories .holder").append('<div class="btn btn-default" data-value=' + category_id + '>' + '<span class="text-middle">'+ category_name + '</span>' + '</div></div>');
		});
	}
	$('.js-confirm-categories').on('click', function(){
		check_cat();
		$('.modal').modal('hide');
	});
	$(".list-categories input").on('change', function() {
		maxCategories();
	});
	function maxCategories() {
		var max_categories = 8;
		var counter = 0;
		$(".list-categories input").each(function() {
			if ($(this).is(':checked')) {
				counter++;
			}
		});
		if (counter == max_categories) {
			$(".list-categories input").each(function() {
				if (!$(this).is(':checked')) {
					$(this).attr('disabled', true)
				} 
			});
		} else {
			$(".list-categories input").attr('disabled', false)
		}
	}
	maxCategories();

	$('body').on('click','.js-show-more', function(){
		var $this = $(this);
		$this.attr('disabled', true); //very important part. Avoids multiple ajax requests
		
		if ($this.attr('data-infinite') !== undefined) {
			if ($this.attr('allow-scroll') === undefined) { //executing the function once
				var $block_holder = $this.prev();
				$this.attr('allow-scroll', true);
				$(window).scroll(function() {
					if($(window).scrollTop() >= $block_holder.position().top + $block_holder.outerHeight(true) - 2000) {
						$this.trigger('click');
					}
				});
			}
		}
		var num_page_load = $this.attr('data-count-page'),
			from = $this.attr('data-from') ? $this.attr('data-from') : 'from',
			total = $this.attr('data-total'),
			itemClass = $this.attr('data-item-class'),
			sort_by = $this.attr('data-sort'),
			block_result = $this.attr('data-block-result'),
			addParams = $this.attr('data-addparams');
		var params = {
			mode: 'async', 
			action: 'get_block', 
			block_id: $this.attr('data-id')
		};
		
		params[from] = num_page_load;
		if (sort_by) {
			params['sort_by'] = sort_by;
		}
		var str = $.param(params);

		if (addParams) {
			str += addParams;
		}
		var get_url = '?' + str;
		$.ajax({
			url:get_url,
			success:function(data){
				if (data){
					var $result = $(data).find('.'+ itemClass);
					if (block_result) {
						$('.' + block_result).append($result);
					} else {
						$this.prev().append($result);
					}
					$this.attr('data-count-page', ++num_page_load);
					if (num_page_load > total) {
						$this.remove();
					}
					$this.attr('disabled', false);

					if ($this.attr('data-infinite') !== undefined) {
						$this.hide();
					}
				}
			}
		});
		return false;
	});

	$('body').on('click','.js-sorting [data-sort]', function(){
		var $this = $(this);
		var $ajax_block = $this.closest('.ajax-block');
		var $parent = $this.closest('.js-sorting');
		var this_url = $parent.attr('data-url');
		var addParams = $parent.attr('data-addparams');
		var params = {
			mode: 'async', 
			action: 'get_block', 
			block_id: $parent.attr('data-id'),
			sort_by: $this.attr('data-sort')
		};
		var str = $.param(params);
		if (addParams) {
			str += addParams;
		}
		var get_url = '?' + str;

		var hideAjaxLoader = showAjaxLoader($ajax_block);

		$.ajax({
			url: get_url,
			success: function(data){
				// setTimeout(function() { //delete later
					if (data){
						hideAjaxLoader();
						var $result = $(data).filter('.ajax-block').html() || $(data).find('.ajax-block').html();
						$ajax_block.html($result);

						window.history.pushState(null, '', this_url + '?sort_by=' + $this.attr('data-sort'));
					}
				// }, 5000)
			}
		});
		return false;
	});

	function showAjaxLoader(selector) {
		if (!selector.hasClass('active')) {
			var loader = setTimeout(function() {
				selector.addClass('active');
				var $loader = $('<div class="ajax-loader"></div>');
				if (selector.height() < 400) {
					$loader.addClass('aligned');
				}
				selector.append($loader);
			}, 300);
		}

		return function() {
			clearTimeout(loader);
			selector.removeClass('active');
			selector.find('.ajax-loader').remove();
		}
	}

	//modals and appearing blocks
	var tplPopup = '<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="loader">Loading...</div></div></div></div>'
	function ajaxRequest(block_id) {
		$('.loader').fadeIn(1000);
		var get_url = "?mode=async&function=get_block&global=true&block_id=" + block_id;
		$.ajax({
			url: get_url,
			success: function(data) {
				if(data){
					var content = $(data);
					$('.loader').fadeOut(1000);
					$('.modal-content').html(content);
				}
			}
		});
	}
	$('body').on('click', '.js-popup', function() {
		var $this = $(this);
		var block = $this.attr('data-block') || 'logon_login&error=only_for_members';
		if (!$this.data('replace')) {
			$('body').append(tplPopup);
		}
		ajaxRequest(block);
		if (!$this.data('replace')) {
			$('.modal').modal('show').on('hidden.bs.modal', function () {
				$(this).remove();
			});
		}
		return false;
	});


	//submitting form
	$('body').on('input', '.js-form input, .js-form select', function() {
		$(this).parent().find($('.form-error')).fadeOut();
	});
	$('body').on('submit', '.js-form', function(e) {
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		var $this = $(this),
			action = $this.attr('action'),
			params = $this.serializeArray();
		$.post(action, params, function(data) {
			if (data.status == 'failure') {
				$.each(data.errors, function(idx, error) {
					if(error.field) {
						$('[name=' + error.field + ']').parent().find($('.form-error')).html(error.message).fadeIn();
					}
					else {
						$this.find('.form-error').eq(0).html(error.message).fadeIn();
					}

					if (error.field == 'code' && error.code == 'invalid') {
						var recaptchaItem = $('.g-recaptcha').length - 1; //can be more than 1 recaptcha on the page
						if(recaptchaItem > 0) {
							grecaptcha.reset(recaptchaItem);
						} else {
							grecaptcha.reset();
						}
					}
				});
			} else {
				setTimeout(function() {
					window.location.reload();
				}, 1000);
				$this.next().show();
				$this.remove();
			}
		});
	});

	//block cookie
	if(!Cookies.get('info')) {
		$('.block-text').show();
	}
	$('.js-hide-text-info').on('click', function() {
		$('.block-text').slideUp();
		Cookies.set('info', 1, { expires: 99999 });
		return false;
	});


	$('body').on('click', '.js-show-bad-comment', function() {
		var $this = $(this);
		var $parent = $this.closest('.comment-item');
		$parent.hide();
		$parent.next().show();
	});

	$('.js-show-tags').on('click', function() {
		console.log('test')
		var $this = $(this);
		$this.parent().find('a').removeClass('hidden')
		$this.remove();
	});

	if(window.canRunAds === undefined) { //if user uses adblock
		$('#banner_video').remove();
		if(!Cookies.get('adblock_detected')) {
			console.log('ADBLOCK detected!');
			Cookies.set('adblock_detected', 1);
			gtag('send', 'event', 'adblock', 'detected');
		}
	}

	$('body').on('click', '.js-intpage', function() {
		var video_id = $(this).attr('data-video-id');
		var counter = parseInt(Cookies.get('page_banner'));
		if (counter === 3) {
			Cookies.set('page_banner', counter-1, { expires: 1 });
			window.location.href = '/intpage.php?viewkey=' + video_id;
			return false;
		} else if (counter > 1) {
			Cookies.set('page_banner', counter-1, { expires: 1 });
		} else {
			Cookies.set('page_banner', 3, { expires: 1 });
		}
	});


	var current_orientation = Cookies.get('af_custom1');
	if (current_orientation == 1) {
		$('[data-orientation="1"]').hide();
		$('[data-orientation="2"]').show();
	} else if (current_orientation == 2) {
		$('[data-orientation="2"]').hide();
		$('[data-orientation="1"]').show();
	}
	
	$('.js-orientation').on('click', function() {
		var $this = $(this);
		var orientation = $this.attr('data-orientation');
		$this.parent().find('.js-orientation').toggle();
		Cookies.set('af_custom1', orientation, { expires: 999 });
		window.location.reload();
	});

	$('body').on('click', '.js-recaptcha', function(ev) {
		var form = $(this).closest('form');
		var msg = form.serialize();
		$.ajax({
			type: 'POST',
			url: '/verify.php',
			data: msg,
			success:function(data){
				var fail = data.match(/false/g);
				if(fail) {
					$('.recaptcha-error').show();
				}
				else {
					form.submit();
					$('.recaptcha-error').hide();
				}
			}
		});
	});
});
$(window).load(function() {
	$('.list-images').masonry({
		itemSelector: '.item',
		percentPosition: true,
		stamp: '.spot'
	});
});
$(window).scroll(function() {
	if ($(this).scrollTop() > 100) {
		$('.go-up').fadeIn();
	} else {
		$('.go-up').fadeOut();
	}
});
