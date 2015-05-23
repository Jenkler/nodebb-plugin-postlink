(function(module) {
	"use strict";
	var postlink = {};

	postlink.parse = function(data, callback)
	{
		if (!data || !data.postData || !data.postData.content)
		{
			return callback(null, data);
		}
		
		var proxy_url = 'https://www.google.com/?q=';
		var regex = /href="([^\'\"]+)/g;

		if(data.postData.content.match(regex))
		{
			data.postData.content = data.postData.content.replace(regex, function(a, b)
			{
				return proxy_url+encodeURIComponent(b);
			});
		}

		callback(null, data);
	};

	module.exports = postlink;
}(module));
