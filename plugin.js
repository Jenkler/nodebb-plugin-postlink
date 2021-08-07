'use strict';

const meta = require.main.require('./src/meta');
const nconf = require.main.require('nconf');
const url = require('url');

const renderAdmin = async (req, res) => {
  res.render('admin/postlink', {});
}
const updatePostContent = async (data) => {
  let settings = await meta.settings.get('postlink');
  if((settings?.onlyguest ?? '') == 'on' && data.uid > 0 || (settings?.urlprefix ?? '') == '') return data;
  let posts;
  if(data?.posts ?? '') posts = data.posts;
  else if(data?.teasers ?? '') posts = data.teasers;
  let regex = /href="([^\'\"]+)/g;
  for(let i = 0; i < posts.length; i++) {
    if(posts[i] === undefined) continue;
    posts[i].content = posts[i].content.replace(regex, function(a, b) {
      if(b.indexOf('/') === 0) return 'href="' + b;
      let pattern = /^((http|https):\/\/)/;
      if(!pattern.test(b)) b='http://' + b;
      if(b.indexOf(url.parse(nconf.get('url')).hostname) !== -1) return 'href="' + b;
      pattern = /(\.gif|\.jpg|\.jpeg|\.png|\.svg|youtube\.com)/i;
      if(pattern.test(b)) return 'href="' + b;
      return 'href="'+settings.urlprefix+encodeURIComponent(b)+'" target="_blank';
    });
  }
  if(data?.posts ?? '') data.posts = posts;
  else if(data?.teasers ?? '') data.teasers = posts;
  return data;
}

exports.filterAdminHeaderBuild = async (data) => {
  data.plugins.push({
    icon: 'fa-link',
    name: 'Postlink',
    route: '/postlink'
  });
  return data;
};
exports.filterPostGetPosts = async (data) => { return updatePostContent(data); }
exports.filterPostGetPostSummaryByPids = async (data) => { return updatePostContent(data); }
exports.filterTeasersGet = async (data) => { return updatePostContent(data); }
exports.staticAppLoad = async (data) => {
  console.log('Loading Jenkler Postlink plugin ' + require('./package.json').version);
  data.router.get('/admin/postlink', data.middleware.admin.buildHeader, renderAdmin);
  data.router.get('/api/admin/postlink', renderAdmin);
};
