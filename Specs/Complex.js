
describe('Complex', function(){

	it('should create a complex number', function(){
		var num = new Complex(1, 2);
		expect(num.real).toEqual(1);
		expect(num.im).toEqual(2);
	});

});
