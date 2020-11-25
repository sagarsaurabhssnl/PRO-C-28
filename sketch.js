//GLOBAL VARIABLES AND CONSTANTS
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var mango1, stone1, platform1, throw1;
var num1 = null;
var gamestate = "inhand";
var gamestate1 = "play";
var treeimg, boyimg;
var chances = 3;
var score = 0;
var reload = null;

//LOADING IMAGES
function preload() {
	treeimg = loadImage("tree.png");
	boyimg = loadImage("boy.png");
}

//SETTING UP/CREATING THE CANVAS AND OBJECT OVER IT
function setup() {
	var canvas = createCanvas(1200, 600);
	engine = Engine.create();
	world = engine.world;
	stone1 = new Stone(128, 485, 30, 30);
	platform1 = new Platform(600, 625, 1200, 50);
	mango1 = new Mango(750, 350, 50, 50);
	mango2 = new Mango(820, 300, 50, 50);
	mango3 = new Mango(912, 307, 50, 50);
	mango4 = new Mango(1000, 300, 50, 50);
	mango5 = new Mango(895, 203, 50, 50);
	mango6 = new Mango(800, 200, 50, 50);
	mango7 = new Mango(1002, 232, 50, 50);
	mango8 = new Mango(711, 275, 50, 50);
	throw1 = new Throw(stone1.body, { x: 128, y: 485 });
	Engine.run(engine);
}

//DRAWING OBJECTS AND CALLING FUNCTIONS
function draw() {
	rectMode(CENTER);
	background(180);
	image(treeimg, 600, 120, 500, 500);
	image(boyimg, 100, 420, 150, 250);
	textSize(30);
	text("Score: " + score, 10, 50);
	text("Chances: " + chances, 10, 100);
	throw1.display();
	stone1.display();
	platform1.display();
	mango1.display();
	mango2.display();
	mango3.display();
	mango4.display();
	mango5.display();
	mango6.display();
	mango7.display();
	mango8.display();
	detectCollision(stone1, mango1);
	detectCollision(stone1, mango2);
	detectCollision(stone1, mango3);
	detectCollision(stone1, mango4);
	detectCollision(stone1, mango5);
	detectCollision(stone1, mango6);
	detectCollision(stone1, mango7);
	detectCollision(stone1, mango8);
	drag();
	release();
	reloadchanceText();
	reloadscoreText();
}

//SETTING VALUE FOR NUM1 WHEN MOUSE DRAGGED
function mouseDragged() {
	num1 = 1;
}

//SETTING VALUES FOR REQUIRED VARIABLES TO BE CHANGES WHEN MOUSE RELEASED
function mouseReleased() {
	if (gamestate1 === "play") {
		gamestate = "thrown";
		chances = chances - 1
		num1 = 0;
	}
}

//FUNCTIONS TO BE EXECUTED AS GAMESTATE IS INHAND
function drag() {
	if (gamestate === "inhand") {
		if (num1 === 1) {
			Matter.Body.setPosition(stone1.body, { x: mouseX, y: mouseY });
		}
	}
}

//FUNCTIONS TO BE EXECUTED AS GAMESTATE IS THROWN
function release() {
	if (gamestate === "thrown") {
		if (num1 === 0) {
			throw1.throw();
			num = null;
		}
	}
}

//FUNCTIONS TO BE EXECUTED AS SPACE KEY IS PRESSED
function keyPressed() {
	if (keyCode === 32) {
		reloadchance0fun();
		reloadscore8fun();
		throw1.attach(stone1.body);
		Matter.Body.setPosition(stone1.body, { x: 128, y: 485 });
		Matter.Body.setVelocity(stone1.body, { x: 0, y: 0 })
		Matter.Body.setAngularVelocity(stone1.body, 0);
		Matter.Body.setAngle(stone1.body, PI * 2);
		gamestate = "inhand";
	}
}

//CRTEATING FUNCTION TO DETECT COLLISION BETWEEN TWO OBJECTS
function detectCollision(stone, mango) {
	mpos = mango.body.position;
	spos = stone.body.position;
	var distance = dist(spos.x, spos.y, mpos.x, mpos.y);
	if (distance <= mango.radius + stone.radius && mango.body.isStatic === true) {
		Matter.Body.setStatic(mango.body, false);
		score = score + 1;
	}
}

//DISPLAYING TEXT AS CHANCES REACHES 0 OR LESS
function reloadchanceText() {
	if (chances <= 0 && score <8) {
		gamestate1 = "end";
		text("You are out of chances", 10, 200);
		text("Press space to replay", 10, 230);
	}
}

function reloadscoreText() {
	if (score >= 8) {
		gamestate1 = "end";
		text("Great work!", 10, 200);
		text("Press space to replay", 10, 230);
	}
}

//RELOADING PAGE AS THE FOLLOWING CONDITIONS IS PASSED
function reloadchance0fun() {
	if (chances <= 0 && reload === null && score < 8) {
		reload = 1;
		setTimeout(reloadfunction, 500);
	}
}

function reloadscore8fun() {
	if (score >= 8 && reload === null) {
		reload = 1;
		setTimeout(reloadfunction, 50);
	}
}

//RELOADING PAGE VIA CACHE TO GET THE NEW GAME
function reloadfunction() {
	document.location.reload(false);
}
