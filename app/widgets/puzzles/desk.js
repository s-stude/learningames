define( function (require) {
    var _ = require('Underscore');
    var Backbone = require('Backbone');
    var Raphael = require('Raphael');
    var cell = require('./cell');

    return (function Desk() {

        var props = {},
            get = function (prop) {
                return props[prop];
            },

            initProps = function (overrides) {
                var
                    verticalPaddingCount = overrides.cols + 1,
                    horizontalPaddingCount = overrides.rows + 1,

                    boardWidth = overrides.cellWidth * overrides.cols + verticalPaddingCount * overrides.cellPadding,
                    boardHeight = overrides.cellHeight * overrides.rows + horizontalPaddingCount * overrides.cellPadding,

                    computed = {
                        holder:overrides.holder,

                        boardWidth:boardWidth,
                        boardHeight:boardHeight,

                        rows:overrides.rows,
                        cols:overrides.cols,

                        cellWidth:overrides.cellWidth,
                        cellHeight:overrides.cellHeight,

                        cellWidthAndPadding:overrides.cellWidth + overrides.cellPadding,
                        cellHeightAndPadding:overrides.cellHeight + overrides.cellPadding,

                        cellPadding:overrides.cellPadding
                    };

                console.log('Computed props', computed);

                for (var p in computed) {
                    props[p] = computed[p];
                }
            },

            onDragStartX,
            onDragStartY,
            isHAllowed = {},
            isVAllowed = {},

            getExtremeX = function (calculatedX) {
                var
                    minX = get('cellPadding'),
                    maxX = get('boardWidth') - get('cellWidthAndPadding');

                return Math.min(Math.max(calculatedX, minX), maxX);
            },
            getExtremeY = function (calculatedY) {
                var
                    minY = get('cellPadding'),
                    maxY = get('boardHeight') - get('cellHeightAndPadding');

                return Math.min(Math.max(calculatedY, minY), maxY);
            },

            isHorizontalMoveAllowed = function (rect) {
                var
                    cellsInRow,
                    coords = [];

                cellsInRow = _.filter(props.cells, function (icell) {
                    return icell.rect.attr('y') === rect.attr('y');
                });

                coords.push({
                    direction:'left',
                    x:getExtremeX(onDragStartX - get('cellWidthAndPadding'))
                });

                coords.push({
                    direction:'right',
                    x:getExtremeX(onDragStartX + get('cellWidthAndPadding'))
                });

                _.each(coords, function (coord) {
                    var overlappedCell = _.find(cellsInRow, function (icell) {
                        return icell.rect.attr('x') === coord.x;
                    });

                    isHAllowed[coord.direction] = overlappedCell === undefined;
                });
            },
            isVerticalMoveAllowed = function (rect) {
                var cellsInColumn, coords = [];

                cellsInColumn = _.filter(props.cells, function (icell) {
                    return icell.rect.attr('x') === rect.attr('x');
                });

                coords.push({
                    direction:'top',
                    y:getExtremeY(onDragStartY - get('cellHeightAndPadding'))
                });

                coords.push({
                    direction:'bottom',
                    y:getExtremeY(onDragStartY + get('cellHeightAndPadding'))
                });

                _.each(coords, function (coord) {
                    var overlappedCell = _.find(cellsInColumn, function (icell) {
                        return icell.rect.attr('y') === coord.y;
                    });

                    isVAllowed[coord.direction] = overlappedCell === undefined;
                });
            },

            cellDragOnMove = function (rect, dx, dy) {
                console.log('');
                var
                    movingX,
                    movingY;

                console.log('isHAllowed', isHAllowed);
                console.log('isVAllowed', isVAllowed);

                // limit horizontal move by cell width;
                // TODO: If we have one empty cell place - this will work,
                // TODO: but in case of two free cells in row we need click twice to move to the end
                console.log('pre dx: ' + dx);
                console.log('pre dy: ' + dy);
                if (Math.abs(dx) > get('cellWidth')) {
                    dx = dx > 0 ? get('cellWidth') : get('cellWidth') * -1;
                }

                if (Math.abs(dy) > get('cellHeight')) {
                    dy = dy > 0 ? get('cellHeight') : get('cellHeight') * -1;
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

                if (isMovedByX) {
                    var animatedX;

                    if (isHAllowed.left) {
                        if (rect.attr('x') > onDragStartX) {
                            animatedX = onDragStartX + get('cellWidthAndPadding');
                        } else {
                            animatedX = onDragStartX - get('cellWidthAndPadding');
                        }

                        rect.animate({ x:animatedX}, 80, "linear");
                    }

                    if (isHAllowed.right) {

                        if (rect.attr('x') > onDragStartX) {
                            animatedX = onDragStartX + get('cellWidthAndPadding');
                        } else {
                            animatedX = onDragStartX - get('cellWidthAndPadding');
                        }

                        rect.animate({ x:animatedX }, 80, "linear");
                    }
                }

                if (isMovedByY) {
                    var animatedY;
                    if (isVAllowed.top) {

                        if (rect.attr('y') > onDragStartY) {
                            animatedY = onDragStartY;
                        } else {
                            animatedY = onDragStartY - get('cellHeightAndPadding');
                        }

                        rect.animate({ y:animatedY }, 80, "linear");
                    }

                    if (isVAllowed.bottom) {

                        if (rect.attr('y') > onDragStartY) {
                            animatedY = onDragStartY + get('cellHeightAndPadding');
                        } else {
                            animatedY = onDragStartY - get('cellHeightAndPadding');
                        }

                        rect.animate({ y:animatedY}, 80, "linear");
                    }
                }

                isHAllowed = {};
                isVAllowed = {};

                console.log('isHAllowed', isHAllowed);
                console.log('isVAllowed', isVAllowed);

            },

            initCells = function () {
                var
                    cells = [],

                    columnCount = 0,
                    rowCount = 0,

                    x, y,

                    totalCount = get('rows') * get('cols') - 1;

                for (var i = 0; i < totalCount; i++) {
                    var
                        borderX = (columnCount + 1) * get('cellPadding'),
                        borderY = (rowCount + 1) * get('cellPadding');

                    x = columnCount * get('cellWidth') + borderX;
                    y = rowCount * get('cellHeight') + borderY;

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

//                var $holder = $('#' + get('holder'));
//                props.paper = Raphael(0, 0, get('boardWidth'), get('boardHeight'));
                props.paper = Raphael(get('holder'), get('boardWidth'), get('boardHeight'));

                initCells();
            },

            reset = function () {
                _.each(props.cells, function (icell) {
                    icell.rect.remove();
                });

                props.cells = [];
                initCells();
            };

        return {
            init:init,
            reset:reset,
            get:get
        };
    })();
});