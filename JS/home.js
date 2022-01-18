let list_tweet = JSON.parse(localStorage.getItem('listtweet'))
let list_User = JSON.parse(localStorage.getItem('listUser'))
if (list_tweet == undefined)
    list_tweet = [1]
let user = JSON.parse(localStorage.getItem('user'))
let img_avatar = document.querySelectorAll(".avatar")
for (let i = 0; i < img_avatar.length; i++) {
    img_avatar[i].src = user.img
}
$('.user_name').first().text(user.fullname)
$('.email_name').first().text(user.username)


let check_img = false
let img_url = undefined
/*Lấy đường dẫn ảnh*/
$('#file').change((e) => {
    check = true
    let file = e.target.files
    const reader = new FileReader()
    reader.readAsDataURL(file[0])
    reader.addEventListener('load', (e) => {
        img_url = reader.result
    })

})

/*Đăng tweet*/
$('#btn_tweet').click(function () {
    let text = $('#input_text').val()
    console.log($('#input_text').val())
    if (text.trim() == '' && check_img == false) {
        alert('Nothing to show')
    }
    else {
        let today = new Date()
        let tweet = {
            id: list_tweet[0],
            user: user,
            text: $('#input_text').val(),
            url: img_url,
            date: today,
            like: [],
            comment: [],
        }
        list_tweet.push(tweet)
        list_tweet[0] = list_tweet[0] + 1
        $('#input_text').val('')
        img_url = undefined
        check_img = false
        localStorage.setItem('listtweet', JSON.stringify(list_tweet))
        console.log(list_tweet)
        show()
    }
})

