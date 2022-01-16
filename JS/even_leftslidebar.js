let list_btn = document.querySelectorAll('.left-slide-bar__link')
let x = [undefined,'../HTML/Home.html','../HTML/Explore.html',undefined,'../HTML/Messages.html',undefined,undefined,'../HTML/Profile.html','../HTML/from_dn.html',undefined,undefined]
for(let i=0;i<list_btn.length;i++){
    list_btn[i].addEventListener('click',function(){
        location.assign(x[i])
        
    })
}