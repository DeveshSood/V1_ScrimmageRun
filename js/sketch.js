var wii,wi;
var gii,gi;
var epki,epk,epkgrp;
var gpki,gpk,gpkgrp;
var bki;
var grdi,grd;
var shi,sh;
var tri,tr;
var scl = 1;
var hi,h;

var gmst = "play";
var gmori,gmor;
var resti,rest;

var laserSound;
var laughSound;
var bkgrdSound;

var shots,chk = 0;
var score = 0,health = 6;

function preload() {
  
 gii = loadAnimation("images/rf16.png","images/rf15.png","images/rf14.png","images/rf13.png","images/rf12.png","images/rf11.png","images/rf10.png","images/rf9.png","images/rf8.png","images/rf7.png","images/rf6.png","images/rf5.png","images/rf4.png","images/rf3.png","images/rf2.png","images/rf1.png");
  
  wii = loadAnimation("images/g1.png","images/g2.png","images/g3.png","images/g4.png","images/g5.png");
  
  bki = loadImage("images/bkgrd.jpg");
  grdi = loadImage("images/grass2.PNG");
  gpki = loadImage("images/good pmk.png");
  epki = loadImage("images/evil pmk.png");
  shi = loadImage("images/LA.png");
  tri = loadImage("images/tree1.png");
  hi = loadImage("images/house.png");
  gmori = loadImage("images/gameover.png");
  resti = loadImage("images/reset-button-png.png");
  laserSound = loadSound("sounds/Comet-SoundBible.com-1256431940.wav");
  laughSound = loadSound("sounds/cackle3.wav");
  bkgrdSound = loadSound("sounds/evil_and_horror.mp3");
 }

function setup() {
  createCanvas(600, 300);
 
  background = createSprite(width/2,height/2,600,300);
  background.addImage(bki);
  background.scale = 2;
  
  h = createSprite(400,200,20,20);
  h.addImage(hi);
  h.velocityX = -5;
  h.lifetime = 120;
    
  cgrd=createSprite(300,300,600,10);
  cgrd.visible = false;
  
  wi=createSprite(70,220,20,20);
  wi.addAnimation("witch",wii);
  wi.scale = 0.5;
  
  gi=createSprite(250,240,20,20);
  gi.addAnimation("girl",gii);
  gi.scale = 0.28;
  gi.debug = false;
  gi.setCollider("rectangle",0,0,20,55);
  
  grd=createSprite(0,295,20,20);
  grd.addImage(grdi);
  grd.scale = 0.4;
  
  gmor = createSprite(width/2,height/2-50,20,20);
  gmor.addImage(gmori);
  gmor.visible = false;
  
  rest = createSprite(width/2,height/2+50,20,20);
  rest.addImage(resti);
  rest.scale = 0.2;
  rest.visible = false;
  
  bkgrdSound.loop();
  
  shots = new Group();
  gpkgrp = new Group();
  epkgrp = new Group();
  fill(255); 
}

function draw() {
   
  if(gmst==="play"){
  grd.velocityX = -4;
  if(grd.x<0){
    grd.x = 300;
  }
  if(frameCount % 45===0){
    trees();
  }
  gi.collide(cgrd);
  if(keyDown("space") && gi.y > 245.4 || keyDown("up") && gi.y > 245.4 || mousePressedOver(gi) && gi.y > 245.4){
    gi.velocityY = -8.8;
  }
  //console.log(gi.y);
  wi.scale = 1.2;
  wi.y = gi.y -30;
  gi.velocityY = gi.velocityY +0.3;
  gi.scale = 1.8;
  
  chk = Math.round(random(120,180));
  if(frameCount%chk===0){
    shot();
    laserSound.play();
  }
  
  if(frameCount%150===0){
    gpumpkin();
  }
  if(frameCount%Math.round(random(220,250))===0){
    epumpkin();
  }
  if(frameCount%300===0){
    laughSound.play();
  }  
  hits();
    if(health === 0){
      gmst = "end";
      wi.y = 400;
      gi.y = 400;
      epkgrp.destroyEach();
      gpkgrp.destroyEach();
      shots.destroyEach();
      gmor.visible = true;
      bkgrdSound.stop();
      rest.visible = true;
    }
    drawSprites();
    text("Score : " +score,500,50);
    text("Health : " +health,50,50);
   }
   if(gmst==="end"){
      Reset();
   } 
}

function trees() {
  tr = createSprite(610,250,20,20);
  tr.addImage(tri);
  scl = Math.round(random(1,3));
  if(scl===1){
    tr.scale = 0.6;
    tr.y = 235;
  }
  else if(scl===2){
    tr.scale = 0.7;
    tr.y = 210;
  }
  else if(scl===3){
    tr.scale = 0.9;
     tr.y = 180;
  }
  tr.depth = background.depth +1;
  tr.velocityX = -5;
  tr.lifetime = 130;
}
function shot() {
  sh = createSprite(100,wi.y+30,20,20);
  sh.addImage(shi);
  sh.scale = 0.1;
  sh.depth = wi.depth -1;
  sh.depth = tr.depth +1;
  sh.velocityX = 3.6;
  sh.lifetime = 170;
  //sh.debug = true;
  shots.add(sh);
}
function hits(){
  for(i = 0;i < shots.length;i++){
    if(shots[i].isTouching(gi)){
      shots[i].destroy();
      health = health - 1;
    }
  }
  for (j = 0; j < gpkgrp.length; j++){ 
  if(gpkgrp[j].isTouching(gi)){
    score = score +5;
    gpkgrp[j].destroy();
  }
 }
  for (k = 0; k <epkgrp.length; k++){
    if(epkgrp[k].isTouching(gi)){
      score = score -2;
      epkgrp[k].destroy();
    }
  }
}
function gpumpkin(){
  gpk = createSprite(610,260,20,20);
  gpk.addImage(gpki);
  gpk.scale = 0.06;
  gpk.velocityX = -4;
  gpk.depth = grd.depth -1;
  gpk.lifetime = 160;
  gpk.setCollider("circle",0,30,70);
  gpkgrp.add(gpk);
  //gpk.debug = true;
  }
function epumpkin(){
  epk = createSprite(610,260,20,20);
  epk.addImage(epki);
  epk.scale = 0.3;
  epk.velocityX = -4;
  epk.depth = grd.depth -1;
  //epk.debug = true;
  epk.setCollider("circle",0,30,70);
  epkgrp.add(epk);
}
function Reset(){
     if(mousePressedOver(rest) && mouseDown("leftButton") || mouseIsOver(rest) || keyDown("space")){
       gmst = "play";
       h = createSprite(400,200,20,20);
       h.addImage(hi);
       h.velocityX = -5;
       h.lifetime = 100;
       h.depth = wi.depth -1;
       h.depth = tr.depth +1;
       h.depth = grd.depth -1;
       wi.y = 220;
       gi.y = 240;
       epk.visible = true;
       gpk.visible = true;
       gmor.visible = false;
       rest.visible = false;
       score = 0;
       health = 6;
       bkgrdSound.loop();
       }    
}