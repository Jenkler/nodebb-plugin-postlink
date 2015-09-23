"use strict";

var meta = module.parent.require('./meta');

(function(module) {
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
		if (!data || !data.postData || !data.postData.content || !meta.config['postlink:urlprefix'])
		{
			return callback(null, data);
		}

		var regex = /href="([^\'\"]+)/g;
		var url_prefix = meta.config['postlink:urlprefix'];
		if(data.postData.content.match(regex))
		{
			data.postData.content = data.postData.content.replace(regex, function(a, b)
			{
				var pattern = /^((http|https):\/\/)/;
				if(!pattern.test(b)) b = "http://" + b;
				return 'href="'+url_prefix+encodeURIComponent(b);
			});
		}
		callback(null, data);
	};
	module.exports = postlink;
}(module));
