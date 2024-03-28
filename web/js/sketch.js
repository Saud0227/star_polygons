let a = null;
let drawDots = [];

function setup() {
	container = document.getElementById('canvas-container');

	let sideSize = Math.min(container.offsetWidth, 600);

	createCanvas(sideSize, sideSize, document.getElementById('star-polygon-canvas'));

	let params = getURLParams();

	if (params.sides == undefined || params.step == undefined) {
		a = new StarPolygon(6, 2);
	}else {
		a = new StarPolygon(int(params.sides), int(params.step));
	}

	if (params.speed == undefined) {
		speed = 5;
	} else {
		speed = int(params.speed);
	}

	a.transform = [width/2, width/2];
	a.scaler = width/2;


	loopsPos = a.getSidesByLoopsRealPosition();


	for (let i = 0; i < loopsPos.length; i++) {
		console.log(loopsPos[i]);
		drawDots.push(new DotTrace(loopsPos[i], speed));
	}

}

function draw() {
	background("#222222");

	noFill();
	stroke("#ffffff");
	setLineDash([10, 10]);
	ellipse(width/2, width/2, width, width);
	resetLineDash();

	for (let i = 0; i < drawDots.length; i++) {
		drawDots[i].update();
		drawDots[i].draw();
	}

}

function setLineDash(list) {
	drawingContext.setLineDash(list);
}


function resetLineDash() {
	drawingContext.setLineDash([]);
}


// --------------------------------------------------------


const urlParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlParams.entries());

const sidesInput = document.getElementById('sides');
const stepInput = document.getElementById('step');
const speedInput = document.getElementById('speed');

if (params.sides) {
	sidesInput.value = params.sides;
}
if (params.step) {
	stepInput.value = params.step;
}
if (params.speed) {
	speedInput.value = params.speed;
}
