Complex
=======

Complex is a additional Type to deal with Complex Numbers in JavaScript. It provides several methods to add, multiply numbers as well as
calculate the magnitude and angle in the complex plane.

![Screenshot](https://github.com/arian/Complex/raw/master/wiki-complex.png)

How To Use
----------

Complex uses the [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) format. You could use any compatible AMD loader, either on Node.js or in the browser to use this Complex module. I'd recommend [Require.JS](http://requirejs.org/)

NPM / CPM
---------

You can get this package through NPM or [CPM](http://packages.dojofoundation.org):

    npm install Complex
	
or 

	cpm install Complex


API Documentation
-----------------

### Complex constructor:

	var z = new Complex(real im);

#### Arguments:

1. real (number) the real part of the number
2. im (number) the imaginary part of the number


### Function: Complex.from

A in line function like Number.from.

	var z = Complex.from(real[, im]);

#### Arguments:

1. real (number) the real part of the number
2. im (number, *optional*) the imaginary part of the number

Or

1. real (string) a string representation of the number, for example `1+4i`

#### Examples:

	var z = Complex.from(2, 4);
	var z = Complex.from(5);
	var z = Complex.from('2+5i');


### Function: Complex.fromPolar

Creates a complex instance from a polar representation: `r*e^(phi*i) = r (cos(phi) + i sin(phi))`

	var z = Complex.fromPolar(r, phi);

#### Arguments:

1. r (number) the radius/magnitude of the number
2. phi (number) the angle/phase of the number


### Constant: Complex.i

A instance of the imaginary unit `i`

	var i = Complex.i;


### Constant: Complex.one

A instance for the real number `1`

	var one = Complex.one;


### Method: fromRect

Sets the real and imaginary properties a and b from `a + bi`

	myComplex.fromRect(real, im);

#### Arguments:

1. real (number) the real part of the number
2. im (number) the imaginary part of the number


### Method: fromPolar

Sets the a and b in `a + bi` from a polar representation.

	myComplex.fromPolar(r, phi);

#### Arguments:

1. r (number) the radius/magnitude of the number
2. phi (number) the angle/phase of the number


### Method: toPrecision

Sets the precision of the numbers. Similar to Number.prototype.toPrecision. Useful befor printing the number with the toString method.

	myComplex.toPrecision(k);

#### Arguments:

1. k (number) An integer specifying the number of significant digits


### Method: toFixed

Formats a number using fixed-point notation. Similar to Number.prototype.toFixed. Useful before printing the number with the toString method.

	myComplex.toFixed(k);

#### Arguments:

1. k (number) The number of digits to appear after the decimal point; this may be a value between 0 and 20, inclusive, and implementations may optionally support a larger range of values. If this argument is omitted, it is treated as 0


### Method: finalize

Finalizes the instance. The number will not change and any other method call will return a new instance.
Very useful when a complex instance should stay constant. For example the Complex.i variable is a finalized instance.

	myComplex.finalize();


### Method: magnitude

Calculates the magnitude of the complex number

	myComplex.maginude();

#### Alias:

- abs


### Method: angle

Calculates the angle with the real axis.

	myComplex.angle();

#### Aliases

- arg
- phase


### Method: conjungate

Calculates the conjungate of the complex number (multiplies the imaginary part with -1)

	myComplex.conjungate();


### Method: negate

Negates the number (multiplies both the real and imaginary part with -1)

	myComplex.negate();


### Method: multiply

Multiplies the number with a real or complex number

	myComplex.multiply(z);

#### Arguments:

1. z (number, complex) the number to multiply with

#### Alias:

- mult


### Method: devide

Devides the number by a real or complex number

	myComplex.devide(z);

#### Arguments:

1. z (number, complex) the number to divide by

#### Alias:

- div


### Method: add

Adds a real or complex number

	myComplex.add(z);

#### Arguments:

1. z (number, complex) the number to add


### Method: subtract

Subtracts a real or complex number

	myComplex.subtract(z);

#### Arguments:

1. z (number, complex) the number to subtract

#### Alias:

- sub


### Method: pow

Returns the base to the exponent

	myComplex.pow(z);

#### Arguments:

1. z (number, complex) the exponent


### Method: sqrt

Returns the square root

	myComplex.sqrt();


### Method: log

Returns the natural logarithm (base `E`)

	myComplex.log([k]);

#### Arguments:

1. k (number) the actual answer has a multiplicity (`ln(z) = ln|z| + arg(z)`) where arg(z) can return the same for different angles (every 2*pi), with this argument you can define which answer is required


### Method: exp

Calculates the `e^z` where the base is `E` and the exponential the complex number.

	myComplex.exp();


### Method: sin

Calculates the sine of the complex number

	myComplex.sin();


### Method: cos

Calculates the cosine of the complex number

	myComplex.cos();


### Method: tan

Calculates the tangent of the complex number

	myComplex.tan();


### Method: sinh

Calculates the hyperbolic sine of the complex number

	myComplex.sinh();


### Method: cosh

Calculates the hyperbolic cosine of the complex number

	myComplex.cosh();


### Method: tanh

Calculates the hyperbolic tangent of the complex number

	myComplex.tanh();


### Method: clone

Returns a new Complex instance with the same real and imaginary properties

	myComplex.clone();


### Method: toString

Returns a string representation of the complex number

	myComplex.toString();


#### Examples:

	new Complex(1, 2).toString(); // 1+2i
	new Complex(0, 1).toString(); // i
	new Complex(4, 0).toString(); // 4
	new Complex(1, 1).toString(); // 1+i
	'my Complex Number is: ' + (new Complex(3, 5)); // 'my Complex Number is: 3+5i


### Method: Equals

Checks if the real and imaginary components are equal to the passed in compelex components.

	myComplex.equals(z);

### Arguments:

1. z (number, complex) the complex number to compare with

### Examples:

	new Complex(1, 4).equals(new Complex(1, 4)); // true
	new Complex(1, 3).equals(new Complex(1, 3)); // false
