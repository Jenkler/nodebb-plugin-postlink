<form class="postlink-settings" role="form">
  <div class="row">
    <div class="col-sm-2 col-xs-12 settings-header">Postlink</div>
    <div class="col-sm-10 col-xs-12">
      <p class="lead">If you need to add a prefix to outbound urls in the posts</p>
      <div class="form-group">
        <label for="urlprefix">URL prefix</label>
        <input class="form-control" id="urlprefix" name="urlprefix" placeholder="Enter prefix before your url." title="URL prefix" type="text">
      </div>
      <div class="checkbox">
        <label for="onlyguest" class="mdl-js-ripple-effect mdl-js-switch mdl-switch">
          <input class="mdl-switch__input" id="onlyguest" name="onlyguest" type="checkbox">
          <span class="mdl-switch__label"><strong>Only for guest</strong></span>
        </label>
      </div>
    </div>
  </div>
</form>

<button class="floating-button mdl-button mdl-button--colored mdl-button--fab mdl-js-button mdl-js-ripple-effect" id="save">
  <i class="material-icons">save</i>
</button>
