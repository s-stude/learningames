define(function (require) {

    describe("A Cell", function () {

        var cell;
        var desk;

        beforeEach(function () {
            cell = require('app/cell');
            desk = require('app/desk');

            desk.init({
                holder:'paper',
                width:300,
                height:300,
                rows:2,
                cols:2
            });
        });

        it('Is an object with property rect', function () {
            var newCell = cell.create({
                paper:desk.get('paper'),
                x:0,
                y:0,
                cellWidth:desk.get('cellWidth'),
                cellHeight:desk.get('cellHeight')
            });

            expect(newCell).toBeDefined();
        });
    });
});	