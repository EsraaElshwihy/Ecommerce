let chartArray=[]
if(localStorage.getItem("chart")){
    chartArray=JSON.parse(localStorage.getItem("chart"))
}
// array of favorite item
let favoriteProduct = [];
// to updat array with item in localstorage
if (localStorage.getItem("favorite")) {
    favoriteProduct = JSON.parse(localStorage.getItem("favorite"));
}

// creat product card
function creatProductCard(data, place) {
    let card = document.createElement("div");
    card.classList = "card";
    // product image
    let imageContainer = document.createElement("figure");
    imageContainer.classList = "card_container";
    let prodcuctImage = document.createElement("img");
    prodcuctImage.setAttribute("src", data.thumbnail);
    prodcuctImage.setAttribute("alt", data.title);
    prodcuctImage.classList = "product_image";
    prodcuctImage.setAttribute("data-image", data.id);
    //icons
    let icons = document.createElement("div");
    icons.classList = "icon_container";
    // saved item
    let favoriteProdcut = document.createElement("i");
    favoriteProdcut.classList = `fa-regular fa-heart addToFavorite ${data.id}`;
    favoriteProdcut.setAttribute("data-favorite", data.id);
    favoriteProdcut.setAttribute("id", data.id);
    imageContainer.append(favoriteProdcut);
    //shopping
    let shoppingCardIcon = document.createElement("i");
    shoppingCardIcon.classList = "fa-solid fa-cart-shopping shopping_icon";
    shoppingCardIcon.setAttribute("data-shop", data.id);
    shoppingCardIcon.setAttribute("data-price", data.price);
    imageContainer.append(shoppingCardIcon);

    icons.append(favoriteProdcut);
    icons.append(shoppingCardIcon);
    imageContainer.append(icons);
    imageContainer.append(prodcuctImage);
    card.append(imageContainer);
    // title
    let productTilte = document.createElement("h5");
    let productTitleText = document.createTextNode(data.title);
    productTilte.append(productTitleText);
    card.append(productTilte);

    // rating
    let rateContainer = document.createElement("ul");
    rateContainer.classList = "rating";
    rating(data.rating,rateContainer)
    card.append(rateContainer);
    
    // price
    let priceContaienr = document.createElement("div");
    priceContaienr.classList = "price_container";
    let price = document.createElement("h4");
    let priceContent = document.createTextNode("$" + data.price);
    price.append(priceContent);
    priceContaienr.append(price);
    card.append(priceContaienr);
    let contaienr = document.querySelectorAll(".feature_content-box .row");
    for (let i = 0; i < contaienr.length; i++) {
        contaienr[place].append(card);
    }
}
// calculate rate
function rating(data,rateContainer){
    let rate=Math.round(data)
    for (let i = 0; i < 5; i++) {
        let icon = document.createElement("i");
        if(i<rate){

            icon.classList="fa-solid fa-star active";
        }else{
            icon.classList="fa-regular fa-star ";

        }
        rateContainer.append(icon);
    }
}
// get api and make card
(function getApiAndCreatCard() {
    // getting API
    let request = new XMLHttpRequest();
    request.open("GET", "https://dummyjson.com/products", true);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let datas = JSON.parse(this.responseText);
            let smartphonesCounter,
                laptopsCounter,
                fragrancesCounter,
                skincareCounter;
            smartphonesCounter =
                laptopsCounter =
                fragrancesCounter =
                skincareCounter =
                    0;
            datas.products.forEach((data) => {
                let sectionTitle = document.createElement("h2");
                sectionTitle.setAttribute("class", "secion-title");
                let cardContainer = document.querySelector(".feature_content");
                let featureContent = document.createElement("div");
                featureContent.setAttribute("class", "feature_content-box");
                let row = document.createElement("div");
                row.setAttribute("class", "row");
                switch (data.category) {
                    case "smartphones":
                        if (smartphonesCounter == 0) {
                            sectionTitle.innerText = "smartphones";
                            featureContent.append(sectionTitle);
                            cardContainer.append(featureContent);
                            featureContent.append(row);
                        }
                        smartphonesCounter++;
                        creatProductCard(data, 0);
                        break;
                    case "laptops":
                        if (laptopsCounter == 0) {
                            sectionTitle.innerText = "laptops";
                            featureContent.append(sectionTitle);
                            cardContainer.append(featureContent);
                            featureContent.append(row);
                        }
                        laptopsCounter++;
                        creatProductCard(data, 1);
                        break;
                    case "fragrances":
                        if (fragrancesCounter == 0) {
                            sectionTitle.innerText = "fragrances";
                            featureContent.append(sectionTitle);
                            cardContainer.append(featureContent);
                            featureContent.append(row);
                        }
                        fragrancesCounter++;
                        creatProductCard(data, 2);
                        break;
                    case "skincare":
                        if (skincareCounter == 0) {
                            sectionTitle.innerText = "skincare";
                            featureContent.append(sectionTitle);
                            cardContainer.append(featureContent);
                            featureContent.append(row);
                        }
                        skincareCounter++;
                        creatProductCard(data, 3);
                        break;
                }
            });
            // selecting all images and when some one click on image it gone store 
            let listOfProductsImages = document.querySelectorAll(
                ".card .product_image"
            );
            listOfProductsImages.forEach((image) => {
                image.addEventListener("click", () => {
                    localStorage.setItem("imageId",image.dataset.image)
                    window.location.href="product.html"
                    
                });
            });
           // add to chart
            let chart = document.querySelectorAll(".shopping_icon");
            chart.forEach((chartIcon) => {
                chartIcon.addEventListener("click", () => {
                    let chartId = chartIcon.dataset.shop;
                    let price=chartIcon.dataset.price;
                    // to check if person have an account
                    if(localStorage.getItem("userInforamtion")){
                        addChartToLocal(chartId, 1,price);
                        cartsNumbers();
                        document.querySelector(".popup").classList.remove("active");
                    }else{
                        document.querySelector(".popup_regiser").classList.remove("active");
        
                    }
                });
            });
               //    add to favorite
                let favorite = document.querySelectorAll(".addToFavorite");
                favorite.forEach((element) => {
                    loadData(element)
                    element.onclick = function () {
                        addFavoriteProductToLocalStorage(element.id, element);
                    
                    };
                });
        }
    };
})();
// add to cart
function addChartToLocal(id,q,price){
    let flag=true;
    let shopingChart={
        id:id,
        quantity:q,
        price:price,
    }
     if(localStorage.getItem("chart")){
        JSON.parse(localStorage.getItem("chart")).forEach((item)=>{
            if(item.id==id){
                flag=false;
               
            }
        })
    }
    if(flag){
        chartArray.push(shopingChart)
        totalCost(price)
    }
    localStorage.setItem("chart",JSON.stringify(chartArray))
}
function closePopup(){
    document.querySelector(".popup").classList.add("active")
}
function closeRegisterPopup() {
    document.querySelector(".popup_regiser").classList.add("active");
}

