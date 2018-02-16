class Line {
	
	constructor(m, b) {
		// y = m*x + b
		this.m = m; // slope or gradient
		this.b = b; // Y intercept
	}

	linearRegression(data) {
		// get average for X and for Y
		let sumX = 0;
		let sumY = 0;
		for (const point of data) {
			sumX += point.x;
			sumY += point.y;
		}
		const avgX = sumX/data.length;
		const avgY = sumY/data.length;
		
		// get slope & Y intercept
		let mNom = 0;
		let mDen = 0;
		for (const point of data) {
			const x = point.x;
			const y = point.y;
			mNom += (x - avgX)*(y - avgY);
			mDen += (x - avgX)*(x - avgX);
		}
		this.m = mNom/mDen;
		this.b = avgY - this.m*avgX;
	}

	show() {
		stroke(0, 255, 160);
		strokeWeight(2);
		
		const x1 = 0;
		const y1 = height - this.b*height;
		const x2 = width;
		const y2 = height - this.m*width - this.b*height;
		line(x1, y1, x2, y2);
	}	
}