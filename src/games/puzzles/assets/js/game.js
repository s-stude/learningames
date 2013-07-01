
(function (Raphael) {
    Raphael.fn.rgbRand = function () {
        var m = 255;
        return 'rgb(' + Math.random() * m + ', ' + Math.random() * m + ', ' + Math.random() * m + ')';
    };
})(Raphael);

function between(val, start, end) {
    return start < val && val < end;
}

function betweenInc(val, start, end) {
    return start <= val && val <= end;
}

var
    i = 0,

    h = 0,
    v = -1,

    x, y,

    width = height = 300,

    countPerHorizontal = 2,
    countPerVertical = 2,
    countOfEmptySectors = 1,
    totalCountOfPieces = countPerHorizontal * countPerVertical - countOfEmptySectors,

    widthOfPiece = width / countPerHorizontal,
    heightOfPiece = height / countPerVertical,

    sectors = [],

    paper = Raphael("paper", width, height);

for (; i < totalCountOfPieces; i++) {

    h = i % countPerHorizontal;

    if (h === 0) {
        v++;
    }

    x = h * widthOfPiece;
    y = v * heightOfPiece;

    var rgbRand = paper.rgbRand();

    var rec = paper.rect(x, y, widthOfPiece, heightOfPiece, 5)
        .attr({
            "fill":rgbRand,
            "fill-opacity":1,
            "stroke":rgbRand,
            "stroke-opacity":0.7
        });

    sectors.push(rec);

    handleDrag(rec);
}

function handleDrag(rec) {
    var
        onDragStartX,
        onDragStartY,

        startX = rec.attr('x'),
        startY = rec.attr('y'),

        minX = startX > 0 ? startX - widthOfPiece : startX, // min can move to one width to the left
        maxX = widthOfPiece, // max can move one width to the right

        minY = startY > 0 ? startY - heightOfPiece : startY,
        maxY = heightOfPiece,

        previousMovingX = 0,
        previousMovingY = 0,

        isNewPositionEmpty = function (movingX, movingY) {
            var result = _.find(sectors, function (rect) {
                var rectX = rect.attr('x');
                var rectY = rect.attr('y');

                return rectX === maxX && rectY === movingY;
            });

            return result === undefined;
        },
        isHorizontalMoveAllowed = function (movingX) {

            var anyHorizontalSector = _.find(sectors, function (irect) {
                if (irect.attr('y') !== onDragStartY) {
                    return;
                }
                ;

                // DBG
                console.log('onDragStartX: ' + onDragStartX);
                console.log('movingX: ' + movingX);
                console.log('previousMovingX: ' + previousMovingX);

                if (movingX > previousMovingX) { // move to right
                    var endXOfSector = movingX + widthOfPiece;

                    if (irect.attr('x') < endXOfSector && endXOfSector <= irect.attr('x') + widthOfPiece) {
                        return irect;
                    }

                } else { // move to left
                    var startXOfSector = onDragStartX - widthOfPiece;

                    console.log('startXOfSector: ' + startXOfSector);

                    if (irect.attr('x') <= movingX && movingX < irect.attr('x') + widthOfPiece) {
                        return irect;
                    }
                }
            });

            // DBG
            anyHorizontalSector && console.log(anyHorizontalSector.attr(['x', 'y']));

            return anyHorizontalSector === undefined;
        },
        isVerticalMoveAllowed = function (movingY) {
            var anyVerticalSector = _.find(sectors, function (irect) {
                if (irect.attr('x') !== onDragStartX) {
                    return;
                }

                if (movingY > previousMovingY) { // move to bottom
                    var endYOfSector = movingY + heightOfPiece;
                    if (irect.attr('y') < endYOfSector && endYOfSector <= irect.attr('y') + heightOfPiece) {
                        return irect;
                    }
                } else { // move to top
                    var startYOfSector = onDragStartY - heightOfPiece;
                    if (irect.attr('y') <= movingY && movingY < irect.attr('y') + heightOfPiece) {
                        return irect;
                    }
                }
            });

            anyVerticalSector && console.log(anyVerticalSector.attr(['x', 'y']));
            return anyVerticalSector === undefined;
        },
        onMove = function (dx, dy) {
            var movingX, movingY;

            movingX = Math.min(Math.max(onDragStartX + dx, minX), maxX);
            movingY = Math.min(Math.max(onDragStartY + dy, minY), maxY);

            console.log(isHorizontalMoveAllowed(movingX));

            var isHorizontalOK = isHorizontalMoveAllowed(movingX);
            var isVerticalOK = isVerticalMoveAllowed(movingY);

            if (isHorizontalOK) {
                this.attr('x', movingX);
                previousMovingX = movingX;
            }
            if (isVerticalOK) {
                this.attr('y', movingY);
                previousMovingY = movingY;
            }
        },
        onStart = function () {
            onDragStartX = this.attr('x');
            onDragStartY = this.attr('y');
        },
        onEnd = function () {
            if(onDragStartX === this.attr('x') && onDragStartY === this.attr('y')){
                return;
            }

            var isAfterCenterX = this.attr('x') >= widthOfPiece / 2;
            var isAfterCenterY = this.attr('y') >= heightOfPiece / 2;

            if (isAfterCenterX) {
                this.animate({ x:this.attr('x') > onDragStartX ? onDragStartX + widthOfPiece : onDragStartX - widthOfPiece}, 80, "linear", function () {
                    previousMovingX = this.attr('x') > onDragStartX ? onDragStartX + widthOfPiece : onDragStartX - widthOfPiece;
                });
            } else {
                this.animate({ x: this.attr('x') > onDragStartX ? onDragStartX : onDragStartX - widthOfPiece}, 80, "linear", function () {
                    previousMovingX = this.attr('x') > onDragStartX ? onDragStartX : onDragStartX - widthOfPiece;
                });
            }

            if(isAfterCenterY){
                this.animate({ y:this.attr('y') > onDragStartY ? onDragStartY + heightOfPiece : onDragStartY - heightOfPiece}, 80, "linear", function () {
                    previousMovingY = this.attr('y') > onDragStartY ? onDragStartY + heightOfPiece : onDragStartY - heightOfPiece;
                });
            } else {
                this.animate({ y: this.attr('y') > onDragStartY ? onDragStartY : onDragStartY - heightOfPiece}, 80, "linear", function () {
                    previousMovingY = this.attr('y') > onDragStartY ? onDragStartY : onDragStartY - heightOfPiece;
                });
            }
        };

    rec.drag(onMove, onStart, onEnd);
}