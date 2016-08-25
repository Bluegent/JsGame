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