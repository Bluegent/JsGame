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