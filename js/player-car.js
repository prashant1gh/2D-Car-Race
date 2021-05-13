function PlayerCar(src, canvas) {
    var LEFT = 300;
    var MIDDLE = 450;
    var RIGHT = 600;

    var playerCar = this;

    playerCar.canvas = canvas;
    playerCar.context = playerCar.canvas.getContext('2d');

    playerCar.position = LEFT;
    playerCar.x = 300;
    playerCar.y = playerCar.canvas.height - 100;
    playerCar.w = 100;
    playerCar.h = 100;

    playerCar.src = src;
    playerCar.img = null;

    playerCar.create();
}

PlayerCar.prototype.create = function() {
    var playerCar = this;

    playerCar.img = new Image;
    playerCar.img.src = playerCar.src;
}

PlayerCar.prototype.draw = function() {
    var playerCar = this;


    if (playerCar.img != null) {
        playerCar.context.drawImage(playerCar.img, playerCar.x, playerCar.y, playerCar.w, playerCar.h);


    }

}

PlayerCar.prototype.Position = function() {



}