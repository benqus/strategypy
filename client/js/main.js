/* global: strategypy */
(function ($, Game, GamePlayer) {

    var gamePlayer;

    function documentReady() {
        var game = new Game();

        gamePlayer = new GamePlayer($('#strategypy'), game);

        $('.start-btn')
            .on('click', startGame);

        $.getJSON('example.json')
            .done(gamePlayer.initialize.bind(gamePlayer));
    }

    function startGame(evt) {
        var fps = $(evt.target).data('fps');
        gamePlayer.start(fps);
    }

    $(document)
        .ready(documentReady);

}(
    jQuery,
    strategypy.Game,
    strategypy.GamePlayer
));