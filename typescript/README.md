# TypeScript Tutorial

## What is TypeScript
Typescript is basically a superset of javascript i.e every valid javascript code is vaild typescript code. It just provides us with some new features and tools that are not there in mainstream javascript, which make structuring and debugging of our code very easy like
-- strong typing
-- object oriented features
-- compile time errors
-- great tooling

Our browsers do not know typescript so the applications written in typescript are needed to be transpiled into javascript.

![typescript_transpile]()

We can convert the typescript code manually also javascript code using tsc compiler, which is installed while installing typescript.
```
npm install -g typescript
tsc --version
tsc app.ts
```
and you will file a app.js file in the same directory.

## Declaring Variables

In typescript we use ```let``` instead of ```var``` because the problem with var is that it remains accessible in the scope of the entire parent function. So
```
function log() {
    for(var i = 0; i < 5; i++) {
        console.log(i);
    }
    console.log(i);
}

log();
```
In this code the value of i is accessible outside the loop, whereas if we write ```let``` then the value won't be accessible outside the loop. It would be confined to its scope.

Typescript also gives a compile time error if we assign a varialble of one type a value of another type at compile time, which is helpful in debugging.
And if the variable has no initialization value it is provided a type ```any```

```
let a = 5
a = 'a'
```
Typescript gives an error for incompatible types.
The following types are available
```
let a : number
let b : boolean
let c : string
let d : any
let e : number[]
let f : any[]
enum Colors {red, blue, green}
console.log(Colors.red)
f = [1, 'some', true]
```
Note: even if we make type incompatible assignments in typescript the code will still compile into executable javascript code as there the let variables are converted to var(in ES5).

We can assert type of a variable in typescript to use the intellisense
```
let something = (<string>message)
let nothing = (message as string)
```

## Arrow functions
They provide a shorter way to declare functions
```
var fun = function (message) {
    console.log(message);
};
var fun2 = function () {
    console.log("Without Parameters");
};
var fun3 = function () { return console.log("Without Parenthesis"); };
fun("With everything");
fun2();
fun3();
```

## Interfaces and Class
Suppose we have a function that prints the co-ordinates of a points.
```
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

```

So to avoid the above situation in typescript we use interfaces

```
interface Point {
    x : number,
    y : number
}

//Good Approach
let goodPointPrint = (point : Point) => {
    console.log("x axis ", point.x)
    console.log("y axis ", point.y)
}

// Now this function does not give any compile time error
goodPointPrint({
    x : 5,
    y : 3
})

//But if I write, typescript gives error at compile time 
goodPointPrint({
    pointSize : "Big"
}
```
So, by using interfaces in typescript helps us identify potential errors at compile time only.

Now, by the principal of cohesion, things that are co related must be a part of the same unit. So the functions such as pointPrint(), or getDistance(p1 : Point, p2 : Point) must be under the same structure. But in interfaces we cannot add functionality as interfaces are purely for declarations. So for that we use classes in typescript

```
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

// Because you would have to allocate memory to it first
// Here we get no problem
let point2 = new Point();
point2.draw();
```
Note: The object of a class must be allocated memory using new operator in order for it to access functions in the class.

## Constructors

defined using constructor keyword in typescript
```
class Point {
    x : number;
    y : number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    draw() {
        console.log("x axis", this.x)
        console.log("y axis", this.y)
    }
    getDistance(another : Point) {
        return Math.abs(Math.abs(another.x - this.x) - Math.abs(another.y - this.y));
    }
}


let point2 = new Point(5, 10);
point2.draw();
```
Here we cannot have multiple constructors, if we want to make a default constructor we can change the arguments passed to the constructor as 
```
constructor(x: number = 5, y: number = 5) {
    this.x = x;
    this.y = y;
}
```

## Access Modifiers
By default access of all variables and functions is public, we can make them private by adding private keyword as prefix.
```
class Point {
    private x : number;
    private y : number;

    constructor(x: number = 5, y: number = 5) {
        this.x = x;
        this.y = y;
    }

    private draw() {
        console.log("x axis", this.x)
        console.log("y axis", this.y)
    }
    getDistance(another : Point) {
        return Math.abs(Math.abs(another.x - this.x) - Math.abs(another.y - this.y));
    }
}
```

One important feature is that if we prefix access modifiers in the constructor then we don't need to declare those variables separately and also we don't need to assign values to them separately, the values passed to the constructor are automatically assigned to them.
```
class Point {
    constructor(public x: number = 5, public y: number = 5, public z: number = 2) {
    }

    draw() {
        console.log("x axis", this.x)
        console.log("y axis", this.y)
    }
    getDistance(another : Point) {
        return Math.abs(Math.abs(another.x - this.x) - Math.abs(another.y - this.y));
    }
}

let point = new Point()
point.draw()
let point2 = new Point(2, 5, 5);
point2.draw();

```
## Setter and Getter
```
class Point {
    constructor(private x: number = 5, private y: number = 5, private z: number = 2) {
    }

    draw() {
        console.log("x axis", this.x)
        console.log("y axis", this.y)
    }
    get X() {
        return this.x
    }

    set X(value) {
        if(value < 0) {
            throw new Error('value cannot be less than 0')
        }
        this.x = value
    }
    getDistance(another : Point) {
        return Math.abs(Math.abs(another.x - this.x) - Math.abs(another.y - this.y));
    }
}

let point = new Point()
point.X = 10;
```
## Modules

typescript does exporting and importing as we did in react
```
class Point {
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
let X = 5
export {
    Point,
    X
};

```

```
import * as ImportedPoint from './point'
let Point = ImportedPoint.Point
let point = new Point()
```

Or we can simply do
```
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

```

```
import { Point } from './point'
let point = new Point()

```
