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