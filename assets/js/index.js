$(function () {
  getUserInfo();
  function getUserInfo() {
    $.ajax({
      url: "/my/userinfo",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      success: function (res) {
        console.log(res);
        renderUserInfo(res.data);
      },
    });
  }

  function renderUserInfo(data) {
    let name = data.nickname || data.username;
    $("#welcome").text("欢迎" + name);
    let first = name[0].toUpperCase();
    if (data.user_pic) {
      $(".text-avatar").hide();
      $('.layui-nav-img').show()
    } else {
      $('.text-avatar').show().text(first)
      $(".layui-nav-img").hide();
    }
  }
});
