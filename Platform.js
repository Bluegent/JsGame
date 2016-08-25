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