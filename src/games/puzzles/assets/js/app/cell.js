define('app/cell', function (require) {

    return (function () {

        var
            rgbRand = function () {
                var m = 255;
                return 'rgb(' + Math.random() * m + ', ' + Math.random() * m + ', ' + Math.random() * m + ')';
            },
            
            onMove = function (globalOnMoveHandler) {
                return function (dx, dy) {
                    // local handler here
                    return globalOnMoveHandler(this, dx, dy);
                };
            },
            onStart = function (globalOnStartHandler) {
                return function () {
                    // local handler here
                    return globalOnStartHandler(this);
                };
            },
            onEnd = function (globalOnEndHandler) {
                return function () {
                    // local handler here
                    return globalOnEndHandler(this);
                };
            },

            create = function (props) {
                var randomColor = rgbRand();
                var rect = props.paper.rect().attr({
                    x:props.x,
                    y:props.y,
                    r: 10,
                    width:props.cellWidth,
                    height:props.cellHeight,
                    fill: '#2ECC71', //randomColor,
                    'fill-opacity':1,
                    stroke: '#27AE60',//randomColor,
                    'stroke-opacity':1,
                     "stroke-width": 1
                });

                rect.drag(onMove(props.onMove), onStart(props.onStart), onEnd(props.onEnd));

                return {
                    rect:rect
                };
            };

        return {
            create:create
        };
    })();

});