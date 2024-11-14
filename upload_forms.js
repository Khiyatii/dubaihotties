/*
 * jQuery Form Plugin; v20130916
 * http://jquery.malsup.com/form/
 * Copyright (c) 2013 M. Alsup; Dual licensed: MIT/GPL
 * https://github.com/malsup/form#copyright-and-license
 */
(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=this;if(i.clk=r,"image"==r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n={};n.fileapi=void 0!==e("<input type='file'/>").get(0).files,n.formdata=void 0!==window.FormData;var i=!!e.fn.prop;e.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;o>a;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function o(a){for(var n=new FormData,i=0;a.length>i;i++)n.append(a[i].name,a[i].value);if(t.extraData){var o=r(t.extraData);for(i=0;o.length>i;i++)o[i]&&n.append(o[i][0],o[i][1])}t.data=null;var s=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:u||"POST"});t.uploadProgress&&(s.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(100*(a/n))),t.uploadProgress(e,a,n,r)},!1),r}),s.data=null;var l=s.beforeSend;return s.beforeSend=function(e,t){t.data=n,l&&l.call(this,e,t)},e.ajax(s)}function s(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(r){a("cannot get iframe.contentWindow document: "+r)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function o(){function t(){try{var e=n(g).readyState;a("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(r){a("Server abort: ",r," (",r.name,")"),s(D),j&&clearTimeout(j),j=void 0}}var r=f.attr2("target"),i=f.attr2("action");w.setAttribute("target",d),(!u||/post/i.test(u))&&w.setAttribute("method","POST"),i!=m.url&&w.setAttribute("action",m.url),m.skipEncodingOverride||u&&!/post/i.test(u)||f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),m.timeout&&(j=setTimeout(function(){T=!0,s(k)},m.timeout));var o=[];try{if(m.extraData)for(var l in m.extraData)m.extraData.hasOwnProperty(l)&&(e.isPlainObject(m.extraData[l])&&m.extraData[l].hasOwnProperty("name")&&m.extraData[l].hasOwnProperty("value")?o.push(e('<input type="hidden" name="'+m.extraData[l].name+'">').val(m.extraData[l].value).appendTo(w)[0]):o.push(e('<input type="hidden" name="'+l+'">').val(m.extraData[l]).appendTo(w)[0]));m.iframeTarget||v.appendTo("body"),g.attachEvent?g.attachEvent("onload",s):g.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(c){var p=document.createElement("form").submit;p.apply(w)}}finally{w.setAttribute("action",i),r?w.setAttribute("target",r):f.removeAttr("target"),e(o).remove()}}function s(t){if(!x.aborted&&!F){if(M=n(g),M||(a("cannot access response document"),t=D),t===k&&x)return x.abort("timeout"),S.reject(x,"timeout"),void 0;if(t==D&&x)return x.abort("server abort"),S.reject(x,"error","server abort"),void 0;if(M&&M.location.href!=m.iframeSrc||T){g.detachEvent?g.detachEvent("onload",s):g.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"==m.dataType||M.XMLDocument||e.isXMLDoc(M);if(a("isXml="+o),!o&&window.opera&&(null===M.body||!M.body.innerHTML)&&--O)return a("requeing onLoad callback, DOM not available"),setTimeout(s,250),void 0;var u=M.body?M.body:M.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=M.XMLDocument?M.XMLDocument:M,o&&(m.dataType="xml"),x.getResponseHeader=function(e){var t={"content-type":m.dataType};return t[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var l=(m.dataType||"").toLowerCase(),c=/(json|script|text)/.test(l);if(c||m.textarea){var f=M.getElementsByTagName("textarea")[0];if(f)x.responseText=f.value,x.status=Number(f.getAttribute("status"))||x.status,x.statusText=f.getAttribute("statusText")||x.statusText;else if(c){var d=M.getElementsByTagName("pre")[0],h=M.getElementsByTagName("body")[0];d?x.responseText=d.textContent?d.textContent:d.innerText:h&&(x.responseText=h.textContent?h.textContent:h.innerText)}}else"xml"==l&&!x.responseXML&&x.responseText&&(x.responseXML=X(x.responseText));try{E=_(x,l,m)}catch(b){i="parsererror",x.error=r=b||i}}catch(b){a("error caught: ",b),i="error",x.error=r=b||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&300>x.status||304===x.status?"success":"error"),"success"===i?(m.success&&m.success.call(m.context,E,"success",x),S.resolve(x.responseText,"success",x),p&&e.event.trigger("ajaxSuccess",[x,m])):i&&(void 0===r&&(r=x.statusText),m.error&&m.error.call(m.context,x,i,r),S.reject(x,"error",r),p&&e.event.trigger("ajaxError",[x,m,r])),p&&e.event.trigger("ajaxComplete",[x,m]),p&&!--e.active&&e.event.trigger("ajaxStop"),m.complete&&m.complete.call(m.context,x,i),F=!0,m.timeout&&clearTimeout(j),setTimeout(function(){m.iframeTarget?v.attr("src",m.iframeSrc):v.remove(),x.responseXML=null},100)}}}var l,c,m,p,d,v,g,x,b,y,T,j,w=f[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(c=0;h.length>c;c++)l=e(h[c]),i?l.prop("disabled",!1):l.removeAttr("disabled");if(m=e.extend(!0,{},e.ajaxSettings,t),m.context=m.context||m,d="jqFormIO"+(new Date).getTime(),m.iframeTarget?(v=e(m.iframeTarget),y=v.attr2("name"),y?d=y:v.attr2("name",d)):(v=e('<iframe name="'+d+'" src="'+m.iframeSrc+'" />'),v.css({position:"absolute",top:"-1000px",left:"-1000px"})),g=v[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{g.contentWindow.document.execCommand&&g.contentWindow.document.execCommand("Stop")}catch(n){}v.attr("src",m.iframeSrc),x.error=r,m.error&&m.error.call(m.context,x,r,t),p&&e.event.trigger("ajaxError",[x,m,r]),m.complete&&m.complete.call(m.context,x,r)}},p=m.global,p&&0===e.active++&&e.event.trigger("ajaxStart"),p&&e.event.trigger("ajaxSend",[x,m]),m.beforeSend&&m.beforeSend.call(m.context,x,m)===!1)return m.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;b=w.clk,b&&(y=b.name,y&&!b.disabled&&(m.extraData=m.extraData||{},m.extraData[y]=b.value,"image"==b.type&&(m.extraData[y+".x"]=w.clk_x,m.extraData[y+".y"]=w.clk_y)));var k=1,D=2,A=e("meta[name=csrf-token]").attr("content"),L=e("meta[name=csrf-param]").attr("content");L&&A&&(m.extraData=m.extraData||{},m.extraData[L]=A),m.forceSync?o():setTimeout(o,10);var E,M,F,O=50,X=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},C=e.parseJSON||function(e){return window.eval("("+e+")")},_=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i="xml"===r||!r&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&("json"===r||!r&&n.indexOf("json")>=0?o=C(o):("script"===r||!r&&n.indexOf("javascript")>=0)&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var u,l,c,f=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),u=t.type||this.attr2("method"),l=t.url||this.attr2("action"),c="string"==typeof l?e.trim(l):"",c=c||window.location.href||"",c&&(c=(c.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:c,success:e.ajaxSettings.success,type:u||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var p=t.traditional;void 0===p&&(p=e.ajaxSettings.traditional);var d,h=[],v=this.formToArray(t.semantic,h);if(t.data&&(t.extraData=t.data,d=e.param(t.data,p)),t.beforeSubmit&&t.beforeSubmit(v,this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[v,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var g=e.param(v,p);d&&(g=g?g+"&"+d:d),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+g,t.data=null):t.data=g;var x=[];if(t.resetForm&&x.push(function(){f.resetForm()}),t.clearForm&&x.push(function(){f.clearForm(t.includeHidden)}),!t.dataType&&t.target){var b=t.success||function(){};x.push(function(r){var a=t.replaceTarget?"replaceWith":"html";e(t.target)[a](r).each(b,arguments)})}else t.success&&x.push(t.success);if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=x.length;o>i;i++)x[i].apply(n,[e,r,a||f,f])},t.error){var y=t.error;t.error=function(e,r,a){var n=t.context||this;y.apply(n,[e,r,a,f])}}if(t.complete){var T=t.complete;t.complete=function(e,r){var a=t.context||this;T.apply(a,[e,r,f])}}var j=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}),w=j.length>0,S="multipart/form-data",k=f.attr("enctype")==S||f.attr("encoding")==S,D=n.fileapi&&n.formdata;a("fileAPI :"+D);var A,L=(w||k)&&!D;t.iframe!==!1&&(t.iframe||L)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){A=s(v)}):A=s(v):A=(w||k)&&D?o(v):e.ajax(t),f.removeData("jqxhr").data("jqxhr",A);for(var E=0;h.length>E;E++)h[E]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n){if(n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!e.isReady&&i.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(i.s,i.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().bind("submit.form-plugin",n,t).bind("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var a=[];if(0===this.length)return a;var i=this[0],o=t?i.getElementsByTagName("*"):i.elements;if(!o)return a;var s,u,l,c,f,m,p;for(s=0,m=o.length;m>s;s++)if(f=o[s],l=f.name,l&&!f.disabled)if(t&&i.clk&&"image"==f.type)i.clk==f&&(a.push({name:l,value:e(f).val(),type:f.type}),a.push({name:l+".x",value:i.clk_x},{name:l+".y",value:i.clk_y}));else if(c=e.fieldValue(f,!0),c&&c.constructor==Array)for(r&&r.push(f),u=0,p=c.length;p>u;u++)a.push({name:l,value:c[u]});else if(n.fileapi&&"file"==f.type){r&&r.push(f);var d=f.files;if(d.length)for(u=0;d.length>u;u++)a.push({name:l,value:d[u],type:f.type});else a.push({name:l,value:"",type:f.type})}else null!==c&&c!==void 0&&(r&&r.push(f),a.push({name:l,value:c,type:f.type,required:f.required}));if(!t&&i.clk){var h=e(i.clk),v=h[0];l=v.name,l&&!v.disabled&&"image"==v.type&&(a.push({name:l,value:h.val()}),a.push({name:l+".x",value:i.clk_x},{name:l+".y",value:i.clk_y}))}return a},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var i=0,o=n.length;o>i;i++)r.push({name:a,value:n[i]});else null!==n&&n!==void 0&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;n>a;a++){var i=this[a],o=e.fieldValue(i,t);null===o||void 0===o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,n=t.type,i=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==i&&-1==t.selectedIndex))return null;if("select"==i){var o=t.selectedIndex;if(0>o)return null;for(var s=[],u=t.options,l="select-one"==n,c=l?o+1:u.length,f=l?o:0;c>f;f++){var m=u[f];if(m.selected){var p=m.value;if(p||(p=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),l)return p;s.push(p)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"==n?this.value="":"checkbox"==a||"radio"==a?this.checked=!1:"select"==n?this.selectedIndex=-1:"file"==a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"==a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1})("undefined"!=typeof jQuery?jQuery:window.Zepto);


$(document).ready(function () {

	String.prototype.trim = function() {
		return this.replace(/^\s+/, '').replace(/\s+$/, '');
	};

	$.fn.exists = function () {
		return this.length > 0;
	};

	(function() {
		var storage = {};

		var pageContext = window['pageContext'];

		var utilitiesAjaxForm = function($form, callbacks) {

			var defaultErrorMessage = 'Unexpected server response received. Please contact support.';
			if (pageContext && pageContext['server_error']) {
				defaultErrorMessage = pageContext['server_error'];
			}

			$form.ajaxForm({
				data: {
					format: 'json',
					mode: 'async'
				},

				beforeSerialize: function () {
					var $autoPopulates = $form.find('[data-form-populate-from]');
					$autoPopulates.each(function() {
						var populateFromName = $(this).attr('data-form-populate-from');
						if (populateFromName) {
							var $populateFrom = $form.find('[name="' + populateFromName + '"]');
							if ($populateFrom.exists()) {
								$(this).val($populateFrom.val());
							}
						}
					});
					if (callbacks && callbacks['beforeSerialize']) {
						callbacks['beforeSerialize']($form);
					}
				},

				beforeSubmit: function (data) {
					var confirmText = $form.attr('data-confirm') || '';
					if (confirmText && !confirm(confirmText)) {
						return false;
					}

					var result = true;
					if (callbacks && callbacks['beforeSubmit']) {
						result = callbacks['beforeSubmit']($form, data);
					}
					return result;
				},

				uploadProgress: function(event, position, total, percent) {
					if (callbacks && callbacks['uploadProgress']) {
						callbacks['uploadProgress']($form, percent);
					}
				},

				success: function (response, statusText, xhr) {
					$form.find('.generic-error').empty().hide();

					if (xhr.getResponseHeader('Content-Type').indexOf('application/json') >= 0) {
						if (typeof response != 'object') {
							response = JSON.parse(response);
						}

						if (response['status'] == 'failure') {
							for (var i = 0; i < response['errors'].length; i++) {
								var error = response['errors'][i];

								var fieldName = error['field'];
								var errorCode = error['code'];
								var errorMessage = error['message'];

								var $errorContainer = null;
								if (fieldName) {
									var $field = $form.find('[name="' + fieldName + '"]');
									if (!$field.exists()) {
										$field = $form.find('[data-name="' + fieldName + '"] [type="text"]');
									}
									if (!$field.exists()) {
										$field = $form.find('[data-name="' + fieldName + '"] select');
									}
									if ($field.exists()) {
										$field.addClass('error');
										$field.parents('.file-control').find('[type="text"]').addClass('error');
										$errorContainer = $field.parent().find('.field-error');
										if (!$errorContainer.exists()) {
											var fieldTitle = $field.parent().find('label').text();
											if (fieldTitle) {
												errorMessage += ' (' + fieldTitle + ')';
											}
										}
										if (i==0) {
											$field.focus();
										}
									} else {
										errorMessage += ' (' + fieldName + ')';
									}
								}
								if (!$errorContainer || !$errorContainer.exists()) {
									$errorContainer = $form.find('.generic-error');
								}

								$errorContainer.empty().text(errorMessage).fadeIn();

								if (fieldName == 'code' && errorCode != 'required') {
									var $captcha = $form.find('.captcha-control img');
									if ($captcha.exists()) {
										$captcha.attr('src', $captcha.attr('src').replace(new RegExp('rand=\\d+'),'rand=' + new Date().getTime()));
										$form.find('.captcha-control .textfield').val('');
									}
								}

								//google recaptcha
								if (fieldName == 'code' && errorCode == 'invalid') {
									var $recaptcha = $form.find('.g-recaptcha');
									if ($recaptcha.exists()) {
										grecaptcha.reset();
									}
								}
							}
							if (callbacks && callbacks['error']) {
								callbacks['error']($form);
							}
						} else if (response['status'] == 'success') {
							if (callbacks && callbacks['success']) {
								callbacks['success']($form, response['data']);
							} else if (response['redirect']) {
								window.location = response['redirect'];
							} else {
								var $reloader = $('[data-reload-to]');
								if ($reloader.exists()) {
									window.location = $reloader.attr('data-reload-to');
								} else {
									window.location.reload();
								}
							}
						} else {
							$form.find('.generic-error').text(defaultErrorMessage).show();
							if (callbacks && callbacks['error']) {
								callbacks['error']($form);
							}
						}

					} else if (xhr.getResponseHeader('Content-Type').indexOf('text/html') >= 0) {
						if (callbacks && callbacks['success']) {
							callbacks['success']($form, response);
						} else {
							$form.empty().append(response);
						}
					} else {
						$form.find('.generic-error').text(defaultErrorMessage).show();
						if (callbacks && callbacks['error']) {
							callbacks['error']($form);
						}
					}
				},

				error: function () {
					$form.find('.generic-error').text(defaultErrorMessage).show();
					if (callbacks && callbacks['error']) {
						callbacks['error']($form);
					}
				},

				complete: function() {
					if (callbacks && callbacks['complete']) {
						callbacks['complete']($form);
					}
				}
			});

			$form.find('input, select, textarea').each(function() {
				var $field = $(this);

				var hideErrorFunction = function() {
					var $errorContainer = $field.parent().find('.field-error');
					$errorContainer.fadeOut();
					$field.removeClass('error');
					$field.parents('fieldset').removeClass('error');
					$field.parents('.file-control').find('[type="text"]').removeClass('error');
				};

				$field.change(hideErrorFunction);
				if ($field.get(0).tagName.toLowerCase() == 'textarea' || $field.get(0).type == 'text' || $field.get(0).type == 'password') {
					$field.keypress(hideErrorFunction);
				}
			});

			$form.find('.file-control [type="file"]').change(function() {
				var $input = $(this);
				var files = $input.prop("files");
				if (files && files.length > 0) {
					var value = '';
					for (var i = 0; i < files.length; i++) {
						if (value) {
							value += ', ';
						}
						value += files[i].name;
					}
				}

				//create array with current values
				var current_values = value.replace(/\s/g, '');
				var current_values = current_values.split(',');

				//create array with all values
				var all_values = [];
				$('.file-control [type="file"]').not($input).each(function() {
					var all_files = $(this).prop("files");
					if (all_files && all_files.length > 0) {
						for (var i = 0; i < all_files.length; i++) {
							all_values.push(all_files[i].name);
						}
					}
				});

				//find and prevent duplicates
				for(var i = 0; i < all_values.length; i++) {
					for(var j = 0; j < current_values.length; j++) {
						if(all_values[i] == current_values[j]) {
							$input.parents('.file-control').wrap('<form>').parent('form').trigger('reset');
							$input.parents('.file-control').unwrap();
							alert('This photo is already selected.')

							return false;
						}
					}
				}
				//

				$form.find('.generic-error').empty().hide();

				var $container = $input.parents('.file-control');

				if (!$container.hasClass('extra')) {
					$container.next().show();
				}
				// if ($input.attr('multiple') && (!files || files.length == 1)) {
				if ($container.hasClass('extra')) {
					var $clone = $container.clone(true, true);
					$clone.wrap('<form>').parent('form').trigger('reset');
					$clone.unwrap();
					// $container.parent().append($clone);
					$container.after($clone);
				}
				// $container.find('[type="text"]').val($container.find('.button').html().trim() + ' ' + value);
				$container.find('[type="text"]').val(value);

			});

			$form.find('.list-selector').each(function() {
				var $container = $(this);

				$container.find('[type="text"]').focus(function() {
					var $input = $(this);
					var url = $container.attr('data-selector');
					var name = $container.attr('data-name');
					var selected = ($container.attr('data-selected') || '').split(',');

					if (!$container.find('.list-selector-popup').exists()) {
						if (url && name) {
							$.ajax({
								url: url,
								type: 'GET',
								beforeSend: function () {
									// $input.block({message: null});
									$input.css({cursor: 'wait'});
								},
								complete: function () {
									// $input.unblock();
									$input.css({cursor: 'text'});
								},
								success: function (html) {
									var selectedIds = [];
									var selectedLabels = [];
									var filterValue = '';
									var $popupContent = $('<div class="list-selector-popup">' + html + '</div>');

									var $filterInput = $popupContent.find('[name="filter"]');
									for (var i = 0; i < selected.length; i++) {
										var id = selected[i].trim();
										if (id) {
											var $checkbox = $popupContent.find('input[type="checkbox"][value="' + id + '"]');
											var $label = $popupContent.find('label[for="' + $checkbox.attr('id') + '"]');
											$checkbox.prop('checked', true);
											selectedIds.push(id);
											selectedLabels.push($label.html());
										}
									}

									$container.append($popupContent);
									$popupContent.find('input[type="checkbox"]').click(function() {
										var $checkbox = $(this);
										var i = 0;
										var $label = $popupContent.find('label[for="' + $checkbox.attr('id') + '"]');
										if ($label.html()) {
											var value = $checkbox.prop('value');
											if ($checkbox.prop('checked')) {
												selectedIds.push(value);
												selectedLabels.push($label.html());
												$container.append($('<input type="hidden" name="' + name + '[]" value="' + value + '"/>'))
											} else {
												for (i = 0; i < selectedIds.length; i++) {
													if (selectedIds[i] == value) {
														selectedIds.splice(i, 1);
														selectedLabels.splice(i, 1);
														break;
													}
												}
												$container.find('input[type="hidden"][value="' + value + '"]').remove();
											}
											var selectedText = '';
											for (i = 0; i < selectedLabels.length; i++) {
												if (selectedText != '') {
													selectedText += ', ';
												}
												selectedText += selectedLabels[i];
											}
											$input.prop('value', selectedText);
											$input.change();
										}
									});

									$filterInput.focus().keyup(function() {
										if ($filterInput.val() == filterValue) {
											return;
										}
										filterValue = this.value.toLowerCase();

										$container.find('.item').each(function() {
											var $item = $(this);
											if (filterValue == '') {
												$item.show();
											} else {
												$item.toggle($item.find('label').html().toLowerCase().indexOf(filterValue) >= 0);
											}
										});
									});

									$(document).mouseup(function(e) {
										if (!$container.is(e.target) && $container.has(e.target).length === 0)
										{
											$popupContent.hide();
										}
									});
								}
							});
						}
					} else {
						$container.find('.list-selector-popup').show();
						$container.find('[name="filter"]').focus();
					}
				});
			});

		};




		var initAjaxForms = function () {
			$('[data-form="ajax"]').each(function () {
				utilitiesAjaxForm($(this));
			});
		};

		var initVideoUploadForm = function() {
			$('[data-form="ajax-upload"]').each(function () {
				var $form = $(this);
				var redirectUrl = $form.attr('data-redirect-url');
				var progressUrl = $form.attr('data-progress-url');
				var continueForm = $form.attr('data-continue-form');
				var lastPercent = 0;
				var timeoutId = null;

				var progressFunction = function(percent) {
					percent = Math.min(percent || 0, 100);
					if (percent > lastPercent) {
						$form.find('.progressbar .progress').stop(true, true).animate({width: percent + '%'});
						$form.find('.progressbar .text').html(percent + '%');
						lastPercent = percent;
					}
				};

				utilitiesAjaxForm($form, {
					success: function($form, uploadData) {
						$form.find('.progressbar .progress').css({width: '100%'});

						if (uploadData && uploadData['filename'] && redirectUrl) {
							window.location = redirectUrl.replace('%HASH%', uploadData['filename']);
						} else if (uploadData && uploadData['filename'] && continueForm) {
							// $form.remove();
							$('#' + continueForm).find('input[type="submit"]').enable(true);
							if ($('.video-file').length > 0) { //if video page
								$('#' + continueForm).find('input[name="file"]').val(uploadData['filename'] + '.mp4');
							} else { //album page
								$('#' + continueForm).find('input[name="files"]').val(uploadData['filename']);
							}
							$('#' + continueForm).find('input[name="file_hash"]').val(uploadData['filename']);

							$('#' + continueForm).find('button[disabled]').removeAttr('disabled');

							//paste img
							var blockPreviewHolder = $('.preview-holder');
							var blockPreview = blockPreviewHolder.find('.preview');
							if ($('.video-file').length > 0) { //if video page
								var imgPreview = '<img id="img-preview" src="/upload-video-preview/' + uploadData['filename'] + '/">';
							} else {
								var imgPreview = '<img id="img-preview" src="/upload-photos-preview/' + uploadData['filename'] + '/">';
							}
							blockPreview.append(imgPreview);
							setTimeout(function() {
								var imgWidth = document.getElementById('img-preview').naturalWidth;
								var imgHeight = document.getElementById('img-preview').naturalHeight;
								var imgInfo = '<div class="info">' + imgWidth + "x" + imgHeight + '</div>';
								blockPreview.append(imgInfo);

								blockPreviewHolder.show();
							}, 2000);
						}
					},

					beforeSerialize: function($form) {
						var md5filename = '';
						if ($form.find('[name="url"]').val() || $form.find('[name="content"]').val() || $form.find('[name="content[]"]').val() || $form.find('[name="embed"]').val()) {
							for (var i = 0; i < 32; i++) {
								md5filename += '' + Math.floor((Math.random() * 10));
							}
							$form.find('[name="filename"]').val(md5filename);
						} else {
							$form.find('[name="filename"]').val(md5filename);
						}
					},

					beforeSubmit: function($form) {
						$form.find('.file-control').hide();
						$form.find('.submit-control').hide();

						$('#' + continueForm).show();

						lastPercent = 0;
						$form.append($('<div class="progressbar"><div class="progress"></div><div class="text"></div></div>'));
						if ($form.find('[name="upload_option"]:checked').val() == 'url' && progressUrl) {
							var md5filename = $form.find('[name="filename"]').val();
							if (md5filename) {
								var checkProgressFunction = function() {
									$.ajax({
										url: progressUrl.replace('%HASH%', md5filename),
										type: 'GET',
										timeout: 10000,
										cache: false,

										success: function(xml) {
											if (xml && xml.documentElement) {
												var loaded = $(xml.documentElement).find('loaded').text() || 0;
												var total = $(xml.documentElement).find('total').text() || 1;
												progressFunction(Math.floor(loaded / total * 100));
											}
										},

										complete: function() {
											timeoutId = setTimeout(checkProgressFunction, 1000);
										}
									});
								};
								timeoutId = setTimeout(checkProgressFunction, 1000);
							}
						}
						return true;
					},

					uploadProgress: function($form, percent) {
						if ($form.find('[name="upload_option"]:checked').val() != 'url') {
							progressFunction(percent);
						}
					},

					complete: function($form) {
						// $form.find('.progressbar').hide().remove();
						if (timeoutId) {
							clearTimeout(timeoutId);
						}

						if($('#' + continueForm).find('button[disabled]').length) {
							$form.find('.file-control:not(.extra)').show();
							$form.find('.progressbar').hide().remove();
							$form.find('.submit-control').show();
						}
					},

					error: function($form) {
						$('#' + continueForm).hide();
					}
				});

				$form.find('[name="upload_option"]').change(function() {
					var $radio = $(this);
					if ($radio.prop('checked')) {
						var disabledProp = 'disabled';
						if ($radio.val() == 'file') {
							$form.find('[name="content"]').parents('.file-control').find('input').removeAttr(disabledProp).click();
							$form.find('[name="url"]').attr(disabledProp, disabledProp).val('').change();
							$form.find('[name="embed"]').attr(disabledProp, disabledProp).val('').change().parents('.row').find('label').removeClass('required');
							$form.find('[name="duration"]').attr(disabledProp, disabledProp).val('').change().parents('.row').find('label').removeClass('required');
							$form.find('[name="screenshot"]').parents('.file-control').find('input').attr(disabledProp, disabledProp).val('').change().parents('.row').find('label').removeClass('required');
						} else if ($radio.val() == 'url') {
							$form.find('[name="content"]').parents('.file-control').find('input').attr(disabledProp, disabledProp).val('').change();
							$form.find('[name="url"]').removeAttr(disabledProp).focus();
							$form.find('[name="embed"]').attr(disabledProp, disabledProp).val('').change().parents('.row').find('label').removeClass('required');
							$form.find('[name="duration"]').attr(disabledProp, disabledProp).val('').change().parents('.row').find('label').removeClass('required');
							$form.find('[name="screenshot"]').parents('.file-control').find('input').attr(disabledProp, disabledProp).val('').change().parents('.row').find('label').removeClass('required');
						} else if ($radio.val() == 'embed') {
							$form.find('[name="url"]').attr(disabledProp, disabledProp).val('').change();
							$form.find('[name="content"]').parents('.file-control').find('input').attr(disabledProp, disabledProp).val('').change();
							$form.find('[name="embed"]').removeAttr(disabledProp).focus().parents('.row').find('label').addClass('required');
							$form.find('[name="duration"]').removeAttr(disabledProp).parents('.row').find('label').addClass('required');
							$form.find('[name="screenshot"]').parents('.file-control').find('input').removeAttr(disabledProp).parents('.row').find('label').addClass('required');
						}
					}
				});

				var params = {mode: 'async', format: 'json', action: $form.find('[name="action"]').val()};
				$form.attr('action', ($form.attr('action') || '') + (($form.attr('action') || '').indexOf('?') >=0 ? '&' : '?') + $.param(params));
			});
		};


		var initMethods = [
			initAjaxForms,
			initVideoUploadForm
		];

		for (var i = 0; i < initMethods.length; i++) {
			if (typeof initMethods[i] == 'function') {
				try {
					initMethods[i].call(this);
				} catch (e) {
					if (console && console.error) {
						console.error(e);
					}
				}
			}
		}
	})();
})