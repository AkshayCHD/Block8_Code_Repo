

// Bad Approach
var pointPrint = function (x, y) {
    console.log("x axis ", x);
    console.log("y axis ", y);
};
//Good Approach
var goodPointPrint = function (point) {
    console.log("x axis ", point.x);
    console.log("y axis ", point.y);
};
pointPrint(5, 3);
goodPointPrint({
    x: 5,
    y: 3
});
//But if I write 
goodPointPrint({
    pointSize: "Big"
});
//Then the code might break or deliver unwanted results at run time
