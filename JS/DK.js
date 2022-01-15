// document.querySelector('#inputFullName').addEventListener('keydown',function(){
//     document.querySelector("#warningFullName").style.display = 'none'
// })
$(document).ready(function () {
    let a = [{ check: false, idip: "#inputUserame", idwn: "#warningUserName" },
    { check: false, idip: "#inputFullName", idwn: '#warningFullName' },
    { check: false, idip: "#inputPassword", idwn: '#warningPassword' },
    { check: false, idip: "#inputConfirmPassword", idwn: '#warningRePassword' }]
    b = [/^[a-z0-9_]{6,16}$/i, /^[a-zA-Z\săâưôơéèẻẹếềểệễýỵỳỷùúụủừứựửíìịỉóòọỏáàạảấầẩậắằằặđ]{2,}$/i, /^[a-z0-9_-]{6,18}$/i, undefined]
    for (let i = 0; i < a.length; i++) {
        $(a[i].idip).keydown(function () {
            $(a[i].idwn).hide()
            $(a[i].idwn +"1").hide()
        })
        $(a[i].idip).blur(function () {
            if (i < 3) {
                if (b[i].test($(a[i].idip).val()) == false) {
                    $(a[i].idwn).show()
                    a[i].check = false
                }
                else {
                    a[i].check = true
                }
            }

            else {
                if ($(a[3].idip).val() == $(a[2].idip).val())
                    a[3].check = true
                else {
                    $(a[i].idwn).show()
                    a[i].check = false
                }
            }
        })
    }

    // btn.addEventListener('click',function(){
    //     document.querySelector("#warningFullName").style.marginTop = '100px'
    // })
    $('.btn').click(function () {
        check = true
        for (let i = 0; i < a.length; i++) {
            if (a[i].check == false) {
                check = false
                $(a[i].idwn).show()
                $(a[i].idwn).animate({ left: '5px' }).animate({ left: '0px' });
            }
        }
        if(check == true){
            let username = $(a[0].idip).val()
            check = true
            let listUser = JSON.parse(localStorage.getItem('listUser'))
            for(let i =0;i<listUser.length;i++){
                if(username == listUser[i].username){
                    $("#warningUserName1").show()
                    check = false
                    break
                }
            }
            if(check){
                listUser.push({
                    username:$(a[0].idip).val(),
                    fullname:$(a[1].idip).val(),
                    bio:"Xin chào mọi người lại là Nam và Phong đây",
                    pass:$(a[2].idip).val(),
                    img:'../IMG/avadefault.png'
                })
                localStorage.setItem('listUser',JSON.stringify(listUser))
                alert("Đăng ký thành công. Bạn sẽ được đưa về trang đăng nhập")
                location.assign('../HTML/from_dn.html')
            }
        }
    })
    // btn.addEventListener('click',function(){
    //     var ok = /^[a-zA-Z\săâưôơéèẻẹýỵỳỷùúụủừứựửíìịỉóòọỏáàạảấầẩậắằằặ ]{2,}$/

    // })
})