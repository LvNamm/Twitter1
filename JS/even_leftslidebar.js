let list_btn = document.querySelectorAll(".left-slide-bar__link");
let x = [
  "../HTML/Home.html",
  "../HTML/Home.html",
  "../HTML/Explore.html",
  "../HTML/Notification.html",
  "../HTML/Messages.html",
  "../HTML/Bookmarks.html",
  "../HTML/Lists.html",
  "../HTML/Profile.html",
  "../HTML/from_dn.html",
  "../HTML/Home.html",
  "../HTML/Profile.html",
];
for (let i = 0; i < list_btn.length; i++) {
  list_btn[i].addEventListener("click", function () {
    location.assign(x[i]);
  });
}
$("body div:eq(0)").addClass("dad_left-slide-bar");
