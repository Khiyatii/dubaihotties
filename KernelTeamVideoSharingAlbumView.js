// ============================================================================
// Developed by Kernel Team.
// http://kernel-team.com
// ============================================================================

String.prototype.trim = function() {
	return this.replace(/^\s+/, '').replace(/\s+$/, '');
};

// Common functions for reuse =================================================

function stub() {
}

function commonGet(id) {
	return document.getElementById(id);
}

function commonValidId(id) {
	return (id && commonGet(id));
}

function commonShow(id) {
	if (commonValidId(id)) {
		commonGet(id).style.display = 'block';
	}
}

function commonShowInline(id) {
	if (commonValidId(id)) {
		commonGet(id).style.display = 'inline';
	}
}

function commonHide(id) {
	if (commonValidId(id)) {
		commonGet(id).style.display = 'none';
	}
}

function commonProcessFieldError(fieldName, errorId) {
	for (var i = 0; i < 10; i++) {
		commonHide(fieldName + '_error_' + i);
	}
	commonShow(fieldName + '_' + errorId);
	return (errorId == null);
}

function commonValidateRequired(form, fieldName, errorCode) {
	if (!form[fieldName]) {
		return true;
	}
	if (form[fieldName].value.trim().length == 0) {
		return commonProcessFieldError(fieldName, errorCode);
	} else {
		return commonProcessFieldError(fieldName, null);
	}
}

function commonValidateEmailList(form, fieldName, errorCode) {
	if (!form[fieldName]) {
		return true;
	}
	var pattern = /^([^@])+@([^@])+\.([^@])+$/;
	var emails = form[fieldName].value.split(',');
	for (var i = 0; i < emails.length; i++) {
		var email = emails[i].trim();
		if (email) {
			if (!pattern.test(email)) {
				return commonProcessFieldError(fieldName, errorCode);
			}
		}
	}
	return commonProcessFieldError(fieldName, null);
}

function commonGetAjaxParams() {
	return 'mode=async&rand=' + new Date().getTime();
}

function commonSendRequest(url, data, isPost, callback) {
	var req = null;
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		req = new ActiveXObject('Microsoft.XMLHTTP');
	}
	if (!req) {
		return null;
	}
	try {
		var postData = null;
		var method = null;
		if (isPost) {
			method = 'POST';
			postData = data;
		} else if (!data) {
			method = 'GET';
		} else if (data.length > 0) {
			method = 'GET';
			if (url.indexOf('?') >= 0) {
				url += '&' + data;
			} else {
				url += '?' + data;
			}
		}
		req.open(method, encodeURI(url), true);
		if (method == 'POST') {
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}
		req.onreadystatechange = function() {
			if (req.readyState == 4) {
				var xml = req.responseXML;
				if (xml && xml.documentElement) {
					if (xml.documentElement.nodeName == 'success') {
						callback(xml.documentElement, null);
					} else if (xml.documentElement.nodeName == 'failure') {
						var childs = xml.documentElement.childNodes;
						var errors = [];
						for (var i = 0; i < childs.length; i++) {
							if (childs[i].nodeName == 'error') {
								var content = null;
								if (childs[i].textContent) {
									content = childs[i].textContent;
								} else if (childs[i].innerText) {
									content = childs[i].innerText;
								} else if (childs[i].text) {
									content = childs[i].text;
								}
								errors.push(content);
							}
						}
						callback(null, errors);
					}
				}
			}
		};
		req.send(postData);
	} catch (e) {
		return e;
	}
	return null;
}

// Album view block functions =================================================

var albumViewFriendFormVisible = false;
var albumViewFriendCaptcha = null;
var albumViewMyVote = null;

