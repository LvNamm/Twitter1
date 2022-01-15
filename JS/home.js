let user = JSON.parse(localStorage.getItem('user'))
console.log(user)
let img_avatar = document.querySelectorAll(".avatar")
let src_img = undefined
if(user.img == undefined)
    src_img = '../IMG/avadefault.png'
else
    src_img = user.img
for(let i=0;i<img_avatar.length;i++){
    img_avatar[i].src = src_img
}
$('.user_name').first().text(user.fullname)
$('.email_name').first().text(user.username)



let a = `<div style="display: flex;" class="user">
<div class="col-1" style="height:100%;padding: 10px 0 0 20px;">
    <img class="left-slide-bar__profile__img" src="https://lh3.googleusercontent.com/ogw/ADea4I7RSK_zDG4YInwsRx2-vdpUcNi0XuMSMdwKDzN_DQ=s32-c-mo" alt="" style="width:50px;height:50px;cursor:pointer">
</div>
<div class="col-11">
    <div style="display: flex; align-items: center;justify-content: space-between;">
        <div>
            <div>
                <a href="" class="nick_name">
                    LuongNam
                </a>
                <p class="mail">
                    @LuongVanNam
                </p>
            </div>
        </div>
        <button>
            Follow
        </button>
    </div>
    <p class="about">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi sint quis accusantium. Quidem
        tenetur sunt eius ipsam dolore? Officiis distinctio ratione quaerat minima dolorum ipsa
        similique consectetur assumenda praesentium quam.
    </p>
</div>
</div>`

