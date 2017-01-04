'use strict';

global.now = () =>{
	return new Date().getTime();
}

global.time = () =>{
	return Math.round(new Date().getTime()/1000);
}