let data = [];
let medianLine;

let watchMode = false;
let textCashe = '';
let scaleX = 1;
let scaleY = 1;
let message = '';

function setup() {
	createCanvas(720, 720).parent('animation');
	medianLine = new Line(1, 0);
}

function mousePressed() {
	if (!watchMode && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
		const x = mouseX / width;
		const y = (height - mouseY) / height;
		const point = createVector(x,y);
		data.push(point);
	}	
}

function keyPressed() {
	if (keyCode == 87 & data.length > 1) { // W key
		watchMode = !watchMode;
	} else if (keyIsDown(88)) { // X key
		if (key >= 0 & key <= 9 & textCashe.length < 7) {
			textCashe += key;
		}
		message = `new X scale: ${textCashe}`;
	} else if (keyIsDown(89)) { // Y key
		if (key >= 0 & key <= 9 & textCashe.length < 7) {
			textCashe += key;
		}
		message = `new Y scale: ${textCashe}`;
	} else if (keyCode == 82) { // R key
		data = [];
		watchMode = false;
	}
}

function keyReleased() {
	function resetCashe() {
		textCashe = '';
		message = '';
	}
	// change X or Y axis value
	if (keyCode == 88) { // X key
		scaleX = parseInt(textCashe) || 1;
		resetCashe();
	} else if (keyCode == 89) { // Y key
		scaleY = parseInt(textCashe) || 1;
		resetCashe();
	}
}

function drawGraph() {
	if (data.length > 1) {
		// show median line
		medianLine.linearRegression(data);
		medianLine.show();
	} else {
		// show start message
		push();
		noStroke();
		fill(100);
		textSize(32);
		text("[At least 2 points are required]\n\nHold 'H' for help.", width/2, height/2);
		pop();
	}
	// show data points
	stroke(255);
	strokeWeight(4);
	for (let i in data) {
		point(data[i].x*width, height-data[i].y*height);
	}
}

function trackMedian() {
	if (mouseX >= 0 & mouseX <= width) {
		stroke(169);
		strokeWeight(1);
		const intsctn = createVector(mouseX, height-medianLine.m*mouseX-medianLine.b*height);
		line(0, intsctn.y, intsctn.x, intsctn.y);
		line(mouseX, height, intsctn.x, intsctn.y);
		stroke(255);
		strokeWeight(4);
		point(intsctn.x, intsctn.y);
	
		textSize(12);
		strokeWeight(0);
		rectMode(CENTER);
		textAlign(CENTER);
		fill(169);
		const x = intsctn.x / width * scaleX;
		const y = (1 - intsctn.y / height) * scaleY;
		const intsctnText = `x: ${nf(x, 1, 2)} y: ${nf(y, 1, 2)}`;
		text(intsctnText, width/2, 15);
	}
}

function showMouseLocation() {
	if (mouseX >= 0 & mouseX <= width & mouseY >=0 & mouseY <= height) {
		textSize(12);
		strokeWeight(0);
		rectMode(CENTER);
		textAlign(CENTER);
		fill(169);
		const x = mouseX / width * scaleX;
		const y = (1 - mouseY / height) * scaleY;
		const locationText = `x: ${nf(x, 1, 2)} y: ${nf(y, 1, 2)}`;
		text(locationText, width/2, height-15);
	}
}

function showMessage(txt) {
	textSize(32);
	stroke(255);
	strokeWeight(1);
	fill(51);
	rectMode(CENTER);
	textAlign(CENTER);
	rect(width/2, height/2-10, 350, 80);
	fill(255);
	text(txt, width/2, height/2);
}

function showHelp() {
	const helpLines = `Hold 'X' to change X-axis scale.
	Hold 'Y' to change Y-axis scale.\n
	Press 'W' to switch into 'watch mode'.
	Press 'R' to reset ALL points.\n
	Hold 'H' for help (this window).`;
	
	const border = 1;
	const sizeX = 600;
	const sizeY = 280;

	push();
	rectMode(CENTER);
	stroke(255);
	strokeWeight(border);
	noFill();

	rect(width/2, height/2, sizeX, sizeY+50);
	
	textSize(32);
	textAlign(CENTER);
	fill(190);
	text(helpLines, width/2, height/2, sizeX, sizeY);
	pop();
}

function draw() {
	background(51);
	if (keyIsDown(72)) { // H key
		showHelp();
	} else {
		drawGraph();
		if (watchMode) {
			trackMedian();
		} else {
			showMouseLocation();
		}
		if (message) {
			showMessage(message);
		}
	}
}