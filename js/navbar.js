// open navbar
let navContainer = document.querySelector(".desketop");
let openButton = document.querySelector("#mobile .open_navbar");
let closeButton = document.querySelector("#navbar .close_navbar");
openButton.addEventListener("click", () => {
    navContainer.classList.add("active");
});
// close
window.addEventListener("click", (e) => {
    if (
        !e.target.classList.contains("open_navbar") &&
        !e.target.parentElement.classList.contains("open_navbar") &&
        !e.target.classList.contains("desketop") &&
        e.target.id != "sub" &&
        e.target.id != "search"
    ) {
        navContainer.classList.remove("active");
    }
});
if(localStorage.getItem("userInforamtion")){
    let toggleContent=document.getElementById("toggleSignIn");
    toggleContent.innerHTML="Account";
    toggleContent.setAttribute("href","profile.html")
}
// carts numbers
function cartsNumbers(){
    let productNumbers = localStorage.getItem('chart')
    if (productNumbers){
        document.querySelector('.cart span').textContent = JSON.parse(productNumbers).length;
    }
}
cartsNumbers();