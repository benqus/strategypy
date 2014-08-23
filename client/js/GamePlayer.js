/* global: jQuery, strategypy */
(function ($) {

    function GamePlayer($canvas, game) {
        this.fps = 30;
        this.isPlaying = false;
        this.frameCount = 0;
        this.currentFrame = 0;
        this.game = game;
        this.$canvas = $canvas;
    }

    $.extend(GamePlayer.prototype, {

        initialize: function (data) {
            var width = this.$canvas.width(),
                height = this.$canvas.height();

            this.frameCount = data.frames.length;

            this.game.initialize(data, width, height);
            this.game.renderFrame(this.getGameContext(), 0);
        },

        getGameContext: function () {
            return this.$canvas[0].getContext('2d');
        },

        setFPS: function (fps) {
            this.fps = fps;
        },

        renderFrame: function (context) {
            this.game.renderFrame(context, this.currentFrame);
        },

        start: function (fps) {
            var context = this.getGameContext();

            if (fps) {
                this.setFPS(fps);
            }

            if (!this.isPlaying) {
                this.isPlaying = true;

                this.interval = setInterval(function () {
                    this.renderFrame(context);

                    if (this.currentFrame === this.frameCount) {
                        // end replay
                        clearInterval(this.interval);

                        this.isPlaying = false;
                        this.currentFrame = 0;

                        console.log('Game finished!');
                    } else {
                        // go to next frame
                        this.currentFrame += 1;
                    }
                }.bind(this), 1000 / this.fps);
            }
        }

    });

    strategypy.GamePlayer = GamePlayer;

}(
    jQuery
));