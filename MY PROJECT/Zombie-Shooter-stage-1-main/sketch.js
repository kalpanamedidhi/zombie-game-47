var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieIMG;
var zombiesGroup;
var bulletsGroup,bullets,bulletIMG;
var winSound,loseSound,explosionSound;
var heart1,heart2,heart3;
var score=0;
var lives = 3;


function preload(){
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bgImg = loadImage("assets/bg.jpeg")
  zombieIMG = loadImage("assets/zombie.png")
  bulletIMG = loadImage("assets/bullet.png")
  heart1IMG = loadImage("assets/heart_1.png")
  heart2IMG = loadImage("assets/heart_2.png")
  heart3IMG = loadImage("assets/heart_3.png")
  winSound = loadSound("assets/win.mp3")
  loseSound = loadSound("assets/lose.mp3")
  explosionSound = loadSound("assets/explosion.mp3")
}


function setup() {
createCanvas(windowWidth,windowHeight); 

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1

  heart1=createSprite(displayWidth-300,30)
  heart2=createSprite(displayWidth-300,30)
  heart3=createSprite(displayWidth-300,30)

  heart1.addImage(heart1IMG)
  heart1.scale=0.3
  heart2.addImage(heart2IMG)
  heart2.scale=0.3
  heart3.addImage(heart3IMG)
  heart3.scale=0.3

  heart1.visible=false
  heart2.visible=false
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   zombiesGroup = new Group()
   bulletsGroup = new Group()

}


function draw() {
  background(0); 

 //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  createBullet()
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
spawnzombie()

if(bulletsGroup.isTouching(zombiesGroup)){
   explosionSound.play()
  bulletsGroup.destroyEach()
  zombiesGroup[0].destroy()
  score+=20
 
}
if(zombiesGroup.isTouching(player)){
  
  lives = lives -1
  
  zombiesGroup[0].destroy()
 

  
}
if (lives == 2) {
  heart3.visible = false;
  heart2.visible = true
}
if (lives == 1) {
  heart2.visible = false;
  heart1.visible = true
}
if(lives == 0){
  heart1.visible = false
  player.destroy()
  zombiesGroup.destroyEach()
  zombiesGroup.setLifetimeEach(-1)
  zombiesGroup.setVelocityXEach(0)
  
}
drawSprites();
textSize(30)
fill ("white")
text("SCORE: "+score,200,50)
}


function spawnzombie() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var zombie = createSprite(windowWidth,120,40,10);
    zombie.y = Math.round(random(30,700));
    zombie.addImage(zombieIMG);
    zombie.scale = 0.15;
    zombie.velocityX = -3;
    
     //assign lifetime to the variable
    zombie.lifetime = 400;
    
    //adjust the depth
  
    
    //add each cloud to the group
    zombiesGroup.add(zombie);
  }
  
}

function createBullet() {
  var bullets= createSprite(100, 100, 60, 10);
  bullets.addImage(bulletIMG)
  bullets.x = 360;
  bullets.y=player.y;
  bullets.velocityX = 6;
  bulletsGroup.add(bullets);
  bullets.scale = 0.2
  bullets.lifetime = 250
}