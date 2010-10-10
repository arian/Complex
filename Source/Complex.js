/*
---
description: Provides a way to use Complex Numbers in JavaScript

license: MIT-style

authors:
  - Arian Stolwijk

requires: [Core/Core, Core/Number]

provides:
  - Complex

...
*/

(function(){

var Complex = this.Complex = new Type('Complex', function(real, im){

	if (arguments.length == 1){
		var object = real;
		if (instanceOf(object, Complex)){
			real = object.real;
			im = object.im;
		}
		var type = typeOf(object);
		if (type == 'array'){
			real = object[0];
			im = object[1];
		}
		if (type == 'string'){
			var match = object.match(/(\d+)?([\+-]\d+)[ij]/);
			if (match){
				real = match[1];
				im = match[2];
			}
		}
	}

	this.real = Number.from(real);
	this.im = Number.from(im);

});

Complex.from = function(object){
	return new Complex(object);
};

Complex.fromPolar = function(r, phi){
	if (typeOf(r) == 'string'){
		var parts = r.split(' ');
		r = parts[0];
		phi = parts[1];
	}
	return new Complex(r * Math.cos(phi), r * Math.sin(phi));
};

Complex.i = new Complex(0, 1);

Complex.implement({

	magnitude: function(){
		return Math.sqrt(this.real * this.real + this.im * this.im);
	},

	angle: function(){
		return Math.atan(this.im / this.real);
	},

	conjungate: function(){
		return new Complex(this.real, -this.im);
	},

	multiply: function(number){
		number = Complex.from(number);
		var real = number.real * this.real - number.im * this.im,
		im = this.im * number.real + number.im * this.real;
		this.real = real;
		this.im = im;
		return this;
	},

	devide: function(number){
		number = Complex.from(number);
		var real = (this.real * number.real + this.im * number.im) / (Math.pow(number.real, 2) + Math.pow(number.im, 2));
		var im = (this.im * number.real - this.real*number.im) / (Math.pow(number.real, 2) + Math.pow(number.im, 2));
		this.real = real;
		this.im = im;
		return this;
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

	power: function(n){
		var r = this.magnitude(),
			phi = this.angle();
		this.real = Math.pow(r, n) * Math.cos(n * phi);
		this.im = Math.pow(r, n) * Math.sin(n * phi);
		return this;
	},

	sqrt: function(){
		return Complex.fromPolar(Math.sqrt(this.magnitude()), this.angle() / 2);
	},

	clone: function(){
		return new Complex(this.real, this.im);
	},

	toString: function(polar){
		if (polar) return this.magnitude() + ' ' + this.angle();
		return this.real + (this.im < 0 ? '-' : '+') + Math.abs(this.im) + 'i';
	}

});

})();

