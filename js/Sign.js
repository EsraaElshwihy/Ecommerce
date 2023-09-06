// bring data to localstorage
let userInfo=[];
if(localStorage.getItem("userInforamtion")){
  userInfo=JSON.parse(localStorage.getItem("userInforamtion"));
}
let signUpError=document.querySelector(".signUpError");
function generateError(place,text){
  let errorDiv=document.createElement("div");
  let errorText=document.createTextNode(text);
  errorDiv.append(errorText);
  place.append(errorDiv);
}
function userName(place) {
  var Nname = document.getElementById("User");
  var userRegExp = /(^[a-zA-Z]{3,}(\s[a-zA-z]{3,})+)+$/
  var Nname = document.getElementById("User").value;
  var reName = userRegExp.test(Nname)
  if (reName == true){
    document.getElementById("User").style.cssText=" border-bottom-color: #0f5132;"

    return true;
  }else {
    let text="- You enter a wrong user name.your name must be like this Test test";
    generateError(place,text);
    place.classList.add("active")
    document.getElementById("User").style.cssText=" border-bottom-color: #842029;"

    return false;
    
  }
}

function eMaill(mEmaill,place,input) {
  var EmaillRegExp = /^[a-z]+([0-9]|(_|\.|\$))*@[a-z]+(.com|.eg|.org|.edu|.net)$/
  var ReEmaill = EmaillRegExp.test(mEmaill)
  if (ReEmaill == true){
   
    input.style.cssText=" border-bottom-color:#0f5132;"
    return true;
  }
  else {
    let text="- You enter a wrong email your email must be like test@gmail.com";
    generateError(place,text)
    place.classList="error active";
    
    input.style.cssText=" border-bottom-color: #842029;"
    return false;
  }
}
function phoneNum(place) {
  var phoneExp = /^01[0125][0-9]{8}$/
  var mPhone = document.getElementById("phNumber").value;
  var RePhone = phoneExp.test(mPhone)
  if (RePhone == true){
   
    document.getElementById("phNumber").style.cssText=" border-bottom-color: #0f5132;"
  return true;
  }else {
    let text="- You enter a wrong phone number ";
    generateError(place,text);
    place.classList.add("active")
    document.getElementById("phNumber").style.cssText=" border-bottom-color: #842029;"
    return false;
  }
}
function verifyPassword(pw,place,input) {

  //check empty password field  

  if (pw == "") {
    let text="- Fill the password please!";
    generateError(place,text)
    place.classList.add("active")
    input.style.cssText=" border-bottom-color: #842029;"
    return false;

  }


  //minimum password length validation  

  if (pw.length < 8) {
    let text="- Password length must be at least 8 characters";
    generateError(place,text)
    
    input.style.cssText=" border-bottom-color: #842029;"
    place.classList.add("active")
    return false;

  }
  //maximum length of password validation  

  if (pw.length > 15) {
    let text="- Password length must not exceed 15 characters";
    generateError(place,text)
    input.style.cssText=" border-bottom-color: #842029;"
    place.classList.add("active")
    return false;
    
  } else {
    input.style.cssText=" border-bottom-color: #0f5132;"
    return true;

  }
}
function matchPassword() {

  var pw1 = document.getElementById("pswd1").value;

  var pw2 = document.getElementById("pswd2").value;
  if (pw1 !== pw2) {
    signUpError.innerHTML=""
    let text="- Please make sure your passwords match.";
    generateError(signUpError,text)
    
    signUpError.classList.add("active")
    document.getElementById("pswd1").style.cssText=" border-bottom-color: #842029;"
    document.getElementById("pswd2").style.cssText=" borde-bottom:1px solid #842029;"
    return false;
    
  } else {
    document.getElementById("pswd1").style.cssText=" border-bottom-color: #0f5132;"
    document.getElementById("pswd2").style.cssText=" border-bottom-color:#0f5132;"
    
    
   return true;

  }

}