function albumViewEnableSendToFriend(params) {
	var stfLink = params['link_id'];
	var stfBlock = params['block_id'];
	var stfBlockSuccess = params['success_message_id'];
	var stfForm = params['form_id'];
	var stfCaptcha = params['captcha_id'];
	var stfWait = params['wait_id'];
	var albumId = params['album_id'];
	var callback = params['callback'];

	if (commonValidId(stfLink)) {
		commonGet(stfLink).onclick = function() {
			if (albumViewFriendFormVisible) {
				commonHide(stfBlock);
			} else {
				commonShow(stfBlock);
				if (commonValidId(stfCaptcha)) {
					if (!albumViewFriendCaptcha) {
						albumViewFriendCaptcha = document.createElement('IMG');
						commonGet(stfCaptcha).appendChild(albumViewFriendCaptcha);
					}
					albumViewFriendCaptcha.src = '?action=show_security_code&' + commonGetAjaxParams();
				}
			}
			commonHide(stfBlockSuccess);
			var st1 = (albumViewFriendFormVisible ? 'collapse_link' : 'expand_link');
			var st2 = (!albumViewFriendFormVisible ? 'collapse_link' : 'expand_link');
			albumViewFriendFormVisible = !albumViewFriendFormVisible;
			if (this.className.indexOf(st1) >= 0) {
				this.className = this.className.replace(st1, st2);
			}
			return false;
		}
	}
	if (commonValidId(stfForm) && albumId) {
		commonGet(stfForm).onsubmit = function() {
			var errorField = null;
			if (!commonValidateRequired(this, 'email', 'error_1')) {
				errorField = (errorField ? errorField : 'email');
			} else if (!commonValidateEmailList(this, 'email', 'error_2')) {
				errorField = (errorField ? errorField : 'email');
			}
			if (!commonValidateRequired(this, 'message', 'error_1')) {
				errorField = (errorField ? errorField : 'message');
			}
			if (!commonValidateRequired(this, 'code', 'error_1')) {
				errorField = (errorField ? errorField : 'code');
			}

			if (!errorField) {
				var form = this;
				commonSendRequest('?' + commonGetAjaxParams(), 'action=send_to_friend&album_id=' + albumId + '&email=' + encodeURIComponent(form['email'].value) + '&message=' + encodeURIComponent(form['message'].value) + '&code=' + encodeURIComponent(form['code'].value), true, function(successNode, errorsList) {
					if (typeof callback == 'function') {
						if (successNode) {
							callback(null);
						} else if (errorsList) {
							callback(errorsList);
						}
					} else {
						if (successNode) {
							form.reset();
							if (commonValidId(stfLink)) {
								commonGet(stfLink).onclick(commonGet(stfLink));
							} else {
								commonHide(stfBlock);
							}
							commonHide(stfWait);
							commonShow(stfBlockSuccess);
						} else if (errorsList) {
							for (var i = 0; i < errorsList.length; i++) {
								commonShow(errorsList[i]);
							}
							commonHide(stfWait);
							albumViewFriendCaptcha.src = '?action=show_security_code&' + commonGetAjaxParams();
						}
					}
				});
				commonShowInline(stfWait);
			} else {
				this[errorField].focus();
			}
			return false;
		}
	}
}

