"use strict";

var meta = module.parent.require('./meta');
var nconf = require.main.require('nconf');
var url = require('url');

(function(module)
{
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
				if(b.indexOf(url.parse(nconf.get('url')).hostname) !== -1) return 'href="'+b;
				var pattern = /(\.gif|\.jpg|\.jpeg|\.png|\.svg|youtube\.com)/i;
				if(pattern.test(b)) return 'href="'+b;
				var pattern = /^((http|https):\/\/)/;
				if(!pattern.test(b)) return 'href="'+b; // b = "http://" + b;
				return 'href="'+url_prefix+encodeURIComponent(b)+'" target="_blank';
			});
		}
		callback(null, data);
	};
	module.exports = postlink;
}(module));
