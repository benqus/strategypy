/* global: jQuery, strategypy */
(function ($, Player, Cell, Grid) {

    function Game($canvas) {
        this.grid = undefined;
        this.frames = 0;
        this.players = {};
        this.$canvas = $canvas;
        this.interval = undefined;
    }

    $.extend(Game.prototype, {
        getGameContext: function () {
            return this.$canvas[0].getContext('2d');
        },

        createPlayers: function (allPlayers) {
            for (var i in allPlayers) {
                this.players[i] = new Player(i, allPlayers[i]);
            }
        },

        parseFrame: function (frame, index) {
            for (var i in frame) {
                this.players[i].setBotsForFrame(index, frame[i]);
            }
        },

        start: function (fps) {
            var context = this.getGameContext(),
                timeout = 1000 / (fps || 30),
                frame = 0;

            clearInterval(this.interval);

            this.grid.render(context, frame, this.players);
            this.interval = setInterval(function () {
                frame += 1;
                this.grid.update(context, frame, this.players);

                if (frame === this.frames) {
                    clearInterval(this.interval);
                }
            }.bind(this), timeout);
        },

        initialize: function (data) {
                // assuming that the first number in the grid_size represents the number of columns
            var columns = data.grid_size[0],
                // assuming that the second number in the grid_size represents the number of rows
                rows = data.grid_size[1];

            this.createPlayers(data.all_players);
            this.frames = data.frames.length;

            data.frames
                .forEach(this.parseFrame.bind(this));

            Cell.setDimensions(
                this.$canvas.width() / columns,
                this.$canvas.height() / rows
            );

            this.grid = new Grid(columns, rows);
            this.grid.render(this.getGameContext(), 0, this.players);
        }
    });

    strategypy.Game = Game;

}(
    jQuery,
    strategypy.Player,
    strategypy.Cell,
    strategypy.Grid
));