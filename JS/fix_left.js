var User = JSON.parse(localStorage.getItem("user"));

$(".email_name").html(User.username);

$(".user_name").html(User.fullname);

$(".left-slide-bar__profile__img").attr("src", User.img);

$(".bi-arrow-left-short").click(function () {
  location.assign("../HTML/Home.html");
});
