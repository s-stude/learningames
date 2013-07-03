define('app/desk', function (require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var raphael = require('raphael');
    var cell = require('app/cell');

    return (function Desk() {

        var props = {},
        get = function (prop) {
            return props[prop];
        },

        initProps = function (overrides) {
            var
            cellWidth = overrides.width / overrides.cols,
            cellHeight = overrides.height / overrides.rows,

            computed = {
                holder:overrides.holder,

                width:overrides.width,
                height:overrides.height,

                rows:overrides.rows,
                cols:overrides.cols,

                cellWidth:cellWidth,
                cellHeight:cellHeight
            };

            for (var p in computed) {
                props[p] = computed[p];
            }
        },

        onDragStartX,
        onDragStartY,
        isHAllowed = {},
        isVAllowed = {},

        getExtremeX = function(calculatedX){
            var
                minX = 0,
                maxX = get('cols') * get('cellWidth') - get('cellWidth');

            return Math.min(Math.max(calculatedX, minX), maxX);
        },
        getExtremeY = function(calculatedY){
            var 
                minY = 0,
                maxY = get('rows') * get('cellHeight') - get('cellHeight');

            return Math.min(Math.max(calculatedY, minY), maxY);
        },

        isHorizontalMoveAllowed = function (rect) {
            var cellsInRow, coords = [];

            cellsInRow = _.filter(props.cells, function (icell) {
                return icell.rect.attr('y') === rect.attr('y'); // && icell.rect.attr('x') !== rect.attr('x');
            });

            coords.push({
                direction:'left',
                x:getExtremeX(onDragStartX - rect.attr('width'))
                //, x2:onDragStartX
            });

            coords.push({
                direction:'right',
                x:getExtremeX(onDragStartX + rect.attr('width'))
                //, x2:getExtremeX(onDragStartX + rect.attr('width') * 2)
            });

            _.each(coords, function (coord) {
                var overlappedCell = _.find(cellsInRow, function (icell) {
                    return icell.rect.attr('x') === coord.x; //&& icell.rect.attr('x') + icell.rect.attr('width') === coord.x2;
                });

                isHAllowed[coord.direction] = overlappedCell === undefined;
            });
        },
        isVerticalMoveAllowed = function (rect) {
            var cellsInColumn, coords = [];

            cellsInColumn = _.filter(props.cells, function (icell) {
                return icell.rect.attr('x') === rect.attr('x'); // && icell.rect.attr('y') !== rect.attr('y');
            });

            coords.push({
                direction:'top', 
                y:getExtremeY(onDragStartY - rect.attr('height'))
                // ,  y2:onDragStartY
            });

            coords.push({
                direction:'bottom', 
                y:getExtremeY(onDragStartY + rect.attr('height'))
                // , y2:getExtremeY(onDragStartY + rect.attr('height') * 2)
            });

            _.each(coords, function (coord) {
                var overlappedCell = _.find(cellsInColumn, function (icell) {
                    return icell.rect.attr('y') === coord.y; // && icell.rect.attr('y') + icell.rect.attr('height') === coord.y2;
                });

                isVAllowed[coord.direction] = overlappedCell === undefined;
            });
        },

        cellDragOnMove = function (rect, dx, dy) {
            console.log('');
            var
            minX = 0,
            maxX = get('cols') * get('cellWidth') - get('cellWidth'),

            minY = 0,
            maxY = get('rows') * get('cellHeight') - get('cellHeight'),

            movingX,
            movingY;

            console.log('isHAllowed', isHAllowed);
            console.log('isVAllowed', isVAllowed);

            // limit horizontal move by cell width;
            // TODO: If we have one empty cell place - this will work,
            // TODO: but in case of two free cells in row we need click twice to move to the end
            console.log('pre dx: ' + dx);
            console.log('pre dy: ' + dy);
            if (Math.abs(dx) > rect.attr('width')) {
                dx = dx > 0 ? rect.attr('width') : rect.attr('width') * -1;
            }

            //
            if (Math.abs(dy) > rect.attr('height')) {
                dy = dy > 0 ? rect.attr('height') : rect.attr('height') * -1;
            }

            console.log('dx: ' + dx);
            console.log('dy: ' + dy);

            console.log('onDragStartX', onDragStartX);
            console.log('onDragStartY', onDragStartY);

            var
            setX = function () {
                movingX = getExtremeX(onDragStartX + dx);
                console.log('movingX: ', movingX);

                rect.attr('x', movingX);
            },
            setY = function () {
                movingY = getExtremeY(onDragStartY + dy);
                console.log('movingY: ', movingY);

                rect.attr('y', movingY);
            };

            if (dx >= 0 && isHAllowed.right) {
                console.log('-- Setting X --');
                setX();
            } else if (dx < 0 && isHAllowed.left) {
                console.log('-- Setting X --');
                setX();
            }

            if (dy >= 0 && isVAllowed.bottom) {
                setY();
            } else if (dy < 0 && isVAllowed.top) {
                setY();
            }

            console.log('final x: ', rect.attr('x'));
            console.log('final y: ', rect.attr('y'));
        },


cellDragOnStart = function (rect) {
    onDragStartX = rect.attr('x');
    onDragStartY = rect.attr('y');

    isHorizontalMoveAllowed(rect);
    isVerticalMoveAllowed(rect);

    console.log('isHAllowed', isHAllowed);
    console.log('isVAllowed', isVAllowed);

},
cellDragOnEnd = function (rect) {

    var 
        isMovedByX = rect.attr('x') !== onDragStartX,
        isMovedByY = rect.attr('y') !== onDragStartY;

    if (isMovedByX){
        if(isHAllowed.left) {
            rect.animate({ x:rect.attr('x') > onDragStartX ? onDragStartX + rect.attr('width') : onDragStartX - rect.attr('width')}, 80, "linear", function () {});
        }

        if(isHAllowed.right){
            rect.animate({ x:rect.attr('x') > onDragStartX ? onDragStartX + rect.attr('width') : onDragStartX - rect.attr('width')}, 80, "linear", function () {});
        }
    }

    if(isMovedByY){
        if (isVAllowed.top) {
             rect.animate({ y: rect.attr('y') > onDragStartY ? onDragStartY : onDragStartY - rect.attr('height')}, 80, "linear", function () {});
        }

        if (isVAllowed.bottom) {
            rect.animate({ y:rect.attr('y') > onDragStartY ? onDragStartY + rect.attr('height') : onDragStartY - rect.attr('height')}, 80, "linear", function () {});
        }
    }

    isHAllowed = {};
    isVAllowed = {};

    console.log('isHAllowed', isHAllowed);
    console.log('isVAllowed', isVAllowed);
    
},

initCells = function () {
    var
    rect,
    cells = [],

    columnCount = 0,
    rowCount = 0,

    x, y,

    totalCount = get('rows') * get('cols') - 1;

    for (var i = 0; i < totalCount; i++) {
        x = columnCount * get('cellWidth');
        y = rowCount * get('cellHeight');

        var c = cell.create({
            paper:get('paper'),
            x:x,
            y:y,
            cellWidth:get('cellWidth'),
            cellHeight:get('cellHeight'),
            onStart:cellDragOnStart,
            onMove:cellDragOnMove,
            onEnd:cellDragOnEnd
        });

        cells.push(c);

        if (columnCount < get('cols')) {
            ++columnCount;
        }
        if (columnCount >= get('cols')) {
            columnCount = 0;
            ++rowCount;
        }
    }

    props.cells = cells;
},
init = function (overrides) {
    initProps(overrides);

                var $holder = $('#' + get('holder'));
                props.paper = raphael(0, 0, get('width'), get('height'));
                // props.paper = raphael(get('holder'), get('width'), get('height'));

                initCells();
            };

            return {
                init:init,
                get:get
            };
        })();
    });