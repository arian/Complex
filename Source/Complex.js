/*
---
name: Complex
description: Provides a way to use Complex Numbers in JavaScript

license: MIT-style
author: Arian Stolwijk

requires: [Core/Core, Core/Number]
provides: Complex

...
*/

(function(){

var Complex = this.Complex = new Type('Complex', function(real, im){

	var type = typeOf(real),
		args = [real, im];

	if (type == 'complex') args = [real.real, real.im];
	else if (type == 'string'){
		if (real == 'i') real = '0+1i';
		var match = real.match(/(\d+)?([\+-]\d*)[ij]/);
		if (match) args = [match[1], (match[2] == '+' || match[2] == '-') ? match[2] + '1' : match[2]];
	}

	this.real = Number.from(args[0]);
	this.im = Number.from(args[1]);

}).mirror(function(name){
	var dontMirror = ['toString', 'fromPolar', 'fromRect', 'toPrecision', 'toFixed'];
	if (dontMirror.indexOf(name) != -1) Number.implement(name, function(number){
		var ret = new Complex(this, 0)[name](number);
		return (ret.im == 0) ? ret.real : ret;
	});
}).implement({

	fromPolar: function(r, phi){
		if (typeOf(r) == 'string'){
			var parts = r.split(' ');
			r = parts[0];
			phi = parts[1];
		}
		this.real = r * Math.cos(phi);
		this.im = r * Math.sin(phi);
		return this;
	},

	fromRect: function(a, b){
		this.real = a;
		this.im = b;
		return this;
	},

	toPrecision: function(k){
		return this.fromRect(
			this.real.toPrecision(k),
			this.im.toPrecision(k)
		);
	},

	toFixed: function(k){
		return this.fromRect(
			this.real.toFixed(k),
			this.im.toFixed(k)
		);
	},

	magnitude: function(){
		return Math.sqrt(this.real * this.real + this.im * this.im);
	},

	angle: function(){
		return Math.atan(this.im / this.real);
	},

	conjungate: function(){
		this.im = -this.im;
		return this;
	},

	multiply: function(number){
		number = Complex.from(number);
		return this.fromRect(
			number.real * this.real - number.im * this.im,
			this.im * number.real + number.im * this.real
		);
	},

	devide: function(number){
		number = Complex.from(number);
		var devider = (Math.pow(number.real, 2) + Math.pow(number.im, 2));
		return this.fromRect(
			(this.real * number.real + this.im * number.im) / devider,
			(this.im * number.real - this.real * number.im) / devider
		);
	},

	add: function(number){
		number = Complex.from(number);
		this.real += number.real;
		this.im += number.im;
		return this;
	},

	substract: function(number){
		this.add(Complex.from(number).multiply(-1));
		return this;
	},

	pow: function(n){
		n = Complex.from(n);
		var result = n.multiply(this.clone().log()).exp(); // z^w = e^(w*log(z))
		return this.fromRect(result.real, result.im);
	},

	sqrt: function(){
		return this.fromPolar(
			Math.sqrt(this.magnitude()),
			this.angle() / 2
		);
	},

	log: function(n){
		if (!n) n = 0;
		return this.fromRect(
			Math.log(this.magnitude()),
			this.angle() + n * 2 * Math.PI
		);
	},

	exp: function(){
		return new Complex.fromPolar(
			Math.exp(this.real),
			this.im
		);
	},

	clone: function(){
		return new Complex(this.real, this.im);
	},

	toString: function(polar){
		if (polar) return this.magnitude() + ' ' + this.angle();

		var ret = '';
		if (this.real) ret += this.real;
		if (this.real && this.im || this.im < 0) ret += this.im < 0 ? '-' : '+';
		if (this.im){
			var absIm = Math.abs(this.im);
			if (absIm != 1) ret += absIm;
			ret += 'i';
		}
		return ret || '0';
	}

}).alias({
	abs: 'magnitude',
	arg: 'angle',
	conj: 'conjungate',
	mult: 'multiply',
	dev: 'devide',
	sub: 'substract'
});


Complex.from = function(a, b){
	return new Complex(a, b);
};

Complex.fromPolar = function(r, phi){
	return new Complex(1, 1).fromPolar(r, phi);
};

Complex.i = new Complex(0, 1);


var sqrt = Number.prototype.sqrt;
Number.implement({
	toComplex: function(){
		return new Complex(this, 0);
	},
	// Replace sqrt method so it can handle negative values
	sqrt: function(){
		if (this < 0) return new Complex(0, Math.sqrt(-this));
		return sqrt.call(this);
	}
});



// Overwrite Number from to get the real part of complex numbers
var from = Number.from;
Number.from = function(number){
	return (instanceOf(number, Complex)) ? number.real : from(number);
};

// Implement a toComplex function for strings
String.implement('toComplex', function(){
	return new Complex(this);
});

})();

