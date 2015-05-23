(function(module) {
	"use strict";
	var postlink = {};

	
	postlink.addAdminNavigation = function(header, callback) {
	header.plugins.push({
	route: '/plugins/postlink',
	icon: 'fa-link',
	name: 'Postlink'
	});
	callback(null, header);
	};
	
	function renderAdmin(req, res, next)
	{
		res.render('admin/postlink', {});
	}

	postlink.init = function(params, callback)
	{
		params.router.get('/admin/plugins/postlink', params.middleware.admin.buildHeader, renderAdmin);
		params.router.get('/api/admin/plugins/postlink', renderAdmin);
		callback();
	};

	
	
	
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
				return 'href="'+proxy_url+encodeURIComponent(b);
			});
		}
//		console.log(data.postData);

		callback(null, data);
	};

	module.exports = postlink;
}(module));
