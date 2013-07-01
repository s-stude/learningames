define(function(require){
	
	describe("A Desk", function() {

		var desk;

		beforeEach(function () {
			desk = require('app/desk');

			var config = {
				holder: 'paper',
				width: 300,
				height: 300,
				rows: 2,
				cols: 2
			};

			desk.init(config);
		});

		it('Has holder name when initialized', function(){
			expect(desk.get('holder')).toBe('paper');
		});

		it('Has 2 rows and 2 cols defined when initialized', function(){
			expect(desk.get('rows')).toBe(2);
			expect(desk.get('cols')).toBe(2);
		});

		it("Has (rows * cols) - 1 cells", function(){
			expect(desk.get('cells').length).toBe(3);
		});

		it('Has cells with proper coordinates', function(){
			// first cell
			expect(desk.get('cells')[0].rect.attr('x')).toBe(0);
			expect(desk.get('cells')[0].rect.attr('y')).toBe(0);

			// second cell
			expect(desk.get('cells')[1].rect.attr('x')).toBe(150);
			expect(desk.get('cells')[1].rect.attr('y')).toBe(0);

			// third cell
			expect(desk.get('cells')[2].rect.attr('x')).toBe(0);
			expect(desk.get('cells')[2].rect.attr('y')).toBe(150);
		});
	});
});	