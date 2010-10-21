/*
---
description: Provides a way to use Complex Numbers in JavaScript

license: MIT-style

authors:
  - Arian Stolwijk

requires: [Core/Number, Complex]

provides:
  - Number

...
*/

Number.precision = 1e-6;

(function(){

var methods = {};
['multiply', 'devide', 'add', 'substract', 'pow', 'sqrt', 'log', 'exp'].each(function(method){
	methods[method] = function(number){
		var ret = Complex.from(this)[method](number);
		if (ret.im == 0) return ret.real;
		return ret;
	};
});

methods.toComplex = function(){
	return Complex.from(this);
};

Number.implement(methods);

})();

// Replace sqrt method so it can handle negative values
(function(sqrt){

Number.prototype.sqrt = function(){
	if (this < 0) return new Complex(0, Math.sqrt(-this));
	return sqrt.apply(this);
};

})(Number.prototype.sqrt);

