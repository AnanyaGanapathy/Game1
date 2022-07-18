var mario, mario_running;
var ground, ground_image, invisibleGround;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var coinsGroup, coin, coinImage;

var play = 1;
var end = 0;
var gameState = play;

var score = 0;

var gameOver, restart;

function preload() {
  mario_running = loadAnimation("Mario1.png", "Mario2.png", "Mario3.png");
  mario_collided = loadAnimation("Mariodead.png");
  groundImage = loadImage("ground.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  coinImage = loadImage("coin.png")
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(900, 400);
  
  mario = createSprite(150,365,20,50);
  mario.addAnimation("running", mario_running);
  mario.addAnimation("collided", mario_collided);
  mario.scale = 0.25;
  mario.debug = false
  mario.setCollider("circle", -300, -200, 80);
  
  ground = createSprite(0, 375, 1200, 10);
  ground.addImage(groundImage)
  ground.x = ground.width / 2;
  ground.velocityX = -(6 + (3 * score) / 100);

  gameOver = createSprite(450, 150);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(450, 200);
  restart.addImage(restartImg);

  gameOver.scale = 0.7;
  restart.scale = 1.2;

  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup = new Group();
  coinsGroup = new Group();

  invisibleGround = createSprite(200,390,1200,10);
  invisibleGround.visible = false;
}

function draw () {

  background("skyBlue")
  text("Coins Collected: " + score, 770, 40)
  text.size = "10"

    mario.collide(ground);

    if(gameState === play) { 

  if(keyDown("space") && mario.y >= 139) {
    mario.velocityY = -9;
    }

  mario.velocityY = mario.velocityY + 0.65
   
  if(ground.x<0) {
    ground.x = ground.width /2;

    ground.velocityX = -7
}

spawnObstacles();
spawnCoins();

if (coinsGroup.isTouching(mario)) {
  score = score + 1
  coinsGroup[0].destroy();
}

 if (obstaclesGroup.isTouching(mario)) {
  gameState = end;
 }
  
}

else if (gameState === end ) {
 gameOver.visible = true;
 restart.visible = true;
 obstaclesGroup.setVelocityXEach(0);
 coinsGroup.setVelocityXEach(0);
 ground.VelocityX = 0;
 ground.VelocityY = 0;
 mario.VelocityY = 0;
 mario.changeAnimation("collided", mario_collided);
 mario.scale = 0.25;
 obstaclesGroup.setLifetimeEach(-1);
 coinsGroup.setLifetimeEach(-1);
if(mousePressedOver(restart)) {
  reset();
}
}
drawSprites(); 
}

function reset() {
  gameState = play;
  gameOver.visible = false;
  restart.visible = false

  coinsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  score = 0;
  mario.setAnimation("running", mario_running)
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,352,10,40);

    obstacle.velocityX = -(6 + (3 * score) / 100);

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }

    obstacle.scale = 0.1;
    obstacle.lifetime = 250;
    obstaclesGroup.add(obstacle);
  }
}

function spawnCoins() {
  if(frameCount % 100 === 0) {
    var coin = createSprite(600,352,10,40);
    coin.y = Math.round(random(150, 300))
    coin.addImage(coinImage);
    coin.scale = 0.08;
    coin.lifetime = 250;
    coin.velocityX = -(6 + (3 * score) / 100); 
    coinsGroup.add(coin)
  }
}
