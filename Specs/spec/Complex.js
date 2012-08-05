
define(['Complex/Complex'], function(Complex){

describe('Complex', function(){

	it('should create a complex number', function(){
		var num = new Complex(1, 2);
		expect(num.real).toEqual(1);
		expect(num.im).toEqual(2);
	});

	it('should parse a string into a complex number', function(){
		expect(Complex.from('3+4i').toString()).toEqual('3+4i');
		expect(Complex.from('3-4i').toString()).toEqual('3-4i');
		expect(Complex.from('3+4j').toString()).toEqual('3+4i');
		expect(Complex.from('5').toString()).toEqual('5');
		expect(Complex.from('1+i').toString()).toEqual('1+i');
		expect(Complex.from('i').toString()).toEqual('i');
		expect(Complex.from(1, -1).toString()).toEqual('1-i');
		expect(Complex.from(0, 0).toString()).toEqual('0');
		expect(Complex.from(0, 2).toString()).toEqual('2i');
		expect(Complex.from(0, -2).toString()).toEqual('-2i');
	});

	it('should make a number read-only with the finalize method', function(){
		var z = new Complex(1, 2).finalize();
		var w = z.add(new Complex(3, 4)); // On a new line, because z would become a new instance after the add method.
		expect(z.toString()).toEqual('1+2i');
		expect(w.toString()).toEqual('4+6i');
	});

	it('should calculate the magnitude of the number', function(){
		expect(new Complex(3, 4).magnitude()).toEqual(5);
		expect(new Complex(3, 4).abs()).toEqual(5);
	});

	it('should calculate the angle between the real and the im vectors', function(){
		expect(new Complex(1, 1).angle()).toEqual(Math.PI / 4);
		expect(new Complex(-1, -1).angle()).toEqual(-3 * Math.PI / 4);
		expect(new Complex(0, 1).angle()).toEqual(Math.PI / 2);
		expect(new Complex(1, 0.5 * Math.sqrt(4 / 3)).angle()).toEqual(Math.PI / 6);
		expect(new Complex(1, 0.5 * Math.sqrt(4 / 3)).arg()).toEqual(Math.PI / 6);
	});

	it('should return the conjugate', function(){
		expect(new Complex(1, 3).conjugate().toString()).toEqual('1-3i');
		expect(new Complex(1, 3).conj().toString()).toEqual('1-3i');
	});

	it('should negate the complex number', function(){
		expect(new Complex(-7.1, 2.5).negate().toString()).toEqual('7.1-2.5i');
	});

	it('should multiply a complex number', function(){
		expect(new Complex(1, 4).multiply(3).toString()).toEqual('3+12i');
		expect(new Complex(1, 4).mult(3).toString()).toEqual('3+12i');
	});

	it('should multiply two complex numbers', function(){
		var n = new Complex(1, 4).multiply('3+2i').toString();
		expect(n).toEqual('-5+14i');
	});

	it('should divide a complex number by a real number', function(){
		expect(Complex.from('4+16i').divide(4) + '').toEqual('1+4i');
		expect(Complex.from('4+16i').dev(4) + '').toEqual('1+4i');
	});

	it('should divide a complex number by another number', function(){
		expect(Complex.from('2+8i').divide(new Complex(1, 2)) + '').toEqual('3.6+0.8i');
	});

	it('should add two complex numbers', function(){
		var n = new Complex(1, 2).add('4+6i');
		expect(n.toString()).toEqual('5+8i');
	});

	it('should subtract two complex numbers', function(){
		var n = new Complex(5, 8);
		expect(n.clone().subtract('4+6i').toString()).toEqual('1+2i');
		expect(n.clone().sub('4+6i').toString()).toEqual('1+2i');
	});

	it('should z^n, where z is complex and n is real', function(){
		expect(new Complex(1, 2).pow(2).toPrecision(1) + '').toEqual('-3+4i');
	});

	it('should z^w, where z and w are complex', function(){
		var n = new Complex(1, 2).pow(new Complex(3, 4)).toPrecision(10).toString();
		expect(n).toEqual('0.1290095941+0.03392409291i');
	});

	it('should take the square root of the complex number', function(){
		var z = Complex.from('1+4i').sqrt().toPrecision(10).toString();
		expect(z).toEqual('1.600485180+1.249621068i');
	});


	it('should take the square root of the complex number with a negative real part', function(){
		var z = new Complex(-3, 4).sqrt().toString();
		expect(z).toEqual('1+2i');
	});

	it('should take the square root of a complex number with a negative imaginary part', function(){
		var z = new Complex(3, -4).sqrt().toString();
		expect(z).toEqual('2-i');
	});

	it('should take the square root of a complex number with both negative real and imaginary parts', function(){
		var z = new Complex(-3, -4).sqrt().toString();
		expect(z).toEqual('1-2i');
	});

	it('it should take the natural logarithm', function(){
		var z = Complex.from('4+3i').log().toPrecision(10).toString();
		expect(z).toEqual('1.609437912+0.6435011088i');
	});

	it('should take the natural logartithm with the second multiplicity', function(){
		var n = Complex.from(Math.pow(Math.E, 2)).log(2);
		expect(n.real).toEqual(2);
		expect(n.im).toEqual(4 * Math.PI);
	});

	it('it should return the exponential', function(){
		var z = Complex.from('4+3i').exp().toPrecision(10).toString();
		expect(z).toEqual('-54.05175886+7.704891373i');
	});

	it('should return the sine of the complex number', function(){
		var z = new Complex(1, 2).sin().toPrecision(10).toString();
		expect(z).toEqual('3.165778513+1.959601041i');
	});

	it('should return the cosine of the complex number', function(){
		var z = new Complex(1, 2).cos().toPrecision(10).toString();
		expect(z).toEqual('2.032723007-3.051897799i');
	});

	it('should return the tangent of the complex number', function(){
		var z = new Complex(1, 2).tan().toPrecision(10).toString();
		expect(z).toEqual('0.03381282608+1.014793616i');
	});

	it('should return the hyperbolic sine of the complex number', function(){
		var z = new Complex(1, 2).sinh().toPrecision(10).toString();
		expect(z).toEqual('-0.4890562590+1.403119251i');
	});

	it('should return the cosine of the complex number', function(){
		var z = new Complex(1, 2).cosh().toPrecision(10).toString();
		expect(z).toEqual('-0.6421481247+1.068607421i');
	});

	it('should return the tangent of the complex number', function(){
		var z = new Complex(1, 2).tanh().toPrecision(10).toString();
		expect(z).toEqual('1.166736257-0.2434582012i');
	});

	it('should test the equals method', function(){
		expect(new Complex(2, 3).equals(new Complex(2, 3))).toBeTruthy();
		expect(new Complex(2, 3).equals(new Complex(2, 4))).toBeFalsy();
		expect(new Complex(2, 3).equals(new Complex(1, 3))).toBeFalsy();
	});

});

});
