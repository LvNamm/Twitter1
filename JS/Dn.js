// console.log('ok')
// let user = {
//     username : "Nam123",
//     fullname: "Lương Văn Nam",
//     pass : "123",
//     img : undefined,
// }
// let list_user = []
// list_user.push(user)
// localStorage.setItem('user',JSON.stringify(list_user))
let list_user = JSON.parse(localStorage.getItem('listUser'))
let btn = document.querySelector(".btn")

document.querySelector('#inputUserame').value = 'Lương Văn Nam'
document.querySelector("#inputPassword").value ='123456'
console.log(list_user[0].username)
btn.addEventListener('click',function(){
    let username = document.querySelector('#inputUserame').value
    let pass = document.querySelector("#inputPassword").value
    let check = false
    for(let i=0;i<list_user.length;i++){
        if(username==list_user[i].username && pass==list_user[i].pass){
        check = true
        localStorage.setItem('user',JSON.stringify(list_user[i]))
        alert('TK hoặc MK sai 2')
        location.assign('../HTML/Home.html')
    }
    }
    if(check == false)
        alert('TK hoặc MK sai')
})