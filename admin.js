'use strict';

define('admin/postlink', ['settings'], function(Settings) {
  let ACP = {};
  ACP.init = function() {
    Settings.load('postlink', $('.postlink-settings'));
    $('#save').on('click', function() {
      Settings.save('postlink', $('.postlink-settings'), function() {
        app.alert({
          alert_id: 'postlink-saved',
          message: 'Updated Postlink settings',
          timeout: 2000,
          title: 'Settings Saved',
          type: 'success'
        });
      });
    });
  };
  return ACP;
});
