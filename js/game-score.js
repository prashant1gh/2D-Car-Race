function GameScore(score, canvas) {

    var gameScore = this;

    gameScore.canvas = canvas;
    gameScore.context = gameScore.canvas.getContext("2d");

    gameScore.score = score;
    gameScore.x = 0;
    gameScore.y = 0;

}


GameScore.prototype.draw = function() {
    var gameScore = this;


    gameScore.score = score;
    gameScore.context.font = '45px Verdana';
    gameScore.context.fillText("Score", gameScore.x, gameScore.y);
    gameScore.context.font = '45px Verdana';
    gameScore.context.fillText(gameScore.score, gameScore.x, gameScore.y + 50);
}