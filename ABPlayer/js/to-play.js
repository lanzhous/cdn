var Base64Hex =  (function(){
	var encode = function (str) {
		var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; 
		var out, i, len; 
		var c1, c2, c3; 

		len = str.length; 
		i = 0; 
		out = ""; 
		while(i < len) { 
			c1 = str.charCodeAt(i++) & 0xff; 
			if(i == len){ 
				out += base64EncodeChars.charAt(c1 >> 2); 
				out += base64EncodeChars.charAt((c1 & 0x3) << 4); 
				out += "=="; 
				break; 
			} 
			c2 = str.charCodeAt(i++); 
			if(i == len){ 
				out += base64EncodeChars.charAt(c1 >> 2); 
				out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4)); 
				out += base64EncodeChars.charAt((c2 & 0xF) << 2); 
				out += "="; 
				break; 
			} 
			c3 = str.charCodeAt(i++); 
			out += base64EncodeChars.charAt(c1 >> 2); 
			out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4)); 
			out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6)); 
			out += base64EncodeChars.charAt(c3 & 0x3F); 
		}
		return out; 
	} 

	var decode = function(str) {
		var base64DecodeChars = new Array( 
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 
		52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, 
		-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
		15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, 
		-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
		41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1); 
		var c1, c2, c3, c4; 
		var i, len, out; 

		len = str.length; 
		i = 0; 
		out = ""; 
		while(i < len) { 
			/* c1 */ 
			do { 
				c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]; 
			} while(i < len && c1 == -1); 
			if(c1 == -1) 
				break; 

			/* c2 */ 
			do { 
				c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]; 
			} while(i < len && c2 == -1); 
			if(c2 == -1) 
				break; 

			out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4)); 

			/* c3 */ 
			do { 
				c3 = str.charCodeAt(i++) & 0xff; 
				if(c3 == 61) 
				return out; 
				c3 = base64DecodeChars[c3]; 
			} while(i < len && c3 == -1); 
			if(c3 == -1) 
				break; 

			out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2)); 
			/* c4 */ 
			do { 
				c4 = str.charCodeAt(i++) & 0xff; 
				if(c4 == 61) 
				return out; 
				c4 = base64DecodeChars[c4]; 
			} while(i < len && c4 == -1); 
			if(c4 == -1) 
				break; 
			out += String.fromCharCode(((c3 & 0x03) << 6) | c4); 
		} 
		return out; 
	} 
	return {
		encode:encode,
		decode:decode
	}
})();
var authCrypt = (function(){
    var base64Encode = Base64Hex.encode;
	var base64Decode = Base64Hex.decode;
	var time = function() {
		var timeStamp = new Date().getTime();
		return parseInt(timeStamp / 1000);
	}
	var microtime = function(timeFloat) {
		var timeStamp = new Date().getTime();
		var sec = parseInt(timeStamp / 1000);
		return timeFloat ? (timeStamp / 1000) : (timeStamp - (sec * 1000)) / 1000 + ' ' + sec;
	}
	var chr = function(s) {
		return String.fromCharCode(s);
	}
	var ord = function(s) {
		return s.charCodeAt();
	}
	var authcode = function(str, operation, key, expiry) {
		var operation = operation ? operation : 'DECODE';
		var key = key ? key : '';
		var expiry = expiry ? expiry : 0;
		var ckey_length = 4;
		key = md5(key);
		var keya = md5(key.substr(0, 16));
		var keyb = md5(key.substr(16, 16));
		if(ckey_length){
			if(operation == 'DECODE'){
				var keyc = str.substr(0, ckey_length);
			}else{
				var md5_time = md5(microtime());
				var start = md5_time.length - ckey_length;
				var keyc = md5_time.substr(start, ckey_length)
			}
		}else{
			var keyc = '';
		}

		var cryptkey = keya + md5(keya + keyc);
		var strbuf;
		if (operation == 'DECODE') {
			str = str.substr(ckey_length);
			strbuf = base64Decode(str);
		} else {
			expiry = expiry ? expiry + time() : 0;
			tmpstr = expiry.toString();
			if (tmpstr.length >= 10){
				str = tmpstr.substr(0, 10) + md5(str + keyb).substr(0, 16) + str;
			}else {
				var count = 10 - tmpstr.length;
				for (var i = 0; i < count; i++) {
					tmpstr = '0' + tmpstr;
				}
				str = tmpstr + md5(str + keyb).substr(0, 16) + str;
			}
			strbuf = str;
		}
		
		var box = new Array(256);
		for (var i = 0; i < 256; i++) {
			box[i] = i;
		}
		var rndkey = new Array();
		for (var i = 0; i < 256; i++) {
			rndkey[i] = cryptkey.charCodeAt(i % cryptkey.length);
		}
		for (var j = i = 0; i < 256; i++) {
			j = (j + box[i] + rndkey[i]) % 256;
			tmp = box[i];
			box[i] = box[j];
			box[j] = tmp;
		}

		var s = '';
		strbuf = strbuf.split('');
		for (var a = j = i = 0; i < strbuf.length; i++) {
			a = (a + 1) % 256;
			j = (j + box[a]) % 256;
			tmp = box[a];
			box[a] = box[j];
			box[j] = tmp;
			s += chr(ord(strbuf[i])^(box[(box[a] + box[j]) % 256]));
		}
		
		if (operation == 'DECODE') {
			if ((s.substr(0, 10) == 0 || s.substr(0, 10) - time() > 0) && s.substr(10, 16) == md5(s.substr(26) + keyb).substr(0, 16)) {
				s = s.substr(26);
			} else {
				s = '';
			}
		} else {
			s = base64Encode(s);
			var regex = new RegExp('=', "g");
			s = s.replace(regex, '');
			s = keyc + s;
		}
		return s;
	}
	return {
		authcode:authcode,
		encode:function(string,key,expiry){
			var result = authcode(string,"ENCODE",key,expiry);
			result = result.replace(/\+/g,'-');
			result = result.replace(/\//g,'_');
			result = result.replace(/=/g,'.');
			return result;
		},
		decode:function(string,key){
			string = string.replace(/-/g,'+');
			string = string.replace(/_/g,'/');
			string = string.replace(/\./g,'=');
			var result = authcode(string,"DECODE",key);
			return result;
		}
	}
})();