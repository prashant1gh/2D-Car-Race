var INITIAL = 1;
var GAME_PLAYING = 2;
var GAME_OVER = 3;
var KEY_CODE = {
    R: 82,
    space: 32,
    A: 65,
    D: 68,
}

var score = 0;

function CarRace(canvas) {
    var game = this;

    game.canvas = canvas;
    game.context = game.canvas.getContext('2d');

    game.currentState = INITIAL;
    game.velocity = 5;

    //events
    game.bindEvents();

    // game objects
    game.createObjects();
}


CarRace.prototype.createObjects = function() {
    var game = this;

    //game background
    game.background1 = new GameBackground('assets/background.png', game.canvas);
    game.background2 = new GameBackground('assets/background.png', game.canvas);
    game.background2.y = -game.canvas.height;

    //game scoreboard
    game.gameScore = new GameScore(score, game.canvas);
    game.gameScore.x = game.canvas.width - 200;
    game.gameScore.y = 80;

    //player car
    game.playerCar = new PlayerCar('assets/Audi.png', game.canvas);

    //obstacle generator
    game.obstacleFactory = new ObstacleFactory(game.canvas);
}



CarRace.prototype.bindEvents = function() {
    var game = this;

    window.addEventListener('keydown', function(event) {
        console.log(event)
        switch (game.currentState) {
            case INITIAL:
                if (event.keyCode === KEY_CODE.space) {
                    game.currentState = GAME_PLAYING;
                    game.obstacleFactory.generateObstacle();

                }
                break;

            case GAME_PLAYING:
                if (event.keyCode === KEY_CODE.A) {
                    console.log('left');


                    if (game.playerCar.x <= 300) {

                        game.playerCar.x = 300;
                    } else {
                        game.playerCar.x -= 150;

                    }
                }
                if (event.keyCode === KEY_CODE.D) {
                    console.log('right');
                    if (game.playerCar.x >= 600) {
                        game.playerCar.x = 600;

                    } else {
                        game.playerCar.x += 150;

                    }
                }
                break;
            case GAME_OVER:
                if (event.keyCode === KEY_CODE.R) {
                    game.reset();
                    game.currentState = GAME_PLAYING;
                }
                break;
        }
    });
}

CarRace.prototype.reset = function() {
    var game = this;

    game.score = 0;
    game.obstacleFactory.obstacles = [];
}

CarRace.prototype.start = function() {
    var game = this;


    //start game
    window.requestAnimationFrame(function() {
        game.runGameLoop();
    })
}

CarRace.prototype.runGameLoop = function() {
    var game = this;

    switch (game.currentState) {
        case INITIAL:
            game.drawInitialScreen();
            break;
        case GAME_PLAYING:
            game.drawGamePlayingScreen();
            break;
        case GAME_OVER:
            game.drawGameOverScreen();
            break;
    }

    window.requestAnimationFrame(function() {
        game.runGameLoop();
    })
}

CarRace.prototype.drawInitialScreen = function() {
    var game = this;

    game.context.fillStyle = 'black';
    game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);


    game.context.fillStyle = 'white';
    game.context.font = '40px arial';
    game.context.fillText('2D Car Race', game.canvas.width / 2 - 300, game.canvas.height / 2 - 250);
    game.context.font = '34px arial';
    game.context.fillText('Instructions', game.canvas.width / 2 - 300, game.canvas.height / 2 - 200);
    game.context.font = '25px arial';

    game.context.fillText('1. Press A to Move Left and Press B to Move Right', game.canvas.width / 2 - 300, game.canvas.height / 2 - 150);
    game.context.fillText('2. Prevent colliding with obstacles', game.canvas.width / 2 - 300, game.canvas.height / 2 - 100);
    game.context.fillText('3. Car Speed increses on every obstactle passed.', game.canvas.width / 2 - 300, game.canvas.height / 2 - 50);

    game.context.font = '36px arial';
    game.context.fillText('Press space to Start', game.canvas.width / 2 - 300, game.canvas.height / 2);
}

CarRace.prototype.drawGamePlayingScreen = function() {
    var game = this;
    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);

    //animate background
    game.animateBackground();

    //display score
    game.gameScore.draw();

    //display player car
    game.playerCar.draw();

    //display obstacles
    game.drawObstacle();

    //check collision
    game.checkCollision();


}

CarRace.prototype.checkCollision = function() {
    var game = this;

    var obstacles = game.obstacleFactory.obstacles;

    for (var i = 0; i < obstacles.length; i++) {
        if (game.ifCollided(game.playerCar, obstacles[i])) {
            game.currentState = GAME_OVER;
        }
    }
}

CarRace.prototype.ifCollided = function(playerCar, obstacle) {
    var game = this;
    var isCollided = false;

    // //player car coordinates
    // var playerCarTop = playerCar.y;
    // var playerCarRight = playerCar.x + playerCar.w;
    // var playerCarLeft = playerCar.x;

    // //obstactle coordinates
    // var obstacleLeft = obstacle.x;
    // var obstacleBottom = obstacle.y + obstacle.h;
    // var obstacleRight = obstacle.x + obstacle.w;

    if ((obstacle.x + obstacle.w) >= (playerCar.x) &&
        (obstacle.x) <= (playerCar.x + playerCar.w) &&
        (obstacle.y + obstacle.h) >= playerCar.y &&
        obstacle.y <= (playerCar.y + playerCar.h)
    ) {
        isCollided = true;
    }



    return isCollided;
}

CarRace.prototype.drawObstacle = function() {
    var game = this;

    var obstacles = game.obstacleFactory.obstacles;

    for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].draw();
        obstacles[i].y = obstacles[i].y + game.velocity;
    }

    game.removePassedObstacle();

}

CarRace.prototype.removePassedObstacle = function() {
    var game = this;

    var obstacles = game.obstacleFactory.obstacles;

    for (var i = 0; i < obstacles.length; i++) {
        if (obstacles[i].y + obstacles[i].h > game.canvas.height) {
            obstacles.shift();

            //increase score
            score++;

            //increase velocity of game
            game.velocity += 0.1;
        }
    }
}

CarRace.prototype.animateBackground = function() {
    var game = this;

    //background1
    game.background1.draw();

    if (Math.abs(game.background1.y) > game.canvas.height) {
        game.background1.y = -game.canvas.height + game.velocity;
    }

    game.background1.y = game.background1.y + game.velocity;

    //background2
    game.background2.draw();

    if (Math.abs(game.background2.y) > game.canvas.height) {
        game.background2.y = -game.canvas.height + game.velocity;
    }

    game.background2.y = game.background2.y + game.velocity;

}

CarRace.prototype.drawGameOverScreen = function() {
    var game = this;

    game.context.fillStyle = 'black';
    game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);


    game.context.fillStyle = 'white';
    game.context.font = '46px arial';
    game.context.fillText('Your Score : ' + score, game.canvas.width / 2 - 150, game.canvas.height / 2 - 100);

    game.context.font = '36px arial';
    game.context.fillText('game over :(', game.canvas.width / 2 - 150, game.canvas.height / 2);
    game.context.fillText('Press R to restart', game.canvas.width / 2 - 150, game.canvas.height / 2 + 100);
}