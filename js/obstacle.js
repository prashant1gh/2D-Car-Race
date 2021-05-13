function Obstacle(src, canvas) {
    var obstacle = this;


    obstacle.canvas = canvas
    obstacle.context = obstacle.canvas.getContext('2d');

    obstacle.x = 300;
    obstacle.y = 0;
    obstacle.w = 120;
    obstacle.h = -100;
    obstacle.img = null;

    obstacle.src = src;

    obstacle.create();

}

Obstacle.prototype.create = function() {
    var obstacle = this;

    obstacle.img = new Image;
    obstacle.img.src = obstacle.src;
}

Obstacle.prototype.draw = function() {
    var obstacle = this;

    if (obstacle.img != null) {
        obstacle.context.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.w, obstacle.h);


    }
}