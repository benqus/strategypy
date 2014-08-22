/* global: strategypy */
(function ($) {

    var c = 0;

    function Cell(x, y) {
        this.cid = 'c' + c;

        this.player = false;

        this.x = x;
        this.y = y;

        c += 1;
    }

    Cell.WIDTH = 0;
    Cell.HEIGHT = 0;

    Cell.setDimensions = function (width, height) {
        Cell.WIDTH = width;
        Cell.HEIGHT = height;
    };

    $.extend(Cell.prototype, {

        getID: function () {
            return this.cid;
        },

        hasPlayer: function (hasPlayer) {
            this.player = hasPlayer;
        },

        render: function (ctx) {
            var fillStyle = ctx.fillStyle;

            ctx.fillStyle = (this.player ? 'rgb(255, 0, 0)' : 'rgb(0, 0, 0)');
            ctx.fillRect(this.x, this.y, Cell.WIDTH, Cell.HEIGHT);
            ctx.fillStyle = fillStyle;
        }
    });

    strategypy.Cell = Cell;

}(
    jQuery
));