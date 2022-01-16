$('.lop_phu').click(function () {
    $('.lop_phu').hide()
    $('.edit_profile').hide()
})
let user = JSON.parse(localStorage.getItem('user'))
let list_user = JSON.parse(localStorage.getItem('listUser'))
console.log(user)
$('.user_name').text(user.fullname)
$('.left-slide-bar__profile__img').attr('src', user.img)
$('.full_name > span').text(user.fullname)
$('.phan_than__avata').attr('src', user.img)
$('.email_name').text(user.username)
$('.nick_name > span').text(user.username)
$('.bio').text(user.bio)
let following = user.followed.length
let follower = 0
for (let i = 0; i < list_user.length; i++) {
    for (let j = 0; j < list_user[i].followed.length; j++) {
        if (list_user[i].followed[j] == user.username)
            follower = follower + 1
    }
}
$('.so_the_a:eq(0)').text(following)
$('.so_the_a:eq(1)').text(follower)
console.log(follower)

/* Sự kiện khi nhấn edit profile*/
$('.edit-prf').click(function () {
    console.log('ok')
    $('.lop_phu').show()
    $('.edit_profile').show()
    $('.inputname').val(user.fullname)
})

/*Sự kiện khi thay đổi tên*/
$('.btnchagename').click(function () {
    let fullname = $('.inputname').val()
    if (/^[a-zA-Z\săâưôơéèẻẹếềểệễýỵỳỷùúụủũừứựửíìịỉóòọỏáàạảấầẩậắằằặđ]{2,}$/i.test(fullname)) {
        for (let i = 0; i < list_user.length; i++) {
            if(list_user[i].username==user.username){
                list_user[i].fullname = fullname
                console.log(list_user[i])
                localStorage.setItem('listUser',JSON.stringify(list_user))
                break
            }
        }
        let listtweet = JSON.parse(localStorage.getItem('listtweet'))
        for(let i = 1;i<listtweet.length;i++){
            if(listtweet[i].user.username==user.username){
                listtweet[i].user.fullname = fullname
                console.log(listtweet[i].user)
            }
            for(let h=0;h<listtweet[i].comment.length;h++){
                if(listtweet[i].comment[h].user.username==user.username){
                    listtweet[i].comment[h].user.fullname = fullname
                }
            }
        }
        user.fullname = fullname
        console.log(user)
        localStorage.setItem('user',JSON.stringify(user))
        localStorage.setItem('listtweet',JSON.stringify(listtweet))
        alert('Chỉnh sửa thành công')
    }
    else{
        alert('Tên không phù hợp')
    }
})

/* Sự kiện đổi ảnh đại diện*/
$('.btnchangeavata').click(function(){
    if(img_url==undefined)
        alert('Bạn chưa chọn ảnh')
    else{
        for (let i = 0; i < list_user.length; i++) {
            if(list_user[i].username==user.username){
                list_user[i].img = img_url
                localStorage.setItem('listUser',JSON.stringify(list_user))
                break
            }
        }
        let listtweet = JSON.parse(localStorage.getItem('listtweet'))
        for(let i = 1;i<listtweet.length;i++){
            if(listtweet[i].user.username==user.username){
                listtweet[i].user.img = img_url
            }
            for(let h=0;h<listtweet[i].comment.length;h++){
                if(listtweet[i].comment[h].user.username==user.username){
                    listtweet[i].comment[h].user.img = img_url
                }
            }
        }
        user.img = img_url
        localStorage.setItem('listtweet',JSON.stringify(listtweet))
        localStorage.setItem('user',JSON.stringify(user))
        alert("Thay đổi ảnh thành công")
    }
})
let img_url = undefined
$('#file').change((e)=>{
    check = true
    let file = e.target.files
    const reader = new FileReader()
    reader.readAsDataURL(file[0])
    reader.addEventListener('load',(e)=>{
        img_url = reader.result
    })

})

