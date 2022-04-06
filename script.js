tracking.ColorTracker.registerColor('black', function (r, g, b) {
	if (r == 0 && g == 0 && b == 0) {
		return true;
	}
	return false;
});
tracking.ColorTracker.registerColor('white', function (r, g, b) {
	if (r > 200 && g > 200 && b > 200) {
		return true;
	}
	return false;
});
// tracking.ColorTracker.registerColor('green', function (r, g, b) {
// 	if (r < 50 && g > 200 && b < 50) {
// 		return true;
// 	}
// 	return false;
// });

let colors = new tracking.ColorTracker(['black']);
colors.setMinDimension(5);

let pX;
let pY;
let rH;
let rW;
let color;
colors.on('track', function (event) {
	if (event.data.length === 0) {
		// No colors were detected in this frame.
		pX = null;
		pY = null;
		rH = null;
		rW = null;
		color = null;
	} else {
		event.data.forEach(function (rect) {
			pX = rect.x;
			pY = rect.y;
			rH = rect.height;
			rW = rect.width;
			color = rect.color;

			if (rect.color === 'custom') {
				rect.color = tracker.customColor;
			}

			//ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

			// let imageData = ctx.getImageData(
			// 	rect.x,
			// 	rect.y,
			// 	rect.width,
			// 	rect.height
			// );
			// let data = imageData.data;
		});
	}
});

setInterval(() => {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	let video = document.querySelector('.video');
	ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
	//ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
	ctx.font = '11px Helvetica';
	let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imageData.data;
	let index = 0;
	let index2 = 0;
	let posX = 0;
	let posY = 0;
	var canvas2 = document.getElementById('canvas2');
	var ctx2 = canvas2.getContext('2d');
	ctx2.strokeStyle = 'black';
	ctx2.clearRect(0, 0, canvas.width, canvas.height);
	data.forEach((d) => {
		if (index == 4) {
			index = 0;
			index2++;
			if (posX == canvas.width) {
				if (posX == canvas.width && posY == canvas.height) {
					ctx2.clearRect(0, 0, canvas.width, canvas.height);
				}
				if (d <= 40) {
					ctx2.strokeRect(posX, posY, 1, 1);
				}
				posY++;
				posX = 0;
			}
			if (d <= 40) {
				ctx2.strokeRect(posX, posY, 1, 1);
			}
			posX++;
		}
		index++;
	});
}, 10);

tracking.track('.video', colors);
