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

        createCell: function (column, row) {
            var cell = new Cell(column, row, this.currentX, this.currentY);
            this.cells[cell.getID()] = cell;
            return cell;
        },

        newColumn: function () {
            this.currentX += Cell.getWidth();
        },

        newRow: function () {
            this.currentX = 0;
            this.currentY += Cell.getHeight();
        },

        update: function (ctx, frame, players) {
            for (var i in this.cells) {
                this.cells[i].render(ctx, frame, players);
            }
        },

        render: function (ctx, frame, players) {
            var row = 0,
                column = 0,
                cell;

            while (row < this.rows) {
                while (column < this.columns) {
                    cell = this.createCell(column, row);
                    cell.render(ctx, frame, players);

                    column += 1;

                    this.newColumn();
                }

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