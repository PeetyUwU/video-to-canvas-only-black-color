var video = document.querySelector('.video'),
	juice = document.querySelector('.orange-juice'),
	btn = document.getElementById('play-pause'),
	time = document.getElementById('time'),
	cVideo = document.querySelector('.c-video');
btn.setAttribute('data-after-play', 'Play');

let timeout;
function mouseMove() {
	clearTimeout(timeout);
	if (video.paused) return;
	cVideo.classList.remove('hide');
	timeout = setTimeout(() => {
		if (video.paused) cVideo.classList.remove('hide');
		else {
			cVideo.classList.add('hide');
		}
	}, 3000);
}

(async function () {
	//! blob url
	const result = await fetch('http://127.0.0.1:5500/anime.mp4');
	const blob = await result.blob();
	const objUrl = URL.createObjectURL(blob);
	video.src = objUrl;

	if (video.paused) {
		btn.classList.remove('play');
		btn.classList.add('pause');
		btn.setAttribute('data-after-play', 'Pause');
		setTimeout(() => {
			document.querySelector('.c-video').classList.add('hide');
		}, 3000);
	} else {
		btn.classList.remove('pause');
		btn.classList.add('play');
		btn.setAttribute('data-after-play', 'Play');
		setTimeout(() => {
			document.querySelector('.c-video').classList.add('hide');
		}, 3000);
	}
})();

document.addEventListener('keydown', (k) => {
	if (k.key == ' ' || k.code == 'Spacebar') {
		togglePlayPause();
	}
});

let videoReady = setInterval(() => {
	if (video.readyState == 4) {
		time.max = video.duration;
		clearInterval(videoReady);
	}
}, 500);

function togglePlayPause() {
	if (video.paused) {
		btn.classList.remove('play');
		btn.classList.add('pause');
		btn.setAttribute('data-after-play', 'Pause');
		setTimeout(() => {
			document.querySelector('.c-video').classList.add('hide');
		}, 2000);
		video.play();
	} else {
		btn.classList.remove('pause');
		btn.classList.add('play');
		btn.setAttribute('data-after-play', 'Play');
		document.querySelector('.c-video').classList.remove('hide');
		clearTimeout(timeout);
		video.pause();
	}
	hideMenu();
}

video.addEventListener('timeupdate', () => {
	console.log(video.readyState);
	let juicePos = Math.floor(video.currentTime) / video.duration;
	juice.style.width = juicePos * 100 + '%';
	time.value = Math.floor(video.currentTime);
	let minutes = Math.floor(video.currentTime / 60);
	let seconds = Math.floor(video.currentTime) - minutes * 60;
	let maxMinutes = Math.floor(video.duration / 60);
	let maxSeconds = Math.floor(video.duration) - maxMinutes * 60;
	if (seconds < 10) seconds = `0${seconds}`;
	if (minutes < 10) minutes = `0${minutes}`;
	if (maxSeconds < 10) maxSeconds = `0${maxSeconds}`;
	if (maxMinutes < 10) maxMinutes = `0${maxMinutes}`;
	document.getElementById(
		'timeTxt'
	).innerText = `${minutes}:${seconds} / ${maxMinutes}:${maxSeconds}`;
	if (video.ended) {
		let loop = document.getElementById('loop');
		if (loop.checked == true) {
			video.play();
		} else {
			btn.className = 'play';
		}
	}
});

// video.addEventListener(
// 	'contextmenu',
// 	(e) => {
// 		e.preventDefault();

// 		var menu = document.querySelector('.contextMenu');

// 		if (menu.style.display == 'block') {
// 			hideMenu();
// 		} else {
// 			menu.style.display = 'block';
// 			menu.style.left = e.pageX + 'px';
// 			menu.style.top = e.pageY + 'px';
// 		}
// 	},
// 	false
// );

// function hideMenu() {
// 	document.querySelector('.contextMenu').style.display = 'none';
// }

let contextMenu = document.getElementById('contextMenu');
document.addEventListener('click', (e) => {
	if (contextMenu !== e.target && !contextMenu.contains(e.target)) {
		contextMenu.style.display = 'none';
	}
});
video.oncontextmenu = rightClick;

function hideMenu() {
	document.getElementById('contextMenu').style.display = 'none';
}

function rightClick(e) {
	e.preventDefault();
	var menu = document.getElementById('contextMenu');
	menu.style.display = 'block';
	menu.style.left = `${e.pageX}px`;
	menu.style.top = `${e.pageY}px`;
}

function changeValue(vol) {
	document.getElementById('volume-bar').style.width = `${vol.value}px`;
	video.volume = vol.value / 100;
}
let videoPaused = 0;

function checkPaused() {
	if (video.paused) {
		videoPaused = 1;
	} else {
		videoPaused = 0;
	}
	video.pause();
}
function changeTime() {
	video.currentTime = document.getElementById('time').value;
	btn.className = 'play';
	let juicePos = document.getElementById('time').value / video.duration;
	juice.style.width = juicePos * 100 + '%';
}
function playVid() {
	if (videoPaused == 1) {
		return;
	}
	video.play();
	btn.className = 'pause';
}
