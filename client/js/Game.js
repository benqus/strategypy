/* global: strategypy */
(function ($, Cell, Grid) {

    function Game($canvas) {
        this.data = undefined;
        this.grid = undefined;
        this.$canvas = $canvas;
    }

    $.extend(Game.prototype, {
        getGameContext: function () {
            return this.$canvas[0].getContext('2d');
        },

        update: function (data) {
            var context = this.getGameContext(),
                // assuming that the first number in the grid_size represents the number of columns
                columns = data.grid_size[0],
                // assuming that the second number in the grid_size represents the number of rows
                rows = data.grid_size[1];

            Cell.setDimensions(
                this.$canvas.width() / columns,
                this.$canvas.height() / rows
            );

            this.data = data;
            this.grid = new Grid(columns, rows);
            this.grid.render(context);
        }
    });

    strategypy.Game = Game;

}(
    jQuery,
    strategypy.Cell,
    strategypy.Grid
));