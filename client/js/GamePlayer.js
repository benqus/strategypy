/* global: jQuery, strategypy */
(function ($, Game) {

    function GamePlayer($canvas, game) {
        this.fps = 30;
        this.isPlaying = false;
        this.frameCount = 0;
        this.currentFrame = 0;
        this.game = new Game();
        this.$canvas = $canvas;
    }

    $.extend(GamePlayer.prototype, {

        initialize: function (data) {
            var width = this.$canvas.width(),
                height = this.$canvas.height();

            this.frameCount = data.frames.length;

            this.renderControls();

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

        renderControls: function () {
            var icon = (this.isPlaying ? 'pause' : 'play'),
                text = (this.isPlaying ? 'Pause' : 'Play'),
                html = [
                    [
                        '<button class="btn">',
                            '<span class="fa fa-' + icon + '"></span>',
                            '&nbsp;' + text,
                        '</button>'
                    ].join(''),
                    '<button class="btn left" data-fps="15">15 FPS</button>',
                    '<button class="btn right" data-fps="30">30 FPS</button>'
                ].join('');

            $('#game-player')
                .html(html)
                .on('click', function (evt) {
                    var fps = $(evt.target).data('fps');
                    this.play(fps);
                }.bind(this));
        },

        resume: function () {
            // TODO
        },

        pause: function () {
            // TODO
        },

        play: function (fps) {
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

                        this.renderControls();
                    } else {
                        // go to next frame
                        this.currentFrame += 1;
                    }
                }.bind(this), 1000 / this.fps);

                this.renderControls();
            }
        }

    });

    strategypy.GamePlayer = GamePlayer;

}(
    jQuery,
    strategypy.Game
));