define(function() {

    return (function() {

        var

        anim = Raphael.animation(animParam, 5000),
            animParam = {
                y: 450
            },
            animC = Raphael.animation(animParamC, 5000),
            animParamC = {
                cy: 450
            },



            getColor = function() {
                //var colors = new Array("#2ECC71","#3498DB","#9B59B6","#34495E","#2980B9","#8E44AD","#F39C12","#D35400","#E67E22");
                var colors = new Array("#1ABC9C", "#3498DB", "#9B59B6", "#E74C3C", "#34495E");
                return colors[getRandom(0, 4)];

            },

            getRandom = function(min, max) {
                return min + Math.floor(Math.random() * (max - min + 1));
            },

            moveAnimation = function() {
                animC = Raphael.animation({
                    cy: 450
                }, 5000, "bounce", function() {
                    animateFault(this.attr('cx'), 450);
                    this.remove();

                });

                anim = Raphael.animation({
                    y: 450
                }, 5000, "bounce", function() {
                    this.remove();
                });
            };

        circleAnimate = function() {

            

        },



        create = function(props) {


            return {
                rect: rect
            };
        };

        return {
            create: create
        };
    })();

});