function albumViewEnableVoting(params) {
	var ratingContainer = params['container_id'];
	var ratingHint = params['hint_message_id'];
	var ratingSuccess = params['success_message_id'];
	var ratingFailure = params['failure_message_id'];
	var emptyImageSrc = params['empty_image_src'];
	var moverImageSrc = params['mover_image_src'];
	var imageId = params['album_image_id'];
	var callback = params['callback'];
	var starType = params['star_type'];
	if (!starType) {
		starType = 'IMG';
	}

	if (!commonValidId(ratingContainer)) {
		return;
	}
	var stars = [];
	var container = commonGet(ratingContainer);
	if (!container) {
		return;
	}
	var index = 1;
	for (var i = 0; i < container.childNodes.length; i++) {
		var el = container.childNodes[i];
		if (el.tagName != starType) {
			continue;
		}
		el.onmouseover = function() {
			if (albumViewMyVote) {
				return;
			}
			var src = moverImageSrc;
			for (var j = 0; j < stars.length; j++) {
				if (starType == 'IMG') {
					stars[j]['el'].src = src;
				} else {
					stars[j]['el'].className = src;
				}
				if (stars[j]['el'] == this) {
					src = emptyImageSrc;
				}
			}
		};
		el.onclick = function() {
			if (albumViewMyVote) {
				return false;
			}
			var index = 0;
			for (var j = 0; j < stars.length; j++) {
				if (stars[j]['el'] == this) {
					index = stars[j]['index'];
					break;
				}
			}
			albumViewMyVote = index;
			commonSendRequest('?' + commonGetAjaxParams(), 'action=rate&album_image_id=' + imageId + '&vote=' + index, false, function(successNode, errorsList) {
				if (typeof callback == 'function') {
					if (successNode) {
						callback(null);
					} else if (errorsList) {
						callback(errorsList);
					}
				} else {
					commonHide(ratingHint);
					if (successNode) {
						commonShow(ratingSuccess);
					} else if (errorsList) {
						commonShow(ratingFailure);
					}
				}
				var src = moverImageSrc;
				for (var j = 0; j < stars.length; j++) {
					if (starType == 'IMG') {
						stars[j]['el'].src = src;
					} else {
						stars[j]['el'].className = src;
					}
					if (j == index - 1) {
						src = emptyImageSrc;
					}
				}
			});
		};
		stars.push({el: el, initial: (starType == 'IMG' ? el.src : el.className), index: index});
		index++;
	}
	container.onmouseout = function(e) {
		if (albumViewMyVote) {
			return;
		}
		if (!e) {
			e = window.event;
		}
		var mouseX = 0;
		var mouseY = 0;
		if (e.pageX && e.pageY) {
			mouseX = e.pageX;
			mouseY = e.pageY;
		} else if (e.clientX && e.clientY) {
			mouseX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			mouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}

		var x = 0;
		var y = 0;
		var element = container;
		while (element) {
			x += element.offsetLeft;
			y += element.offsetTop;
			element = element.offsetParent;
		}
		if ((mouseX <= x) || (mouseY <= y) || (mouseX >= x + container.offsetWidth) || (mouseY >= y + container.offsetHeight)) {
			for (var j = 0; j < stars.length; j++) {
				if (starType == 'IMG') {
					stars[j]['el'].src = stars[j]['initial'];
				} else {
					stars[j]['el'].className = stars[j]['initial'];
				}
			}
		}
	};
}

function albumViewEnableFlagging(params) {
	var flagContainer = params['container_id'];
	var flagButton = params['button_id'];
	var flagTextField = params['text_id'];
	var flagExternalId = params['flag_external_id'];
	var flagHint = params['hint_message_id'];
	var flagSuccess = params['success_message_id'];
	var flagFailure = params['failure_message_id'];
	var albumImageId = params['album_image_id'];
	var callback = params['callback'];

	if (!commonValidId(flagButton)) {
		return;
	}

	commonGet(flagButton).onclick = function() {
		var flagMessageStr = '';
		var textfield = commonGet(flagTextField);
		if (textfield && textfield.value) {
			flagMessageStr = '&flag_message=' + encodeURIComponent(textfield.value);
		}
		commonSendRequest('?' + commonGetAjaxParams(), 'action=flag&album_image_id=' + albumImageId + '&flag_id=' + flagExternalId + flagMessageStr, true, function(successNode, errorsList) {
			if (typeof callback == 'function') {
				if (successNode) {
					callback(null);
				} else if (errorsList) {
					callback(errorsList);
				}
			} else {
				commonHide(flagHint);
				commonHide(flagSuccess);
				commonHide(flagFailure);
				if (successNode) {
					commonShow(flagSuccess);
					commonHide(flagContainer);
					if (textfield && textfield.value) {
						textfield.value = '';
					}
				} else if (errorsList) {
					commonShow(flagFailure);
				}
			}
		});
		return false;
	}
}

