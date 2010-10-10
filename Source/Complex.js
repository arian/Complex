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
			if (object == 'i') object = '0+1i';
			var match = object.match(/(\d+)?([\+-]\d*)[ij]/);
			if (match){
				real = match[1];
				im = (match[2] == '+' || match[2] == '-') ? match[2] + '1' : match[2];
			}
		}
	}

	this.real = Number.from(real);
	this.im = Number.from(im);

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
		return new Complex(this.real, -this.im);
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

	log: function(){
		return this.fromRect(
			Math.log(this.magnitude()),
			this.angle()
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
		if (!this.real == 0) ret += this.real;
		if (!this.im == 0){
			ret += this.im < 0 ? '-' : '+';
			var absIm = Math.abs(this.im);
			if (absIm != 1) ret += absIm;
			ret += 'i';
		}
		return ret || '0';
	}

});


Complex.from = function(a, b){
	if (arguments.length == 1) return new Complex(a);
	return new Complex(a, b);
};

Complex.fromPolar = function(r, phi){
	return new Complex(1, 1).fromPolar(r, phi);
};

Complex.i = new Complex(0, 1);


})();