// add favorite item to localstorage
function addFavoriteProductToLocalStorage(id, icon) {
    let clicked = 0;
    let favorite = {
        id: id,
        colored: 1,
    };
    let local = JSON.parse(localStorage.getItem("favorite"));
    if (localStorage.getItem("favorite")) {
        local.forEach((item) => {
            if (item.id == id) {
                clicked = item.colored;
            }
        });
    }
    if (clicked == 0 || clicked == 2) {
        // gonna work when product clicked for first time
        if (clicked == 0) {
            favoriteProduct.push(favorite);
        } else {
            favoriteProduct.forEach((element) => {
                if (element.id == id) {
                    element.colored = 1;
                }
            });
        }
        icon.classList = "fa-solid fa-heart addToFavorite active";
    } else {
        icon.classList = "fa-regular fa-heart addToFavorite";
        favoriteProduct.forEach((element) => {
            if (element.id == id) {
                element.colored = 2;
                deleteItemFromlocal(element.id);
            }
        });
    }
    localStorage.setItem("favorite", JSON.stringify(favoriteProduct));
}
// remove product from favorite
function deleteItemFromlocal(id) {
    favoriteProduct = favoriteProduct.filter((product) => product.id != id);
}

function loadData(icon) {
    if (localStorage.getItem("favorite")) {
        JSON.parse(localStorage.getItem("favorite")).forEach((product) => {
            if (product.id == icon.id) {
                document.getElementById(product.id).classList =
                    "fa-solid fa-heart addToFavorite active";
            }
        });
    }
}
// carts numbers
function cartsNumbers(product){
    let productNumbers = localStorage.getItem('chart')
    if (productNumbers){
        document.querySelector('.cart span').textContent = JSON.parse(productNumbers).length;
    }
}


function onloadCartNumbers(){
    let productNumbers = localStorage.getItem('cartsNumbers')
    if (productNumbers){
        document.querySelector('.cart span').textContent = productNumbers
    }
}
function onloadCartNumbers(){
    let productNumbers = localStorage.getItem('chart')
    if (productNumbers){
        document.querySelector('.cart span').textContent = JSON.parse(productNumbers).length;
    }
}
onloadCartNumbers();
// total cost
function totalCost(price){
    let cartCost = localStorage.getItem('totalCost');    
    if (cartCost != null){
        cartCost = parseInt(cartCost);
        sum=cartCost+ +price;
        
        localStorage.setItem("totalCost",sum)
    }
    else{
        localStorage.setItem("totalCost", +price);
    }
}