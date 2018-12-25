"use strict";

const meta = module.parent.require('./src/meta');
const nconf = require.main.require('nconf');
const url = require('url');

function renderAdmin(req, res, next) {
  res.render('admin/postlink', {});
}

exports.filterAdminHeaderBuild = function(header, callback) {
  header.plugins.push({
    route: '/postlink',
    icon: 'fa-link',
    name: 'Postlink'
  });
  callback(null, header);
};
exports.filterParsePost = function(data, callback) {
  if (!data || !data.postData || !data.postData.content || !meta.config['postlink:urlprefix']) {
    return callback(null, data);
  }
  var regex = /href="([^\'\"]+)/g;
  var url_prefix = meta.config['postlink:urlprefix'];
  if(data.postData.content.match(regex)) {
    data.postData.content = data.postData.content.replace(regex, function(a, b) {
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
exports.staticAppLoad = function(data, callback) {
  console.log('Loading Jenkler Postlink plugin' + require('./package.json').version);
  data.router.get('/admin/postlink', data.middleware.admin.buildHeader, renderAdmin);
  data.router.get('/api/admin/postlink', renderAdmin);
  callback();
};