function albumViewEnableAddToFavourites(params) {
	var favLink = params['link_id'];
	var favBlockSuccess = params['success_message_id'];
	var albumId = params['album_id'];
	var favType = params['fav_type'];
	var callback = params['callback'];

	if (commonValidId(favLink)) {
		commonGet(favLink).onclick = function() {
			commonSendRequest('?' + commonGetAjaxParams(), 'action=add_to_favourites&album_id=' + albumId + (favType ? '&fav_type=' + favType : ''), false, function(successNode, errorsList) {
				if (typeof callback == 'function') {
					if (successNode) {
						callback(null);
					} else if (errorsList) {
						callback(errorsList);
					}
				} else {
					if (successNode) {
						commonHide(favLink);
						if (commonValidId(favBlockSuccess)) {
							commonShow(favBlockSuccess);
						}
					}
				}
			});
			return false;
		}
	}
}

function albumViewEnablePurchaseAlbum(params) {
	var purchaseLink = params['link_id'];
	var purchaseConfirm = params['checkbox_id'];
	var purchaseBlockMessage = params['info_message_id'];
	var purchaseBlockSuccess = params['success_message_id'];
	var purchaseBlockError = params['error_message_id'];
	var albumId = params['album_id'];
	var callback = params['callback'];

	if (commonValidId(purchaseLink)) {
		commonGet(purchaseLink).onclick = function() {
			if (commonValidId(purchaseConfirm)) {
				if (!commonGet(purchaseConfirm).checked)
				{
					return false;
				}
			}
			commonSendRequest('?' + commonGetAjaxParams(), 'action=purchase_album&album_id=' + albumId, false, function(successNode, errorsList) {
				if (typeof callback == 'function') {
					if (successNode) {
						callback(null);
					} else if (errorsList) {
						callback(errorsList);
					}
				} else {
					if (successNode) {
						commonHide(purchaseLink);
						commonHide(purchaseBlockMessage);
						commonShow(purchaseBlockSuccess);
						setTimeout('window.location.reload()', 1000);
					} else if (errorsList) {
						commonShow(purchaseBlockError);
					}
				}
			});
			return false;
		}
	}
}

// Album comments block functions =============================================

var albumCommentsFormVisible = false;
var albumCommentsCaptcha = null;

