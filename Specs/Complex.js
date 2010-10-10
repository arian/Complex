
describe('Complex', function(){

	it('should create a complex number', function(){
		var num = new Complex(1, 2);
		expect(num.real).toEqual(1);
		expect(num.im).toEqual(2);
	});

	it('should parse a string into a complex number', function(){
		expect(new Complex('3+4i').toString()).toEqual('3+4i');
		expect(new Complex('3-4i').toString()).toEqual('3-4i');
		expect(new Complex('3+4j').toString()).toEqual('3+4i');
		expect(new Complex('5').toString()).toEqual('5+0i');
	});

	it('should add two complex numbers', function(){
		var n = new Complex(1, 2).add('4+6i');
		expect(n.toString()).toEqual('5+8i');
	});

	it('should multiply a complex number', function(){
		var n = new Complex(1, 4).multiply(3);
		expect(n.toString()).toEqual('3+12i');
	});

	it('should multiply two complex numbers', function(){
		var n = new Complex(1, 4).multiply('3+2i');
	});

	it('should take the square root of the complex number', function(){
		var n = new Complex('1+4i').sqrt();
		expect(n.toString()).toEqual('1.6004851804402407+1.2496210676876531i');
	});

	it('should calculate the magnitude of the number', function(){
		expect(new Complex(3, 4).magnitude()).toEqual(5);
	});

	it('should calculate the angle between the real and the im vectors', function(){
		expect(new Complex(1, 1).angle()).toEqual(Math.PI / 4);
		expect(new Complex(1, 0.5 * Math.sqrt(4 / 3)).angle()).toEqual(Math.PI / 6);
	});

	it('should return the conjungate', function(){
		expect(new Complex(1, 3).conjungate().toString()).toEqual('1-3i');
	})

});
