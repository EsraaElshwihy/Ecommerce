// array of favorite item
let favoriteProduct=[];
// to updat array with item in localstorage
if(localStorage.getItem("favorite")){
    favoriteProduct=JSON.parse(localStorage.getItem("favorite"))
}
function emptyFavorite(){
    let empty=`
    <div class="empty_favorite">
    
<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='100' height='100'><defs><path id='a' d='M99.962 49.908c0 27.564-22.378 49.908-49.981 49.908C22.377 99.816 0 77.472 0 49.908S22.377 0 49.98 0c27.604 0 49.982 22.344 49.982 49.908'/></defs><g fill='none' fill-rule='evenodd'><mask id='b' fill='white'><use xlink:href='#a'/></mask><use fill='#9c27b017' xlink:href='#a'/><g fill-rule='nonzero' mask='url(#b)'><path fill='#9c27b0' d='M61.496 29A12.01 12.01 0 0 0 51 35.127v35.83c3.38-2.511 22.5-17.287 22.5-30.082C73.5 34.317 68.125 29 61.496 29z'/><path fill='#9c27b094' d='M40.004 29C33.374 29 28 34.317 28 40.875c0 12.794 19.12 27.57 22.5 30.082v-35.83A12.011 12.011 0 0 0 40.004 29z'/></g></g></svg>
    <h2>You haven’t saved an item yet!</h2>
    <p> Found something you like? Tap on the heart shaped icon next to the item to add it to your wishlist! All your saved items will appear here</p>
    <a href="shop.html">Continue shopping</a>
    </div>
    `;
    let favoriteContainer=document.querySelector(".favorite_container");
    favoriteContainer.innerHTML+=empty
}
function favoriteProducts(data){
    let favortie_box=`
    <div class="favorite_item">
        <img src=${data.thumbnail}>
        <div class="favorite_description">
        <h3>${data.title}</h3>
        <h4>$${data.price}</h4>
        </div>
        <div class="buyOrRemove">
        <button>buy now</button>
        <button class="removeFavorite" id="${data.id}">
        <i class="fa-regular fa-trash-can"></i>
        remove
        </button>
        </div>

    </div>
    `
    let container=document.querySelector(".favorite_row");
    container.innerHTML+=favortie_box;

}
if(localStorage.getItem("favorite") && JSON.parse(localStorage.favorite) != 0){
    let array=JSON.parse(localStorage.getItem("favorite"));
    for(let i=0;i<array.length;i++){
        let favoriteId=array[i].id;
        // gettin api
        let request=new XMLHttpRequest();
        request.open("GET",`https://dummyjson.com/products/${favoriteId}`,true);
        request.send();
        request.onreadystatechange=function(){
            if (this.readyState == 4 && this.status == 200) {
                let data=JSON.parse(this.response);
                favoriteProducts(data)
                let removeFavorite=document.querySelectorAll(".removeFavorite")
                removeFavorite.forEach((button)=>{
                    button.onclick=function(){
                        deleteItemFromlocal(button.id)
                     localStorage.setItem("favorite",JSON.stringify(favoriteProduct));
                    location.reload()    
                    }
                })
            }
        }
    }
}else{
    emptyFavorite()
}
window.onload=function(){
    if(localStorage.getItem("active_page")){
        let lis=document.querySelectorAll(".profile_sidebar ul li");
        let divContent=document.querySelectorAll(".profile .content div");
        removeActiveFromList();
        removeActiveClassFromAllDiv();
        lis.forEach((li)=>{
            if(li.dataset.toggle == localStorage.getItem("active_page")){
                li.classList.add("active");
            }
        })
        divContent.forEach((div)=>{
            if(div.id == localStorage.getItem("active_page")){
                div.classList.add("active");
            }
        })
    }
}
let sidebarList=document.querySelectorAll(".profile_sidebar li");
sidebarList.forEach((li)=>{
    li.onclick=function(){
        let contentItems=document.querySelectorAll(".content div");
        removeActiveClassFromAllDiv();
        removeActiveFromList()
        li.classList.add("active")
        localStorage.setItem("active_page",li.dataset.toggle);
        // add active to clicked list 
        contentItems.forEach((div)=>{
            if(li.dataset.toggle == div.id ){
                div.classList.add("active")
            }
    
        })
    }
})
function removeActiveFromList(){
// remove active class from all li
document.querySelectorAll(".profile_sidebar ul li.active").forEach((element)=>{
    element.classList.remove("active")
})
}
function removeActiveClassFromAllDiv(){
     // remove active class from all
     document.querySelectorAll(".content .active").forEach((div)=>{
        div.classList.remove("active")
    })
}
// remove product from favorite
function deleteItemFromlocal(id){
    favoriteProduct=favoriteProduct.filter((product)=>product.id != id)
}
function userInformation(){
    let user=JSON.parse(localStorage.getItem("userInforamtion"))
    let userName=document.querySelector(".account_content .user_name");
    let email=document.querySelector(".account_content .email")
    if(user){
        user.forEach((information)=>{
            userName.innerHTML=information.userName;
            email.innerHTML=information.email;
        })
     
    }
}
userInformation();