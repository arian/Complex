
describe('Number', function(){

	it('should create a complex number by the Square root of a negative number', function(){
		var num = (-4).sqrt();
		expect(num.real).toEqual(0);
		expect(num.im).toEqual(2);
	});

	it('should take the real part of a complex number with Number.from', function(){
		expect(Number.from(new Complex(2, 3))).toEqual(2);
	});

	describe('should keep the old behaviour of Number methods', function(){

		(function(math){
			for (var test in math){
				(function(test, value){
				it('should test the ' + value.title + ' method', function(){
					var b = value.test[1];
					expect(value.test[0][test](b)).toEqual(Math[test].apply(null, value.test));
				});
				})(test, math[test]);
			}
		})({
			abs: { test: [-1], title: 'absolute' },
			acos: { test: [0], title: 'arc cosine' },
			asin: { test: [0.5], title: 'arc sine' },
			atan: { test: [0.5], title: 'arc tangent' },
			atan2: { test: [0.1, 0.5], title: 'arc tangent' },
			ceil: { test: [0.6], title: 'number closest to and not less than the' },
			cos: { test: [30], title: 'cosine' },
			exp: { test: [2], title: 'exponent' },
			floor: { test: [2.4], title: 'integer closet to and not greater than' },
			log: { test: [2], title: 'log' },
			max: { test: [5, 3], title: 'maximum' },
			min: { test: [-4, 2], title: 'minimum' },
			pow: { test: [2, 2], title: 'power' },
			sin: { test: [0.5], title: 'sine' },
			sqrt: { test: [4], title: 'square root' },
			tan: { test: [0.3], title: 'tangent' }
		});
	

	});

});
