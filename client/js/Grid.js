/* global: strategypy */
(function ($, Cell) {

    function Grid(columns, rows) {
        this.cells = {};

        this.rows = rows;
        this.columns = columns;

        this.currentX = 0;
        this.currentY = 0;
    }

    $.extend(Grid.prototype, {

        createCell: function () {
            var cell = new Cell(this.currentX, this.currentY);
            this.cells[cell.getID()] = cell;
            return cell;
        },

        newColumn: function () {
            this.currentX += Cell.WIDTH;
        },

        newRow: function () {
            this.currentX = 0;
            this.currentY += Cell.HEIGHT;
        },

        render: function (ctx) {
            var row = 0,
                column = 0,
                cell;

            var hasPlayer = true; // temporary

            while (row < this.rows) {
                while (column < this.columns) {
                    cell = this.createCell();
                    cell.hasPlayer(hasPlayer);
                    cell.render(ctx);

                    column += 1;
                    hasPlayer = !hasPlayer; // temporary

                    this.newColumn();
                }

                hasPlayer = !hasPlayer;
                column = 0;
                row += 1;

                this.newRow();
            }
        }
    });

    strategypy.Grid = Grid;

}(
    jQuery,
    strategypy.Cell
));