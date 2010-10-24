
describe('Number', function(){

	it('should create a complex number by the Square root of a negative number', function(){
		var num = (-4).sqrt();
		expect(num.real).toEqual(0);
		expect(num.im).toEqual(2);
	});

	it('should take the real part of a complex number with Number.from', function(){
		expect(Number.from(new Complex(2, 3))).toEqual(2);
	});

});
