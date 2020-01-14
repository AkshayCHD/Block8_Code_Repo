export class Point {
    constructor(private x: number = 5, private y: number = 5, private z: number = 2) {
    }

    draw() {
        console.log("x axis", this.x)
        console.log("y axis", this.y)
    }
    getDistance(another : Point) {
        return Math.abs(Math.abs(another.x - this.x) - Math.abs(another.y - this.y));
    }
}