/*Đổi mk*/
$('.btnchangepass').click(function(){
    let oldpass = $('#oldpass').val()
    if(oldpass==user.pass){
        let newpass = $('#newpass').val()
        if( /^[a-z0-9_-]{6,18}$/i.test(newpass)){
            let renewpass = $('#renewpass').val()
            if(renewpass == newpass){
                for (let i = 0; i < list_user.length; i++) {
                    if(list_user[i].username==user.username){
                        list_user[i].pass = newpass
                        localStorage.setItem('listUser',JSON.stringify(list_user))
                        break
                    }
                }
                alert('Thay đổi mật khẩu thành công')
            }
            else{
                alert('Dữ liệu nhập phù hợp hãy kiểm tra lại')
            }
        }
        else{
            alert('Dữ liệu nhập phù hợp hãy kiểm tra lại')
        }
    }
    else{
        alert('Dữ liệu nhập phù hợp hãy kiểm tra lại')
    }
})


show()
function show(){
    let list_tweet = JSON.parse(localStorage.getItem('listtweet'))
    let text = ``
    for(let i=list_tweet.length-1;i>0;i--){
        let check_user = false
        for(let j=0;j<user.followed.length;j++){
            if(list_tweet[i].user.username == user.username){
                check_user = true
                console.log('ok')
                break
            }
        }
        if(check_user==true){

        let display = undefined
        let liked = undefined
        let classlike = ''
        if(list_tweet[i].like.indexOf(user.username)==-1){
            liked = 'none'
            classlike = ''
        }
        else{
            classlike = 'liked'
            liked = 'liked'
        }
        if(list_tweet[i].url == undefined){
            display = 'none'
        }
        else
            display = 'block'

        text = text+`<div class="container-fluid">
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
                        <div><span class="nick_name">${list_tweet[i].user.fullname}</span></div>
                    </a>
                    <div class="noi_tat">
                        <span>${list_tweet[i].user.username}</span>
                    </div>
                    <div class="title_happening_child"><span>.</span></div>
                    <a href="#" style="text-decoration: none; color : rgb(83, 100, 113);">
                        <div><span>${(new Date(list_tweet[i].date)).getDate()+'-'+((new Date(list_tweet[i].date)).getMonth()+1)+'-'+(new Date(list_tweet[i].date)).getFullYear()}</span></div>
                    </a>
                </div>
                <div>
                <i class="fas fa-trash">
                <p style='display:none'> ${list_tweet[i].id}</p>
                </i>
                    
                </div>
            </div>

            <div><span>${list_tweet[i].text}</span></div>
            <div><img class="img__container " src="${list_tweet[i].url}" alt="" style ="display:${display}">
            </div>
            <div class="row" style="margin-top: 10px;">
                <div class="col icontweet "><i class="iconn bi bi-chat icomment"></i>
                    <p class="opition_tweet comment"> ${list_tweet[i].comment.length}</p>
                </div>
                <div class="col icontweet"><i class="iconn  iretweet bi bi-arrow-repeat"></i>
                    <p class="opition_tweet retweet"> 2.9k </p>
                </div>
                <div class="col icontweet"><i class="iconn ilike bi bi-heart ${classlike}"  id="${list_tweet[i].id}"></i>
                <i class="iconn ilike bi bi-heart"  id="i${list_tweet[i].id}" style="display:none">${liked}</i>
                    <p class="opition_tweet like"> ${list_tweet[i].like.length} </p>
                </div>
                <div class="col icontweet "><i class="iconn ishare bi bi-box-arrow-up"></i>
                    <p class="opition_tweet share"></p>
                </div>
            </div>
        </div>
    </div>
    </div>`
        text = text +`<ul id="myUL${list_tweet[i].id}">`
        for(let j =0;j<list_tweet[i].comment.length;j++){
            text = text +`<li>
            <div>
                <img src="${list_tweet[i].comment[j].user.img}" alt="">
                <h6>${list_tweet[i].comment[j].user.fullname}</h6>
            </div>
            <p style="margin-top:10px;">${list_tweet[i].comment[j].text}</p>
        </li>`
        }
        text = text+`</ul>
        <div class="write_comment" id = 'div${list_tweet[i].id}'>
            <input type="text" placeholder="Viết bình luận ...">
            <button class="btn_comment">Bình luận</button>
            <p style="display:none">${list_tweet[i].id}</p>
        </div>`
    }
}
    $('.bai_dang').html(text)

    $('.btn_comment').click(function(){
        let input = this.parentElement.querySelector('input').value
        let id = this.parentElement.querySelector('p').textContent
        for(let i=1;i<list_tweet.length;i++){
            if(list_tweet[i].id == id){
                let com = {
                    user: user,
                    text:input
                }
                list_tweet[i].comment.push(com)
                $(`#myUL${id}`).append(`<li>
                <div>
                    <img src="${user.img}" alt="">
                    <h6>${user.fullname}</h6>
                </div>
                <p style="margin-top:10px;">${input}</p>
            </li>`)
            localStorage.setItem('listtweet',JSON.stringify(list_tweet))
            console.log(list_tweet)
            this.parentElement.querySelector('input').value = ''
            break;
            }
        }

    })

    /* Sự kiện khi bấm like*/
    $('.ilike').click(function(){
        if(this.parentElement.querySelector(`#i${this.id}`).textContent=='none'){
            for(let i=1;i<list_tweet.length;i++){
                if(list_tweet[i].id==this.id){
                    this.parentElement.querySelector(`#i${this.id}`).textContent='like'
                    list_tweet[i].like.push(user.username)
                    this.parentElement.querySelector('p').textContent = list_tweet[i].like.length
                    this.classList.add("liked");
                    localStorage.setItem('listtweet',JSON.stringify(list_tweet))
                }
            }
        }
        else{
            for(let i=1;i<list_tweet.length;i++){
                if(list_tweet[i].id==this.id){
                    list_tweet[i].like = list_tweet[i].like.filter(item => item !== user.username)
                    this.parentElement.querySelector('p').textContent = list_tweet[i].like.length
                    this.classList.remove("liked");
                    this.parentElement.querySelector(`#i${this.id}`).textContent='none'
                    localStorage.setItem('listtweet',JSON.stringify(list_tweet))
                }
            }
        }
        // for(let i=1;i<list_tweet.length;i++){
        //     if(list_tweet[i].id==this.id){
        //         list_tweet[i].like.push(user.username)
        //         this.parentElement.querySelector('p').textContent = list_tweet[i].like.length
        //     }
        // }
    })
    /* Sự kiện khi bấm xóa bài đăng*/
    $('.fa-trash').click(function(){
        let id_tweet = this.querySelector('p').textContent
        console.log(id_tweet==2)
        for(let i=1;i<list_tweet.length;i++){
            if(list_tweet[i].id == id_tweet){
                if(list_tweet[i].user.username==user.username){
                list_tweet = list_tweet.filter(item => item !== list_tweet[i])
                break}
                else{
                    alert("Mắc mớ gì đi xóa bài người ta dợ :3")
                }
            }

        }
        localStorage.setItem('listtweet',JSON.stringify(list_tweet))
            console.log(list_tweet)
            show()
    })
}


