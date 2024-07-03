//VARIABLES
//sprties
var grass, flower, player, groundSensor;
//images
var playerImg, grassImg, flowerImg, background
//time
var time, timerIsDone = false, startTime = 60;
//other
var score = 0, gameState;

//PRELOAD IMAGES
function preload()
{
 playerImg = loadImage('assets/player.png');
 flowerImg = loadImage('assets/flower.png');
 grassImg = loadImage('assets/grass.png');
 background = loadImage('assets/background.png');
}



//SETUP
function setup()
{
  createCanvas(700, 350, 'pixelated');
  world.gravity.y = 10;

  //player sprite
  player = new Sprite(50, 250, 90, 280);
  player.rotationLock = true;
  player.friction = 0;
  player.drag = 1
  player.layer = 2;
  player.img = playerImg;
  player.scale = 0.2;
  
  //TILES
  //grass
  grass = new Group();
  grass.collider = 's';
  grass.tile = 'g';
  grass.w = 20;
  grass.h = 20;
  grass.image = grassImg;
  grass.scale = 0.25
  //flowers
  flower = new Group();
  flower.collider = 's';
  flower.layer = 1;
  flower.tile = 'f';
  flower.w = 20;
  flower.h = 20;
  flower.image = flowerImg;
  flower.scale = 0.3;

  //grid
  new Tiles(
		[
      '.',
      '.',
      '..........f.........................',
      '.',
      '.',
      '.........gggg.......................',
      '.',
      '...............gggg.............f...',
      '...............gggg.................',
      '............................gggggggg',
      '........................f...........',
      '.........f..........................',
      '.....................gggggg.........',
      '.......gggg.....f....gggggg.........',
      '.......gggg.........................',
      'ggggg...............................',
      'ggggg........ggg..ggg...............',
      'ggggg...............................',
		],
		10,
		0,
    grass.w,
    grass.h 
	);

  //collect flower
  player.overlaps(flower, removeFlower);

  //ground sensor (p5play platformer demo)
  groundSensor = new Sprite(0, 0);
	groundSensor.visible = false;
	groundSensor.mass = 0.01;
	groundSensor.overlaps(allSprites);
}

//timer from game physics slides
function timer()
{
  time = int((millis() - startTime) / 1000);
  if (time > 60)
  {
    timerIsDone = true;
  }
  return time
}

//DRAW
function draw()
{  
  //background
  image(background, 0, 0, 700, 350);

  //ON-SCREEN TEXT
  //score
  fill('#1e253a');
  rect(0, 0, 140, 40);
  textSize(24);
  fill('white');
  text('score = ' + score, 10, 30);
  //time
  fill('#1e253a');
  rect(655, 0, 115, 40);
  timer();
  fill('white');
  text(time, 665, 30);

  //PLAYER INPUTS
  if (kb.pressing('right'))
  {
		player.vel.x = 1.5;
	}
  if (kb.pressing('left'))
  {
		player.vel.x = -1.5;
	}
  if (kb.presses('up') && player.colliding(grass))
  {
		player.vel.y = 30;
	}

  //RESET
  if (player.x < 0 || player.y > 350)
  {
    player.x = 50;
    player.y = 250;
    player.speed = 0;
    score = 0;
    time = 0;
  }
}

//collect flower function
function removeFlower(player, flowerCollected)
{
  flowerCollected.remove();
  score += 1;
}
