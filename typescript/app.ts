class Point {
    x : number;
    y : number;
    draw() {
        console.log("x axis ", this.x)
        console.log("y axis ", this.y)
    }
    getDistance(another : Point) {
        return Math.abs(Math.abs(another.x - this.x) - Math.abs(another.y - this.y));
    }
}


// This give undefined method   
let point : Point;
point.draw()