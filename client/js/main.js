/* global: strategypy */
(function ($, Game) {

    var game;

    function documentReady() {
        game = new Game($('#strategypy'));

        $.getJSON('example.json')
            .done(game.update.bind(game));
    }

    $(document)
        .ready(documentReady);

}(
    jQuery,
    strategypy.Game
));