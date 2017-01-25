'use strict';

global.Promise = require('bluebird');

const request = require('request-promise');
const crypto = require('crypto');

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

global.encode = (data) => {
	try{
        let key = "w1HRjViksi7inHXv";
        let options = {
            algorithm: 'aes-128-ecb',
            input_encoding: 'utf-8',
            output_encoding: 'base64'
        };
        let algorithm = options.algorithm || "aes-128-ecb";
        let input_encoding = options.input_encoding || "utf8";
        let output_encoding = options.output_encoding || "base64";
        let iv = options.iv || "";
        let auto_padding = options.auto_padding || true;
        let cipher = crypto.createCipheriv(algorithm, key, iv);
        cipher.setAutoPadding(auto_padding);
        let cipher_chunks = [];
        cipher_chunks.push(cipher.update(data, input_encoding, output_encoding));
        cipher_chunks.push(cipher.final(output_encoding));
        let cipher_str = cipher_chunks.join('');
        cipher_chunks.length = 0;
        cipher_chunks = undefined;
    	cipher_str = cipher_str.replace(/\+/g, "-");
    	cipher_str = cipher_str.replace(/\//g, "_");
        return cipher_str;
    }catch(e){
    	return "";
    }
}

global.decode = (data) => {
	try{
        let key = "w1HRjViksi7inHXv";
    	data = data.replace(/\-/g, "+");
    	data = data.replace(/\_/g, "/");
        let options = {
            algorithm: 'aes-128-ecb',
            input_encoding: 'base64',
            output_encoding: 'utf-8'
        };
        let algorithm = options.algorithm || "aes-128-ecb";
        let input_encoding = options.input_encoding || "base64";
        let output_encoding = options.output_encoding || "utf8";
        let iv = options.iv || "";
        let auto_padding = options.auto_padding || true;
        let decipher = crypto.createDecipheriv(algorithm, key, iv);
        decipher.setAutoPadding(auto_padding);
        let decipher_chunks = [];
        decipher_chunks.push(decipher.update(data, input_encoding, output_encoding));
        decipher_chunks.push(decipher.final(output_encoding));
        let decipher_text = decipher_chunks.join('');
        decipher_chunks.length = 0;
        decipher_chunks = undefined;
        return decipher_text;
    }catch(e){
    	return "";
    }
}