function albumCommentsEnableComments(params) {
	var scLink = params['all_link_id'];
	var scBlock = params['all_block_id'];
	var acLink = params['add_link_id'];
	var acBlock = params['add_block_id'];
	var acBlockSuccess = params['success_message_id'];
	var acBlockFailure = params['failure_message_id'];
	var acForm = params['form_id'];
	var acCaptcha = params['captcha_id'];
	var acWait = params['wait_id'];
	var albumId = params['album_id'];
	var albumImageId = params['album_image_id'];
	var callback = params['callback'];

	if (commonValidId(scLink)) {
		commonGet(scLink).onclick = function() {
			this.style.display = 'none';
			commonShow(scBlock);
			return false;
		}
	}
	if (commonValidId(acLink)) {
		commonGet(acLink).onclick = function() {
			if (albumCommentsFormVisible) {
				commonHide(acBlock);
			} else {
				commonShow(acBlock);
				if (commonValidId(acCaptcha)) {
					if (!albumCommentsCaptcha) {
						albumCommentsCaptcha = document.createElement('IMG');
						commonGet(acCaptcha).appendChild(albumCommentsCaptcha);
					}
					albumCommentsCaptcha.src = '?action=show_security_code&' + commonGetAjaxParams();
				}
			}
			commonHide(acBlockSuccess);
			commonHide(acBlockFailure);
			var st1 = (albumCommentsFormVisible ? 'collapse_link' : 'expand_link');
			var st2 = (!albumCommentsFormVisible ? 'collapse_link' : 'expand_link');
			albumCommentsFormVisible = !albumCommentsFormVisible;
			if (this.className.indexOf(st1) >= 0) {
				this.className = this.className.replace(st1, st2);
			}
			return false;
		}
	}
	if (commonValidId(acForm)) {
		commonGet(acForm).onsubmit = function() {
			var errorField = null;
			if (!commonValidateRequired(this, 'comment', 'error_1')) {
				errorField = (errorField ? errorField : 'comment');
			}
			if (!commonValidateRequired(this, 'code', 'error_5')) {
				errorField = (errorField ? errorField : 'code');
			}

			if (!errorField) {
				var form = this;
				var captchaCode = '';
				if (form['code']) {
					captchaCode = form['code'].value;
				}
				var anonymousUsername = '';
				if (form['anonymous_username']) {
					anonymousUsername = form['anonymous_username'].value;
					if (anonymousUsername != '') {
						commonCreateCookie('kt_anonymous_username', anonymousUsername, 365);
					}
				}
				commonSendRequest('?' + commonGetAjaxParams(), 'action=add_comment&album_image_id=' + albumImageId + (albumId > 0 ? '&album_id=' + albumId : '') + '&comment=' + encodeURIComponent(form['comment'].value) + '&code=' + encodeURIComponent(captchaCode) + '&anonymous_username=' + encodeURIComponent(anonymousUsername), true, function(successNode, errorsList) {
					if (typeof callback == 'function') {
						if (successNode) {
							callback(null);
						} else if (errorsList) {
							callback(errorsList);
						}
					} else {
						if (successNode) {
							form.reset();
							if (commonValidId(acLink)) {
								commonGet(acLink).onclick(commonGet(acLink));
							} else {
								commonHide(acBlock);
							}
							commonHide(acWait);
							commonShow(acBlockSuccess);
						} else if (errorsList) {
							for (var i = 0; i < errorsList.length; i++) {
								commonShow(errorsList[i]);
							}
							commonHide(acWait);
							if (commonValidId(acCaptcha)) {
								albumCommentsCaptcha.src = '?action=show_security_code&' + commonGetAjaxParams();
							}
						}
					}
				});
				commonShowInline(acWait);
			} else {
				this[errorField].focus();
			}
			return false;
		};

		var anonymousUsername = commonReadCookie('kt_anonymous_username');
		if (anonymousUsername != '') {
			if (commonGet(acForm)['anonymous_username']) {
				commonGet(acForm)['anonymous_username'].value = anonymousUsername;
			}
		}
	}
}

function albumCommentsVote(params) {
	var commentId = params['comment_id'];
	var vote = params['vote'];
	var callback = params['callback'];
	commonSendRequest('?' + commonGetAjaxParams(), 'action=vote_comment&comment_id=' + commentId + '&vote=' + vote, false, function(successNode, errorsList) {
		if (typeof callback == 'function') {
			if (successNode) {
				callback(null);
			} else if (errorsList) {
				callback(errorsList);
			}
		}
	});
}

function albumCommentsEdit(params) {
	var commentId = params['comment_id'];
	var comment = params['comment'];
	var callback = params['callback'];
	commonSendRequest('?' + commonGetAjaxParams(), 'action=edit_comment&comment_id=' + commentId + '&comment=' + encodeURIComponent(comment), true, function(successNode, errorsList) {
		if (typeof callback == 'function') {
			if (successNode) {
				callback(null);
			} else if (errorsList) {
				callback(errorsList);
			}
		}
	});
}

// Statistics functions =======================================================

commonCreateCookie('kt_tcookie', '1', 1);
if (commonReadCookie('kt_tcookie') == '1') {
	var url = '?mode=async&action=js_stats_view_album&rand=' + new Date().getTime();
	if (location.href.indexOf('?')>0)
	{
		url = location.href + '&mode=async&action=js_stats_view_album&rand=' + new Date().getTime();
	}
	var img = new Image();
	img.src = url;
}