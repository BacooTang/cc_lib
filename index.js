'use strict';

global.Promise = require('bluebird');

const request = require('request-promise');

global.get = request.get;

global.post = request.post;

global.now = () =>{
	return new Date().getTime();
}

global.time = () =>{
	return Math.round(new Date().getTime()/1000);
}

global.get_ip_by_interface = (iface)=>{
	const os = require('os');
	const iface_info = os.networkInterfaces()[iface];
	if(iface_info){
		return iface_info[0][address];
	}
}

global.sleep = (time) =>{
	return new Promise((resolve, reject) => {
		setTimeout(() => {
            resolve();
        }, time);
	});
}

global.password = (digits) => {
    let text = ["abcdefghijklmnopqrstuvwxyz",'ABCDEFGHIJKLMNOPQRSTUVWXYZ','1234567890'];
    let rand = (min, max) => {return Math.floor(Math.max(min, Math.random() * (max+1)));}
    let pw = '';
    for(let i=0; i<digits; ++i){
        let strpos = rand(0, text.length-1);
        pw += text[strpos].charAt(rand(0, text[strpos].length-1));
    }
    return pw;
}