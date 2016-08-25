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
class Game{
	constructor(fps, tickrate, canvas){
		this.keys = [37,38,39,40];
		this.keyPressed = new Map();
		for(var i=0;i<this.keys.length;++i){
			this.keyPressed.set(this.keys[i],false);
		}
		this.fps = fps;
		this.tickrate=tickrate;
		this.canvas = canvas;
		this.debugText = "";
		this.context = canvas.getContext("2d");
		this.player = 0;
		this.objects = new Array();	
		window.addEventListener('keydown', this.keyDown.bind(this));
		window.addEventListener('keyup', this.keyUp.bind(this));
		this.inter1 = setInterval(this.update.bind(this), 1000/this.tickrate);
		requestAnimationFrame(this.render.bind(this))
	}
	keyDown(e){
		if(this.keyPressed.has(e.keyCode))
			this.keyPressed.set(e.keyCode,true);
	}
	keyUp(e){
		if(this.keyPressed.has(e.keyCode))
			this.keyPressed.set(e.keyCode,false);
	}
	isKey(code){
		return this.keyPressed.get(code);
	}
	update(){	
		this.debugText = this.getKeys();
		var dt = unit();
		for(var i=0;i<this.objects.length;++i)
			this.objects[i].update(dt);
		t+=dt;
	}
	collidesWith(obj,type){
		for(var i=0;i<this.objects.length;++i){
			if(this.objects[i].type ==type){
				if(collide(obj,this.objects[i]))
					return this.objects[i];
			}
		}
		return 0;
	}
	getKeys(){
		var out="";
		out+= 'x:'+this.player.state.x.toPrecision(3)+' y:'+this.player.state.y.toPrecision(3) +' sx:'+this.player.state.vx.toPrecision(3) +' sy:'+this.player.state.vy.toPrecision(3);
		return out;
	}
	render(){
	   
		this.context.setTransform(1,0,0,1,0,0);//reset the transform matrix as it is cumulative
		this.clear();
		
		//Clamp the camera position to the world bounds while centering the camera around the player                                             
		var camX = clamp(-this.player.state.x + gameCanvas.width/2, yourWorld.minX, yourWorld.maxX - gameCanvas.width);
		var camY = clamp(-this.player.state.y + gameCanvas.height/2, yourWorld.minY, yourWorld.maxY - gameCanvas.height);
		this.context.translate( camX, camY );   
		
		this.context.font = "20px Arial bold";
		this.context.fillStyle = "red";
		this.context.fillText(this.debugText,this.player.state.x,this.player.state.y);
		
		var func = this.render.bind(this);
		setTimeout(function(){requestAnimationFrame(func)},1000/this.fps);

		
		for(var i=0;i<this.objects.length;++i){
			this.objects[i].render();
		}	
	}
	clear(){
		this.context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
	}
}
function clamp(value, min, max){
    return Math.min(Math.max(min, Math.min(value,max)));
}
class GameObject{
	constructor(x,y,width, height,canvas){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height=height;
		this.context = canvas.getContext("2d");
		this.type = 0; //0-nothing, 1-player, 2-stage element
		this.speedX = 0;
		this.speedY = 0;
	}
	render(){

	}
	update(dt){
	
	}
	drawOrigin(){
		this.context.fillStyle = "red";
		this.context.fillRect(this.x,this.y,5,5);
	}
}
class Platform extends GameObject{
	constructor(x, y, width, height, canvas){
		super(x,y,width,height,canvas);
		this.type= 2;
	}
  update(dt){
  
  }
  render(){
  	this.context.fillStyle = "black";
	this.context.fillRect(this.x,this.y,this.width, this.height);
	super.drawOrigin();
  }
}
class PlayerSquare extends GameObject{
	constructor(x,y,canvas){
		super(x,y,20,30,canvas);
		this.onGround = false;
		this.type=1;
		this.maxX = 0.4;
		this.maxY = 3;
		this.accelX = 1000;
		this.jumpSpeed= 300;
		this.accelY = 1000;
		this.state = new State(x,y,0.0,0.0);
	}
	update(dt){
		integrate(this.state,t,dt,this.accel.bind(this));
		if(this.state.x > yourWorld.maxX-this.width){
			this.state.x = yourWorld.maxX-this.width;
			this.state.vx =0;
		}
		if(this.state.x<0){
			this.state.x=0;
			this.state.vx =0;
		}
		if(this.state.y > gameCanvas.height - this.height){
			this.state.y=gameCanvas.height - this.height;
			this.state.vy=0;
		}
		if(Math.abs(this.state.vx)<0.002)
			this.state.vx =0;
	}
	render(){
		this.context.fillStyle = "black";
		this.context.fillRect(this.state.x,this.state.y,this.width, this.height);		
	}
	accel(state,t,dir){
	if(dir==0){
		if(Math.abs(state.vx)< this.maxX){
			if(myGame.isKey(keyRight))
				return 0.001;
			if(myGame.isKey(keyLeft))
				return -0.001;
		}
		if(state.vx!=0)
			return (state.vx>0?-1:1) * 0.0008;
		return 0;
	}
	else if(dir==1){
		if(Math.abs(state.vy) < this.maxY){
			if(myGame.isKey(keyUp))
				return -0.001;
			if(myGame.isKey(keyDown))
				return 0.001;
		}
		return 0.0004;
	}else
		return 0;
	}
}	
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

function grid(distance,canvas){
	this.context = canvas.getContext("2d");
	this.distance = distance;
	this.update = function(){
	}
	this.render = function(){
		this.context.fillStyle = "black";
		for(var i =0; i<gameCanvas.width+1;++i){
			this.context.fillRect(i*this.distance-0.5,0,1,gameCanvas.height);
		}
		for(var i =0; i<gameCanvas.height+1;++i){
			this.context.fillRect(0,i*this.distance-0.5,gameCanvas.width,1);
		}
	}
}

function unit(){
    var now = new Date().getTime();
	var dt = now - last;
	last= now;	
	return dt;
}
function collide(first,second){
	return (first.x < second.x + second.width  && first.x + first.width  > second.x &&
		first.y < second.y + second.height && first.y + first.height > second.y);
	
}
window.onload = init;
