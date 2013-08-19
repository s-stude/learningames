define(function () {

    return (function () {

        var
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
                var rect = props.paper.rect().attr({
                    x:props.x,
                    y:props.y,
                    width:props.weight,
                    height:props.height,
                    cursor:'move',
                    fill: '#2ECC71',
                    'fill-opacity':0.1,
                    stroke: '#27AE60',
                    'stroke-opacity':1,
                    "stroke-width": 4

                });

                rect.data('index', props.index);


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