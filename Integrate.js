function State(x,y,vx,vy){
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
}
function Derivative(dx,dy,dvx,dvy){
	this.dx = dx;
	this.dy = dy;
	this.dvx = dvx;
	this.dvy = dvy;
}

function evaluate(initial, t, dt, d,accel){
	var state = new State(0.0,0.0,0.0,0.0);
	state.x = initial.x + d.dx * dt;
	state.y = initial.y + d.dy * dt;
	state.vx = initial.vx + d.dvx * dt;
	state.vy = initial.vy + d.dvy * dt;
	
	var output = new Derivative(0.0,0.0,0.0,0.0);
	output.dx = state.vx;
	output.dy = state.vy;
	output.dvx = accel(state,t+dt,0);
	output.dvy = accel(state,t+dt,1);
	//console.log(output);
	return output;
}

function integrate(state,t,dt,accel){
	//console.log('---------------');
	//console.log(state);
	//console.log(' t:'+t+' dt:'+dt);
	var a = new Derivative(0.0,0.0,0.0,0.0);
	var b = new Derivative(0.0,0.0,0.0,0.0);
	var c = new Derivative(0.0,0.0,0.0,0.0);
	var d = new Derivative(0.0,0.0,0.0,0.0);
	
	a = evaluate(state,t, 0.0, new Derivative(0.0,0.0,0.0,0.0),accel);
	b = evaluate(state, t, dt*0.5, a,accel);
	c = evaluate(state, t, dt*0.5, b,accel);
	d = evaluate(state, t, dt, c,accel);
	
	var dxdt = 1.0/6.0 * (a.dx+2.0 *(b.dx + c.dx) +d.dx);
	var dvxdt = 1.0/6.0 * (a.dvx+2.0 *(b.dvx + c.dvx) +d.dvx);
	var dydt = 1.0/6.0 * (a.dy+2.0 *(b.dy + c.dy) +d.dy);
	var dvydt = 1.0/6.0 * (a.dvy+2.0 *(b.dvy + c.dvy) +d.dvy);
	
	state.x = state.x + dxdt * dt;
	state.vx = state.vx + dvxdt * dt;
	state.y = state.y + dydt * dt;
	state.vy = state.vy + dvydt * dt;
	//console.log(state);
}