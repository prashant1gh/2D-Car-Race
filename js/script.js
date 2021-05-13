window.onload = function() {
    var canvas = document.getElementById("my-canvas");
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var ctx = canvas.getContext("2d");

    var game = new CarRace(canvas);


    game.start()
}