/* Hiện thị những người chưa follow bên trái slide bar*/
display_usernotfollow('')
function display_usernotfollow(string){
 //   let list_usernotfollow = []
    let texthtml = `<div class="happening">
    <h2>
        <div class=""><span>Who to follow</span></div>
    </h2>
</div>`
    for(let i = 0;i<list_User.length;i++){
        let check_user = false
        for(let j=0;j<user.followed.length;j++){
            if(list_User[i].username==user.followed[j] ||list_User[i].username.indexOf(string)==-1){
                check_user = true
                break
            }
        }
        if(check_user==false){
            texthtml = texthtml + `<div class="right_slide_bar-container">
            <div class="row">
                <div class="col-2"><img class="anh_avata"
                        src="${list_User[i].img}" alt="">
                </div>
                <div class="col-10" style="display: flex; justify-content: space-between;">
                    <div class="Content_right"><a href="#">
                            <div class="Content_right__child1 nick_name"><span>${list_User[i].fullname}</span></div>
                            <div class="Content_right__child2"><span>${list_User[i].username}</span></div>
                        </a></div>
                    <div><button type="button" class="btn btn-dark btnfollow"><span style="width: 43px;
                        height: 30px; padding-top: 0;">Follow</span></button>
                        <p style = 'display:none'>${list_User[i].username}</p>
                        </div>
                </div>
            </div>
            </div>`
        }
    }
    $('.right_slide_bar__child').html(texthtml)
    $('.btnfollow').click(function(){
        let username = this.parentElement.querySelector('p').textContent
        let j =0
        for(let i=0;i<list_User.length;i++){
            if(user.username == list_User[i].username)
                j = i
        }
        user.followed.push(username)
        localStorage.setItem('user',JSON.stringify(user))
        list_User[j].followed.push(username)
        localStorage.setItem('listUser',JSON.stringify(list_User))
        console.log(list_User)
        display_usernotfollow('')
        show()
    })
}