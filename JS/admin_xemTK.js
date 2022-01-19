$(".back_admin").click(function () {
  location.assign("../HTML/admin.html");
});

// show tweet
var xem_tk = JSON.parse(localStorage.getItem("xemTK_admin"));
var list_User = JSON.parse(localStorage.getItem("listUser"));
var list_tweet = JSON.parse(localStorage.getItem("listtweet"));
for (let i = 0; i < list_User.length; i++) {
  if (list_User[i].username == xem_tk) {
    xem_tk = list_User[i];
    break;
  }
}
$(".full_name span").text(xem_tk.fullname);
$(".nick_name span:eq(0)").text(xem_tk.username);
$(".so_the_a:eq(0)").text(xem_tk.followed.length);

let dem = 0;
for (let i = 0; i < list_User.length; i++) {
  for (let j = 0; j < list_User[i].followed.length; j++) {
    if (xem_tk.username == list_User[i].followed[j]) {
      dem = dem + 1;
      break;
    }
  }
}
$(".so_the_a:eq(1)").text(dem);

$(".bio").text(xem_tk.bio);
$(".phan_than__avata").attr("src", xem_tk.img);

dem = 0;
for (let i = 1; i < list_tweet.length; i++) {
  if (list_tweet[i].user.username == xem_tk.username) {
    dem = dem + 1;
  }
}
$(".so_baidang").text(`${dem} Tweets`);

show();
function show() {
  console.log(list_tweet);
  let text = ``;
  for (let i = list_tweet.length - 1; i > 0; i--) {
    if (xem_tk.username == list_tweet[i].user.username) {
      // let check_user = false;
      // for (let j = 0; j < user.followed.length; j++) {
      //   if (list_tweet[i].user.username == user.followed[j]) {
      //     check_user = true;
      //     console.log("ok");
      //     break;
      //   }
      // }
      // if (check_user == true) {
      let display = undefined;
      // let liked = undefined;
      // let classlike = "";
      // if (list_tweet[i].like.indexOf(user.username) == -1) {
      //   liked = "none";
      //   classlike = "";
      // } else {
      //   classlike = "liked";
      //   liked = "liked";
      // }
      if (list_tweet[i].url == undefined) {
        display = "none";
      } else display = "block";

      text =
        text +
        `<div class="container-fluid">
        <div class="Trend_child Trend_child1 row">
        <div class="col-1" style="padding-left:0 ;">
            <a href="#">
                <img class="anh_avata" src="${list_tweet[i].user.img}" alt="">
            </a>
        </div>
        <div class="col-11" style="padding-right:0 ;">
            <div style=" display: flex; justify-content: space-between; ">
                <div class="" style="display: flex; color : rgb(83, 100, 113);">
                    <a href="#" style="text-decoration: none; color: #000;">
                        <div><span class="nick_name">${
                          list_tweet[i].user.fullname
                        }</span></div>
                    </a>
                    <div class="noi_tat">
                        <span>${list_tweet[i].user.username}</span>
                    </div>
                    <div class="title_happening_child"><span>.</span></div>
                    <a href="#" style="text-decoration: none; color : rgb(83, 100, 113);">
                        <div><span>${
                          new Date(list_tweet[i].date).getDate() +
                          "-" +
                          (new Date(list_tweet[i].date).getMonth() + 1) +
                          "-" +
                          new Date(list_tweet[i].date).getFullYear()
                        }</span></div>
                    </a>
                </div>
                <div>
                <i class="fas fa-trash">
                <p style='display:none'> ${list_tweet[i].id}</p>
                </i>
                    
                </div>
            </div>

            <div><span>${list_tweet[i].text}</span></div>
            <div><img class="img__container " src="${
              list_tweet[i].url
            }" alt="" style ="display:${display}">
            </div>
            <div class="row" style="margin-top: 10px;">
                <div class="col icontweet "><i class="iconn bi bi-chat icomment"></i>
                    <p class="opition_tweet comment"> ${
                      list_tweet[i].comment.length
                    }</p>
                </div>
                <div class="col icontweet"><i class="iconn  iretweet bi bi-arrow-repeat"></i>
                    <p class="opition_tweet retweet"> 2.9k </p>
                </div>
                <div class="col icontweet"><i class="iconn ilike bi bi-heart"  id="${
                  list_tweet[i].id
                }"></i>
                <i class="iconn ilike bi bi-heart"  id="i${
                  list_tweet[i].id
                }" style="display:none"></i>
                    <p class="opition_tweet like"> ${
                      list_tweet[i].like.length
                    } </p>
                </div>
                <div class="col icontweet "><i class="iconn ishare bi bi-box-arrow-up"></i>
                    <p class="opition_tweet share"></p>
                </div>
            </div>
        </div>
    </div>
    </div>`;
      text = text + `<ul id="myUL${list_tweet[i].id}">`;
      for (let j = 0; j < list_tweet[i].comment.length; j++) {
        text =
          text +
          `<li>
            <div>
                <img src="${list_tweet[i].comment[j].user.img}" alt="">
                <h6>${list_tweet[i].comment[j].user.fullname}</h6>
            </div>
            <p style="margin-top:10px;">${list_tweet[i].comment[j].text}</p>
        </li>`;
      }
      text = text + `</ul>`;
      // <div class="write_comment" id = 'div${list_tweet[i].id}'>
      //     <input type="text" placeholder="Viết bình luận ...">
      //     <button class="btn_comment">Bình luận</button>
      //     <p style="display:none">${list_tweet[i].id}</p>
      // </div>
      // }
    }
  }
  $(".bai_dang").html(text);

  /* Sự kiện khi bấm xóa bài đăng*/
  $(".fa-trash").click(function () {
    let id_tweet = this.querySelector("p").textContent;
    console.log(id_tweet == 2);
    for (let i = 1; i < list_tweet.length; i++) {
      if (list_tweet[i].id == id_tweet) {
        list_tweet = list_tweet.filter((item) => item !== list_tweet[i]);
      }
    }
    localStorage.setItem("listtweet", JSON.stringify(list_tweet));
    console.log(list_tweet);
    show();
  });
}
