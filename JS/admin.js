var list_tk = JSON.parse(localStorage.getItem("listUser"));
if (list_tk != undefined) {
  text = "";
  for (let i = 0; i < list_tk.length; i++) {
    text += `<div class="card col-3" style="width: 18rem;">
      <img src="${list_tk[i].img}"
          class="card-img-top" alt="...">
      <div class="card-body">
          <h5 class="card-title">${list_tk[i].fullname}</h5>
          <p>${list_tk[i].username}</p>
      </div>

      <div class="card-body" style="display: flex; justify-content: space-between;">
          <button class="btn_xoaTK">
              Xóa tài khoản
          </button>
          <p class="userName" style="display: none;">${list_tk[i].username}</p>
          <button class="btn_xemTK">
              Xem tài khoản
          </button>
      </div>
  </div>`;
  }
  $(".phan_than").html(text);
}

// $(".btn_xemTK").click("../HTML/admin_xemTK.html");
$(".btn_xoaTK").click(function () {
  let us = this.parentElement.querySelector(".userName").textContent;
  //   xoa tin nhan
  var list_mess = JSON.parse(localStorage.getItem("mess"));
  if (list_mess != undefined) {
    for (let i = 0; i < list_mess.length; i++) {
      if (list_mess[i][0] == us || list_mess[i][1] == us) {
        list_mess = list_mess.filter((item) => item !== list_mess[i]);
        i = i - 1;
      }
    }
    localStorage.setItem("mess", JSON.stringify(list_mess));
  }

  //
  var list_BaiViet = JSON.parse(localStorage.getItem("listtweet"));
  if (list_BaiViet != undefined) {
    for (let i = 1; i < list_BaiViet.length; i++) {
      if (list_BaiViet[i].user.username == us) {
        list_BaiViet = list_BaiViet.filter((item) => item !== list_BaiViet[i]);
        i = i - 1;
        continue;
      }

      for (let j = 0; j < list_BaiViet[i].comment.length; j++) {
        if (list_BaiViet[i].comment[j].user.username == us) {
          list_BaiViet[i].comment = list_BaiViet[i].comment.filter(
            (item) => item !== list_BaiViet[i].comment[j]
          );
          j = j - 1;
          continue;
        }
      }

      for (let j = 0; j < list_BaiViet[i].like.length; j++) {
        if (list_BaiViet[i].like[j] == us) {
          list_BaiViet[i].like = list_BaiViet[i].like.filter(
            (item) => item !== list_BaiViet[i].like[j]
          );
          break;
        }
      }
    }
    localStorage.setItem("listtweet", JSON.stringify(list_BaiViet));
  }

  for (let j = 0; j < list_tk.length; j++) {
    if (list_tk[j].username == us) {
      list_tk = list_tk.filter((item) => item !== list_tk[j]);
      break;
    }
  }
  localStorage.setItem("listUser", JSON.stringify(list_tk));
});
