"use strict";
exports.__esModule = true;
var Point = /** @class */ (function () {
    function Point(x, y, z) {
        if (x === void 0) { x = 5; }
        if (y === void 0) { y = 5; }
        if (z === void 0) { z = 2; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Point.prototype.draw = function () {
        console.log("x axis", this.x);
        console.log("y axis", this.y);
    };
    Point.prototype.getDistance = function (another) {
        return Math.abs(Math.abs(another.x - this.x) - Math.abs(another.y - this.y));
    };
    return Point;
}());
exports.Point = Point;
