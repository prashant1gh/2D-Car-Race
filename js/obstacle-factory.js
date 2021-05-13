function ObstacleFactory(canvas) {
    var factory = this;


    factory.canvas = canvas;
    factory.context = factory.canvas.getContext('2d');

    factory.x = 300;
    factory.freq = 900;
    factory.obstacles = [];

}


ObstacleFactory.prototype.generateObstacle = function() {

    var factory = this;


    setInterval(function() {
        var x = getRandomInt(2, 5) * 150;
        src = factory.getRandomSkin();
        var obstacle = new Obstacle(src, factory.canvas);

        obstacle.x = x;
        obstacle.src = src;

        factory.obstacles.push(obstacle);

    }, factory.freq);

}

ObstacleFactory.prototype.getRandomSkin = function() {

    var factory = this;

    var skins = [
        'assets/Ambulance.png',
        'assets/Black_viper.png',
        'assets/Car.png',
        'assets/Mini_truck.png',
        'assets/Mini_van.png',
        'assets/Police.png',
        'assets/taxi.png',
        'assets/truck.png'
    ]

    var skin = skins[getRandomInt(0, 8)]

    return skin;
}