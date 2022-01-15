let user = JSON.parse(localStorage.getItem('user'))
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

