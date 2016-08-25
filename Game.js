var gameCanvas = document.createElement("canvas");
var myGame;
var tickratez =100;
var fpsz = 60;
var last;
var keyLeft = 37;
var keyUp = 38;
var keyRight = 39;
var keyDown	 = 40;
var t =0.0;
var yourWorld = {maxX:800,maxY:10000,minX:0,minY:0};
function init(){
	gameCanvas.width = 800;
	gameCanvas.height = 700;
	document.body.insertBefore(gameCanvas, document.body.childNodes[0]);
	last = new Date().getTime();
	myGame = new Game(fpsz,tickratez,gameCanvas);
	var player = new PlayerSquare(100,100,gameCanvas);
	myGame.objects.push(player);
	myGame.player = player;
	myGame.objects.push(new grid(100,gameCanvas));
}



window.onload = init;