// switch between forms
let formsContaienr=document.querySelectorAll(".registeration form");
let formButtons=document.querySelectorAll(".registeration button");
let signIn=document.querySelector(".signIn");
let signUp=document.querySelector(".signUp");
let backgroundButton=document.getElementById('btn');

formButtons.forEach((button)=>{
  button.onclick=function(){
    // remove active from all
    document.querySelectorAll(".registeration .active").forEach((element)=>element.classList.remove("active"));
    formsContaienr.forEach((form)=>{
      if(form.classList.contains(button.id)){
        if(button.id == "signIn"){
          signIn.style.cssText="left:0;animation: fade .5s ease-in-out 1 ;";
          signUp.style.cssText="left:100%"
          btn.style.cssText=" transform: translateX(100%);background-color: var(--main-color);animation: fade .5s ease-in-out 1 ;"
        }else{
          signIn.style.cssText="left:-300px";
          signUp.style.cssText="left:0;animation: fade .5s ease-in-out 1 ;"
          btn.style.cssText=" transform: translateX(0%);background-color: var(--main-color);animation: fade .5s ease-in-out 1 ;"
        }
        form.classList.add('active');
        button.classList.add("active")
      }
    })
    
  }
})
let submitSignUp=document.querySelector(".signupForm");

submitSignUp.addEventListener('click',(e)=>{
  e.preventDefault();
  signUpError.innerHTML="";
 let user=userName(signUpError)
  var mEmaill = document.getElementById("Maile");
  let email=eMaill(mEmaill.value,signUpError,mEmaill);
  phoneNum(signUpError);
  let password=document.getElementById("pswd1");
  let Password=verifyPassword(password.value,signUpError,password);
  let matchPasswordVariable=matchPassword();
  if(user==true&&email==true&&Password==true && matchPasswordVariable==true){
    signUpError.classList.remove("active")
    // add to local storage
    let userNameInput=document.getElementById("User").value;
    addSignUpToLocal(userNameInput,mEmaill.value,password.value);
    window.location.href="index.html";
  }

})
let submitSignIn=document.querySelector(".signInForm");
let errorMessage=document.querySelector(".error");
submitSignIn.addEventListener("click",(e)=>{
  errorMessage.innerHTML="";
  let email=document.getElementById("email");
  let Email=eMaill(email.value,errorMessage,email);
  let password=document.getElementById("pswd3");
  let Password=verifyPassword(password.value,errorMessage,password);
  if(Email==true&&Password==true){
    let flag=false;
    if(localStorage.getItem("userInforamtion")){
      let arrayOfUser=JSON.parse(localStorage.getItem("userInforamtion"));
      arrayOfUser.forEach((element)=>{
        if(element.email != email.value && element.password != password.value){
          flag=true;
        }
      })
    }
    if(flag){
      let text="Your email and password do not match. \n please try again.";
      generateError(errorMessage,text)
      errorMessage.classList.add('active');
    }else{
      errorMessage.classList.remove('active');
    }

  }else{
    e.preventDefault();
  }
})

function addSignUpToLocal(user,email,password){
  let flag=true;
  let userDetails={
    userName:user,
    email:email,
    password:password,
  }
  if(localStorage.getItem("userInforamtion")){
    let arrayOfLocal=JSON.parse(localStorage.getItem("userInforamtion"));
    arrayOfLocal.forEach((item)=>{
      if(item.email == email){
        flag=false;
      }
    })
  }
  if(flag){
    userInfo.push(userDetails);
  }
  localStorage.setItem("userInforamtion",JSON.stringify(userInfo));
}
//show password
let click=0;
function showPassword(input){
  let passwordInput=input.parentElement.querySelector("input");
  if(click == 0 ){
    passwordInput.setAttribute("type","text")
    click++;
  }else{
    passwordInput.setAttribute("type","password")
    click=0;
  }
}
function hidePassword(){

  click=0;
 
}
