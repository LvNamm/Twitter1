let list_tweet = JSON.parse(localStorage.getItem('listtweet'))
if (list_tweet==undefined)
    list_tweet=[1]
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


let check_img = false
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
$('#btn_tweet').click(function(){
    let text = $('#input_text').val()
    console.log($('#input_text').val())
    if(text.trim()=='' && check_img==false){
        alert('Nothing to show')
    }
    else{
        let today = new Date()
        let tweet = { id:list_tweet[0],
                      user: user,
                      text:$('#input_text').val(),
                      url:img_url,
                      date:today,
                      like:[],
                      comment:[],}
        list_tweet.push(tweet)
        list_tweet[0] = list_tweet[0]+1
        $('#input_text').val('')
        img_url=undefined
        check_img=false
        localStorage.setItem('listtweet',JSON.stringify(list_tweet))
        console.log(list_tweet)
        show()
    }
})
show()
function show(){
    console.log(list_tweet)
    let text = ``
    for(let i=list_tweet.length-1;i>0;i--){
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
                    <p class="opition_tweet comment"> ${list_tweet[i].comment}</p>
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
        
    }
    $('.bai_dang').html(text)
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


let a = `<div class="Trend_child Trend_child1 row">
                        <div class="col-1" style="padding-left:0 ;">
                            <a href="#">
                                <img class="anh_avata" src="https://pbs.twimg.com/profile_images/1437278558280368132/E1LWXJOm_normal.jpg" alt="">
                            </a>
                        </div>
                        <div class="col-11" style="padding-right:0 ;">
                            <div style=" display: flex; justify-content: space-between; ">
                                <div class="" style="display: flex; color : rgb(83, 100, 113);">
                                    <a href="#" style="text-decoration: none; color: #000;">
                                        <div><span class="nick_name">sniffles</span><img class="icon_anh" src="https://abs-0.twimg.com/emoji/v2/72x72/1f42e.png" alt=""></div>
                                    </a>
                                    <div class="noi_tat">
                                        <span>@snifflesmp4</span>
                                    </div>
                                    <div class="title_happening_child"><span>.</span></div>
                                    <a href="#" style="text-decoration: none; color : rgb(83, 100, 113);">
                                        <div><span>18h</span></div>
                                    </a>
                                </div>
                                <div>
                                    <i class="bi bi-three-dots"></i>
                                </div>
                            </div>

                            <div><span>g-grandmaster jean's alt outfit is</span></div>
                            <div style="display: flex;">
                                <a href="#"><span>#scaramouche</span></a>
                                <a href="#"><span>#genshinimpact</span></a>
                                <a href="#"><span> #viria </span></a>

                            </div>
                            <div><img class="img__container " src="https://pbs.twimg.com/media/FIw4V2uXsAADGZa?format=jpg&amp;name=900x900" alt="">
                            </div>
                            <div class="row" style="margin-top: 10px;">
                                <div class="col icontweet "><i class="iconn bi bi-chat icomment"></i>
                                    <p class="opition_tweet comment"> 67</p>
                                </div>
                                <div class="col icontweet"><i class="iconn  iretweet bi bi-arrow-repeat"></i>
                                    <p class="opition_tweet retweet"> 2.9k </p>
                                </div>
                                <div class="col icontweet"><i class="iconn ilike bi bi-heart"></i>
                                    <p class="opition_tweet like"> 13.4k </p>
                                </div>
                                <div class="col icontweet "><i class="iconn ishare bi bi-box-arrow-up"></i>
                                    <p class="opition_tweet share"></p>
                                </div>
                            </div>
                        </div>
                    </div>`

