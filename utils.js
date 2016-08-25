function clamp(value, min, max){
    return Math.min(Math.max(min, Math.min(value,max)));
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