<h1>Postlink</h1>
<form>
  <p>If you need to add a prefix to outbound links in the posts</p><br />
  <p>
    <label for="URL prefix">URL prefix</label>
    <input type="text" data-field="postlink:urlprefix" title="URL prefix" class="form-control" placeholder="URL prefix"><br />
  </p>
</form>

<button class="btn btn-lg btn-primary" id="save">Save</button>

<script>
  require(['admin/settings'], function(Settings) {
    Settings.prepare();
  });
</script>
