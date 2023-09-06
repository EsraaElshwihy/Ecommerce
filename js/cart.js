let chartArray=[]
if(localStorage.getItem("chart")){
    chartArray=JSON.parse(localStorage.getItem("chart"))
}
function emptyShopChart() {
    let chart = `
        <div class="empty">
        <h2>Your shopping chart is empty</h2>
        <a href="shop.html">Shop now</a>
        </div>
    `;
    let chartContainer = document.querySelector(".chart .chart_container");
    chartContainer.innerHTML += chart;
}
function fullChart(counter,localLenght, data,totalCost) {
    let chartContainer = document.querySelector(".chart_container .content");
  
    let chartHeader = `
<div class="chart_header">
    <h2>cart <span>${localLenght}</span></h2>
</div>
`;
let price=`
<h4>Basket total</h4>
<p class="total_price">${totalCost} $</p>
`
let priceContainer=document.querySelector(".price");
if (counter === 0) {
    chartContainer.innerHTML += chartHeader;
    priceContainer.innerHTML+=price;
    }
        let chartContent = `
    <div class="chart_content">
    <img src="${data.thumbnail}">
    <div class="description">
        <h3>${data.title}</h3>
        <h4 class="productPrice">price: ${data.price}$</h4>
    </div>
    <div class="quantity_remove">
    <input type="number" class="productQuantity"data-number=${data.id} value="1"  min=1>
    <i class="fa-regular fa-trash-can remove_cart" data-remove="${data.id}" > <span> Remove</span></i>
    </div>
    </div>
    `;
  
        chartContainer.innerHTML += chartContent;
    
}
if (localStorage.getItem("chart") && JSON.parse(localStorage.chart) != 0 ) {
    let cnt = 0;
    JSON.parse(localStorage.getItem("chart")).forEach((element) => {
        // get api
        let request = new XMLHttpRequest();
        request.open(
            "GET",
            `https://dummyjson.com/products/${element.id}`,
            true
        );
        request.send();
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let datas = JSON.parse(this.response);

                let localLength = JSON.parse(
                    localStorage.getItem("chart")
                ).length;
                let totalPrice=localStorage.getItem("totalCost");
                fullChart(cnt, localLength, datas,totalPrice);
                cnt++;
                loadPrice();
                dynamicPrice()
                changeQuantity()
                loadQuantity()
                let removeIcon=document.querySelectorAll(".remove_cart");
                removeIcon.forEach((remove)=>{
                    // Hello
                    remove.onclick=function(){
                        let id=remove.dataset.remove;
                        document.querySelector(".removeConfirmation").classList.remove("active");
                        let delet=document.getElementById("yes");
                        console.log("k")
                        delet.onclick=function(){

                            let quanityProducts=remove.parentElement.querySelector("input").value;
                            deletCart(id,quanityProducts)
                            price(id,quanityProducts)
                            localStorage.setItem("chart",JSON.stringify(chartArray))
                            location.reload();
                        }
                    }
                })
               
            }
        };
    });
    
} else {
    localStorage.setItem("totalCost",0)
    emptyShopChart();
}
function dynamicPrice(){
    let allProductQuantity=document.querySelectorAll(".productQuantity");
    allProductQuantity.forEach((element)=>{
        element.onclick=function(){
            totalPrice();
        }
    })
    
}

function totalPrice(){
    let basketPrice=0
    let allProductQuantity=document.querySelectorAll(".productQuantity");
    for(let i=0;i<allProductQuantity.length;i++){
        let prices=allProductQuantity[i].parentElement.parentElement.querySelector(".productPrice").innerHTML.slice(7);
        let quanity=allProductQuantity[i].value;
        basketPrice+=+(quanity) * parseInt(prices);
        console.log(basketPrice)
        
    }
    let basketPriceHtml=document.querySelector(".chart .total_price")
    basketPriceHtml.innerHTML=basketPrice;
    if(localStorage.getItem("totalCost")){
        if(JSON.parse(localStorage.getItem("totalCost"))!=basketPrice){
            localStorage.setItem("totalCost",basketPrice);
        }
    }else{
        localStorage.setItem("totalCost",basketPrice);

    }
   
   
}
// function work when change quantity
function changeQuantity(){
    let allProductQuantity=document.querySelectorAll(".productQuantity");
    allProductQuantity.forEach((product)=>{
        product.onchange=function(){
            let id=product.dataset.number;
            // change quntity in local
            if(localStorage.getItem("chart")){
                chartArray.forEach((localItem)=>{
                    if(localItem.id == id){
                        localItem.quantity=+product.value;
                        localStorage.setItem("chart",JSON.stringify(chartArray))
                    }
                })
            }
        }
    })
}
// load qunatity from local storage
function loadQuantity(){
    let allProductQuantity=document.querySelectorAll(".productQuantity");
allProductQuantity.forEach((element)=>{
    let id=element.dataset.number;
    if(localStorage.getItem("chart")){
        chartArray.forEach((localItem)=>{
            if(localItem.id == id){
                element.value=localItem.quantity;
            }
        })
    }
})
}
// load price
function loadPrice(){
    let price=document.querySelector(".total_price");
    if(localStorage.getItem('totalCost'))
    price.innerHTML=localStorage.getItem("totalCost")
}
// delet item from cart
// remove product from favorite
function deletCart(id) {
    chartArray = chartArray.filter((product) => product.id != id);
  
}
function price(id,quanity){
    let localTotalCost=localStorage.getItem("totalCost");
    let cartProducts=JSON.parse(localStorage.getItem("chart"));
   console.log(quanity)
    cartProducts.forEach((element)=>{
        if(id==element.id){
            localTotalCost-=(element.price * +quanity);
        }
    })
    localStorage.setItem("totalCost",localTotalCost);
}
function closeConfirm(){
    document.querySelector(".removeConfirmation").classList.add("active");
}