// show tweet
show()
function show(){
    console.log(list_tweet)
    let text = ``
    for (let i = list_tweet.length - 1; i > 0; i--) {
        let check_user = false
        for (let j = 0; j < user.followed.length; j++) {
            if (list_tweet[i].user.username == user.followed[j]) {
                check_user = true
                console.log('ok')
                break
            }
        }
        if (check_user == true) {

            let display = undefined
            let liked = undefined
            let classlike = ''
            if (list_tweet[i].like.indexOf(user.username) == -1) {
                liked = 'none'
                classlike = ''
            }
            else {
                classlike = 'liked'
                liked = 'liked'
            }
            if (list_tweet[i].url == undefined) {
                display = 'none'
            }
            else
                display = 'block'

            text = text + `<div class="container-fluid">
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
                        <div><span>${(new Date(list_tweet[i].date)).getDate() + '-' + ((new Date(list_tweet[i].date)).getMonth() + 1) + '-' + (new Date(list_tweet[i].date)).getFullYear()}</span></div>
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
                    <p class="opition_tweet retweet"> 0 </p>
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
            text = text + `<ul id="myUL${list_tweet[i].id}">`
            for (let j = 0; j < list_tweet[i].comment.length; j++) {
                text = text + `<li>
            <div>
                <img src="${list_tweet[i].comment[j].user.img}" alt="">
                <h6>${list_tweet[i].comment[j].user.fullname}</h6>
            </div>
            <p style="margin-top:10px;">${list_tweet[i].comment[j].text}</p>
        </li>`
            }
            text = text + `</ul>
        <div class="write_comment" id = 'div${list_tweet[i].id}'>
            <input type="text" placeholder="Viết bình luận ...">
            <button class="btn_comment">Bình luận</button>
            <p style="display:none">${list_tweet[i].id}</p>
        </div>`
        }
    }
    $('.bai_dang').html(text)
    /*Người dùng Bình luận bài viết*/
    $('.btn_comment').click(function () {
        let input = this.parentElement.querySelector('input').value
        let id = this.parentElement.querySelector('p').textContent
        for (let i = 1; i < list_tweet.length; i++) {
            if (list_tweet[i].id == id) {
                let com = {
                    user: user,
                    text: input
                }
                list_tweet[i].comment.push(com)
                $(`#myUL${id}`).append(`<li>
                <div>
                    <img src="${user.img}" alt="">
                    <h6>${user.fullname}</h6>
                </div>
                <p style="margin-top:10px;">${input}</p>
            </li>`)
                localStorage.setItem('listtweet', JSON.stringify(list_tweet))
                console.log(list_tweet)
                this.parentElement.querySelector('input').value = ''
                this.parentElement.parentElement.querySelector('.comment').textContent = list_tweet[i].comment.length
                break;
            }
        }

    })

    /* Sự kiện khi bấm like*/
    $('.ilike').click(function () {
        if (this.parentElement.querySelector(`#i${this.id}`).textContent == 'none') {
            for (let i = 1; i < list_tweet.length; i++) {
                if (list_tweet[i].id == this.id) {
                    this.parentElement.querySelector(`#i${this.id}`).textContent = 'like'
                    list_tweet[i].like.push(user.username)
                    this.parentElement.querySelector('p').textContent = list_tweet[i].like.length
                    this.classList.add("liked");
                    localStorage.setItem('listtweet', JSON.stringify(list_tweet))
                }
            }
        }
        else {
            for (let i = 1; i < list_tweet.length; i++) {
                if (list_tweet[i].id == this.id) {
                    list_tweet[i].like = list_tweet[i].like.filter(item => item !== user.username)
                    this.parentElement.querySelector('p').textContent = list_tweet[i].like.length
                    this.classList.remove("liked");
                    this.parentElement.querySelector(`#i${this.id}`).textContent = 'none'
                    localStorage.setItem('listtweet', JSON.stringify(list_tweet))
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
    $('.fa-trash').click(function () {
        let id_tweet = this.querySelector('p').textContent
        console.log(id_tweet == 2)
        for (let i = 1; i < list_tweet.length; i++) {
            if (list_tweet[i].id == id_tweet) {
                if (list_tweet[i].user.username == user.username) {
                    list_tweet = list_tweet.filter(item => item !== list_tweet[i])
                    break
                }
                else {
                    alert("Mắc mớ gì đi xóa bài người ta dợ :3")
                }
            }

        }
        localStorage.setItem('listtweet', JSON.stringify(list_tweet))
        console.log(list_tweet)
        show()
    })
}

/* Hiện thị những người chưa follow bên trái slide bar*/
display_usernotfollow('')
function display_usernotfollow(string) {
    //   let list_usernotfollow = []
    let texthtml = `<div class="happening">
    <h2>
        <div class=""><span>Who to follow</span></div>
    </h2>
</div>`
    for (let i = 0; i < list_User.length; i++) {
        let check_user = false
        for (let j = 0; j < user.followed.length; j++) {
            if (list_User[i].username == user.followed[j] || list_User[i].username.indexOf(string) == -1) {
                check_user = true
                break
            }
        }
        if (check_user == false) {
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
    $('.btnfollow').click(function () {
        let username = this.parentElement.querySelector('p').textContent
        let j = 0
        for (let i = 0; i < list_User.length; i++) {
            if (user.username == list_User[i].username)
                j = i
        }
        user.followed.push(username)
        localStorage.setItem('user', JSON.stringify(user))
        list_User[j].followed.push(username)
        localStorage.setItem('listUser', JSON.stringify(list_User))
        console.log(list_User)
        display_usernotfollow('')
        show()
    })
}

let a = `<div class="right_slide_bar-container">
<div class="row">
    <div class="col-2"><img class="anh_avata"
            src="https://pbs.twimg.com/profile_images/1415603997185032192/uvWYpwSB_normal.jpg" alt="">
    </div>
    <div class="col-10" style="display: flex; justify-content: space-between;">
        <div class="Content_right"><a href="#">
                <div class="Content_right__child1 nick_name"><span>Capital.com Việt Nam</span></div>
                <div class="Content_right__child2"><span>@CapitalcomViet</span></div>
            </a></div>
        <div><button type="button" class="btn btn-dark"><span style="width: 43px;
            height: 30px; padding-top: 0;">Follow</span></button></div>
    </div>
</div>
</div>`

