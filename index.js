'use strict';

global.Promise = require('bluebird');

global.get = Promise.promisify(require('request'));

global.post = Promise.promisify(require('request').post);

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