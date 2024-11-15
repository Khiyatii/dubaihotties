// ============================================================================
// Developed by Kernel Team.
// http://kernel-team.com
// ============================================================================

function KT_rotationEngineStartup(tp, wp) {
	KT_rotationEngineStartup._THUMBS = {};
	if (window['KT_rotationEngineWaitPeriod']) {
		KT_rotationEngineStartup._ROTATION_PERIOD_MS = window['KT_rotationEngineWaitPeriod'] * 1000;
	} else {
		KT_rotationEngineStartup._ROTATION_PERIOD_MS = wp * 1000;
	}
	KT_rotationEngineStartup._ROTATION_ID = null;
	KT_rotationEngineStartup._ROTATION_UID = null;
	KT_rotationEngineStartup._DUMMY = tp;
}

function KT_rotationStop(image) {
	if (KT_rotationEngineStartup._ROTATION_ID) {
		var thumbData = KT_rotationEngineStartup._THUMBS[KT_rotationEngineStartup._ROTATION_ID];
		if (thumbData && thumbData['thumb'] && thumbData['thumbInitial']) {
			thumbData['thumb'].src = thumbData['thumbInitial'];
		}
	}
	KT_rotationEngineStartup._ROTATION_ID = null;
	KT_rotationEngineStartup._ROTATION_UID = null;
	KT_rotationEngineStartup._DUMMY = image;
}

function KT_rotationStart(image, urlPrefix, thumbCount, thumbExt) {
	KT_rotationStop(null);

	if (image) {
		var currentThumbUrl = image.src;

		var thumbId = image.id;
		if (!thumbId) {
			thumbId = 'KT_rotationEngineStartup_' + new Date().getTime();
			image.id = thumbId
		}
		var initialIdx = 1;
		if (image.src.indexOf(urlPrefix + initialIdx + (thumbExt ? thumbExt : '.jpg'))>=0)
		{
			initialIdx = 2;
		}
		KT_rotationEngineStartup._THUMBS[thumbId] = {
			thumb: image,
			thumbInitial: currentThumbUrl,
			prefix: urlPrefix,
			count: thumbCount,
			ext: thumbExt,
			idx: initialIdx - 1
		};

		if (KT_rotationEngineStartup._THUMBS[thumbId]['thumb']) {
			KT_rotationEngineStartup._ROTATION_UID = new Date().getTime();
			KT_rotationEngineStartup._ROTATION_ID = thumbId;
			KT_rotationInvoke(thumbId, KT_rotationEngineStartup._ROTATION_UID);
		}
	}
}

function KT_rotationInvoke(thumbId, uid) {
	var thumbData = KT_rotationEngineStartup._THUMBS[thumbId];
	if (thumbData) {
		var thumb = thumbData['thumb'];
		var prefix = thumbData['prefix'];
		var count = thumbData['count'];
		var ext = thumbData['ext'];
		var idx = thumbData['idx'];

		idx = (idx == count ? 1 : idx + 1);
		thumbData['idx'] = idx;

		var url = prefix + idx + (ext ? ext : '.jpg');
		var img = new Image();
		img.onload = function() {
			if ((thumbId == KT_rotationEngineStartup._ROTATION_ID) && (uid == KT_rotationEngineStartup._ROTATION_UID)) {
				if (img.width == 0) {
					KT_rotationInvoke(thumbId, uid);
				}
				thumb.src = url;
				setTimeout('KT_rotationInvoke(\'' + thumbId + '\', ' + uid + ')', KT_rotationEngineStartup._ROTATION_PERIOD_MS);
			}
		};
		img.onerror = function() {
			if ((thumbId == KT_rotationEngineStartup._ROTATION_ID) && (uid == KT_rotationEngineStartup._ROTATION_UID)) {
				KT_rotationInvoke(thumbId, uid);
			}
		};
		img.src = url;
		KT_rotationEngineStartup._THUMBS[thumbId] = thumbData;
	}
}