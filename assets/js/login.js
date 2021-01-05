$(function () {
  // 注册显示登录隐藏
  $(".login a").on("click", function () {
    $(".login").hide();
    $(".register").show();
  });

  //   登录显示，注册隐藏
  $(".register a").on("click", function () {
    $(".login").show();
    $(".register").hide();
  });

  //自定义表单验证
  let form = layui.form;
  form.verify({
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    repass: function (value) {
      let pwd = $(".register input[name=password]").val();
      if (pwd !== value) {
        return "两次输入的密码不一致";
      }
    },
  });

  //获取表单注册页面数据发送ajax请求
  let layer = layui.layer;
  $("#regiForm").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data,
      success: function (res) {
        console.log(res);
        if (res.status == 1) {
          return layer.msg(res.message);
        } else {
          layer.msg("注册成功", function () {
            $(".register a").click();
          });
        }
      },
    });
  });

  //获取登录页面表单数据发送ajax请求
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data,
      success: function (res) {
        console.log(res);
        if (res.status === 1) {
          layer.msg("账户或密码错误");
        } else {
          localStorage.setItem("token", res.token);
          layer.msg("登录成功，即将跳转到首页", function () {
            location.href = "/home/index.html";
          });
        }
      },
    });
  });
});
