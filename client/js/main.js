/* global: strategypy */
(function ($, Game) {

    var game;

    function documentReady() {
        game = new Game($('#strategypy'));

        $('.start-btn')
            .on('click', startGame);

        $.getJSON('example.json')
            .done(game.initialize.bind(game));
    }

    function startGame(evt) {
        var fps = $(evt.target).data('fps');
        game.start(fps);
    }

    $(document)
        .ready(documentReady);

}(
    jQuery,
    strategypy.Game
));