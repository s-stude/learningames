define(function (require) {
    var _ = require('Underscore');

    return (function () {

        var create = function (props) {

            var polygon = props.paper.path('M' + props.startX + ',' + props.startY + ",l-60,-30l0,-60l60,-30l60,30l0,60z");

            polygon.attr({
                stroke: '#1abc9c',
                'stroke-opacity': 0,
                'stroke-width': 4,
                fill: 'white',
                cursor: 'pointer'

            });

            polygon.data('index', props.index);


            return polygon;
        },
            createText = function (props) {
                var text = props.paper.text(props.startX, props.startY, _.random(2, 9));
                text.attr({
                    'font-family': 'Lato, sans-serif',
                    'font-size': '25',
                    fill: '#e74c3c',
                    cursor: 'pointer',
                    opacity: 0
                });
                text.data('index', props.index);
                return text;
            };

        return {
            create: create,
            createText: createText
        };
    })();

});
