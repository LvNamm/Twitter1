let text1 = `<div class="list_mes__user">
<div class="user  ps-3 mp-3">
    <img src="../IMG/DucPhong.jpg" alt="">
    <div>
        <h6>Nguyễn Đức Phong</h6>
        <p>Há</p>
    </div>
</div>

<div class="user  ps-3 pe-3">
    <img src="../IMG/LuongNam.jpg" alt="">
    <div>
        <h6>Nguyễn Đức Phong</h6>
        <p>Há</p>
    </div>
</div>
</div>`
let user2 = undefined
let user = JSON.parse(localStorage.getItem('user'))
let list_user = JSON.parse(localStorage.getItem('listUser'))
let list_mes = JSON.parse(localStorage.getItem('mess'))
let img_avatar = document.querySelectorAll(".avatar")
for(let i=0;i<img_avatar.length;i++){
    img_avatar[i].src = user.img
}
$('.user_name').first().text(user.fullname)
$('.email_name').first().text(user.username)
if (list_mes == undefined)
    list_mes = []
let text = ''
let k = 1
let h = 1
let first_user_mes1 = undefined
let list_user_mes = []
function mes1() {
    text = ''
    for (let i = list_mes.length-1; i >=0; i--) {
        //console.log(list_mes[i].mess[list_mes[i].mess.length - 1])
        // console.log(list_mes[i][2])
        // console.log(list_mes[i][1])
        let check = false
        if (user.username == list_mes[i][1]) {
            user2 = list_mes[i][0]
            list_user_mes.push(user2)
            check = true
            if (k == 1) {
                first_user_mes1 = list_mes[i][0]
                k = 2
                h = 1
            }
        }
        if (user.username == list_mes[i][0]) {
            user2 = list_mes[i][1]
            list_user_mes.push(user2)
            check = true
            if (k == 1) {
                first_user_mes1 = list_mes[i][1]
                k = 2
                h = 0
            }
        }
        if (check == true) {
            for (let j = 0; j < list_user.length; j++) {
                if (list_user[j].username == user2) {
                    let l = undefined
                    if (list_mes[i].mess.length == 0) {
                        l = ''
                    }
                    else
                        l = list_mes[i].mess[list_mes[i].mess.length - 1].text
                    text = text + `<div class="user user4 ps-3 mp-3">
                    <p class = 'username1' style="display:none">${user2}</p>
                <img src="${list_user[j].img}" alt="">
                <div>
                    <h6>${list_user[j].fullname}</h6>
                    <p>${l}</p>
                </div>
            </div>`
                    break
                }
            }
        }
    }
    $('.list_mes__user').html(text)
    $('.user4').click(function () {
        console.log('ok')
        let username1 = this.querySelector('.username1').textContent
        let m = undefined
        for (let i = 0; i < list_mes.length; i++) {
            if (list_mes[i][0] == username1 && list_mes[i][1] == user.username) {
                m = 1
                break
            }
            if (list_mes[i][1] == username1 && list_mes[i][0] == user.username) {
                m = 0
                break
            }
        }
        Show_mes(m, username1)
    })
}
mes1()
Show_mes(h, first_user_mes1)
function Show_mes(x, first_user_mes) {
    console.log(first_user_mes)
    if(first_user_mes == undefined){
        $('.mes header div p').text('')
        $('.mes header div h4').text('')
    }
    else{
    for (let i = 0; i < list_mes.length; i++) {
        if (list_mes[i][x] == user.username && list_mes[i][1 - x] == first_user_mes) {
            k = i
            $('.mes header div p').text(first_user_mes)
            for (let j = 0; j < list_user.length; j++) {
                if (list_user[j].username == first_user_mes) {
                    $('.mes header div h4').text(list_user[j].fullname)
                    user2 = list_user[j]
                    break
                }
            }
            text = ``
            for (let j = 0; j < list_mes[i].mess.length; j++) {
                if (list_mes[i].mess[j].user == 1 - x) {
                    text = text + `<div class="mes__box_chat__text you">

                    <img src="${user2.img}" alt="">
                    <div>
                        <p>${list_mes[i].mess[j].text}</p>
                    </div>
                    </div>`
                }
                else {
                    text = text + `<div class="mes__box_chat__text me">
                    <div>
                        <p>${list_mes[i].mess[j].text}</p>
                    </div>
                </div>`
                }
            }
            $('.mes__box_chat').html(text)

        }
    }}
}

`<div class="mes__box_chat__text you">

<img src="../IMG/DucPhong.jpg" alt="">
<div>
    <p></p>
</div>
</div>`
$('.add_user').click(function () {
    console.log('ok')
    $('.add_user').hide()
    $('.add_user__add').hide()
    console.log(this)
})
$('.addmess').click(function () {
    $('.add_user').show()
    text = ``
    console.log(list_user)
    console.log(list_user_mes)
    for (let i = 0; i < list_user.length; i++) {
        check = false
        for (let j = 0; j < list_user_mes.length; j++) {
            if (list_user_mes[j] == list_user[i].username) {
                check = true
                break
            }
        }
        if (check == false) {
            text = text + `<div class="user user1 user2 ps-3 mp-3">
        <p class="username2" style="display: none;">${list_user[i].username}</p>
        <img src="${list_user[i].img}" alt="">
        <div>
            <h6>${list_user[i].fullname}</h6>
        </div>
        </div>`
        }
    }

    // list_mes = JSON.parse(localStorage.getItem('mess'))
    // if (list_mes == 0) {
    //     for (let i = 0; i < list_user.length; i++) {
    //         text = text + `<div class="user user1 ps-3 mp-3">
    //     <p class="username2" style="display: none;">${list_user[i].username}</p>
    //     <img src="${list_user[i].img}" alt="">
    //     <div>
    //         <h6>${list_user[i].fullname}</h6>
    //     </div>
    //     </div>`
    //     }

    // }
    $('.add_user__add').html(text)
    $('.add_user__add').show()
    $('.user2').click(function () {
        let user3 = this.querySelector('.username2').textContent
        let mess = {
            0: user3,
            1: user.username,
            mess: []
        }
        list_mes.push(mess)
        localStorage.setItem('mess', JSON.stringify(list_mes))
        $('.add_user__add').hide()
        $('.add_user').hide()
        console.log(list_mes)
        mes1()
    })
})

$('.send').click(function () {
    text = $('.Nhap_tin_nhan').val()
    if (text.trim() != '') {
        let text1 = $('.mes__box_chat').html()
        text1 = text1 + `<div class="mes__box_chat__text me">
    <div>
        <p>${text.trim()}</p>
    </div>
</div>`
        $('.mes__box_chat').html(text1)
        let mess = {
            user: h,
            text: text.trim()
        }
        list_mes[k].mess.push(mess)
        console.log(list_mes)
        localStorage.setItem('mess', JSON.stringify(list_mes))
        $('.Nhap_tin_nhan').val('')
    }
})