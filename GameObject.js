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