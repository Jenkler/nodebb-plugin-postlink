(function(module) {
	"use strict";
	var postlink = {};

	function renderAdmin(req, res, next)
	{
		res.render('admin/postlink', {});
	}

	postlink.adminBuild = function(header, callback)
	{
		header.plugins.push({
			route: '/postlink',
			icon: 'fa-link',
			name: 'Postlink'
		});
		callback(null, header);
	};

	postlink.init = function(params, callback)
	{
		params.router.get('/admin/postlink', params.middleware.admin.buildHeader, renderAdmin);
		params.router.get('/api/admin/postlink', renderAdmin);
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
		callback(null, data);
	};
	module.exports = postlink;
}(module));
