let a = null

function setup() {
	container = document.getElementById('canvas-container');

	createCanvas(400, 400, document.getElementById('star-polygon-canvas'));

	let params = getURLParams();

	if (params.sides == undefined || params.step == undefined) {
		a = new StarPolygon(6, 2);
	}else {
		a = new StarPolygon(int(params.sides), int(params.step));
	}



	a.transform = [200, 200];
	a.scaler = 400;
	console.log(a);
}

function draw() {
	background("#222222");

	noFill();
	stroke("#ffffff");
	setLineDash([10, 10]);
	ellipse(200, 200, 400, 400);

}

function setLineDash(list) {
	drawingContext.setLineDash(list);
}


function resetLineDash() {
	drawingContext.setLineDash([]);
}


