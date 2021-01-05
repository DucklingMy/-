//修改ajax配置项 增加url根目录
$.ajaxPrefilter(function (options) {
  // options.url = 'http://ajax.frontend.itheima.net'+ options.url;
  options.url = "http://api-breakingnews-web.itheima.net" + options.url;
  console.log(options.url);
});
