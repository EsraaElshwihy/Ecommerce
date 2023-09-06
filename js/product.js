
// array of favorite item
let favoriteProduct=[];
// to updat array with item in localstorage
if(localStorage.getItem("favorite")){
    favoriteProduct=JSON.parse(localStorage.getItem("favorite"))
}

let chartArray = [];
if (localStorage.getItem("chart")) {
    chartArray = JSON.parse(localStorage.getItem("chart"));
}
function creatProductCard(data) {
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
        favoriteProdcut.classList = `fa-regular fa-heart RelatedFavorite ${data.id}`;
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
    card.append(rateContainer);

    // price
    let priceContaienr = document.createElement("div");
    priceContaienr.classList = "price_container";
    let price = document.createElement("h4");
    let priceContent = document.createTextNode("$" + data.price);
    price.append(priceContent);
    priceContaienr.append(price);
    card.append(priceContaienr);

    let contaienr = document.querySelector(".feature_content .row");
    contaienr.append(card);

}
function creatDescriptionContent(data) {
    let descriptionContainer = document.querySelector(".description");
    let productBrand = document.createElement("h6");
    let productBrandText = document.createTextNode(
        data.category + "/" + data.brand
    );
    productBrand.classList = "product_brand";
    productBrand.append(productBrandText);
    // descriptionContainer.append(productBrand);
    // saved item
    let favoriteProdcut=document.createElement("i")
    favoriteProdcut.classList=`fa-regular fa-heart showAddToFavorite ${data.id}`
    favoriteProdcut.setAttribute("data-favorite",data.id)
    favoriteProdcut.setAttribute("id",data.id)
    // decription_header div
    let descriptionHeader=document.createElement("div");
    descriptionHeader.classList="description_header";
    descriptionHeader.append(productBrand)
    descriptionHeader.append(favoriteProdcut)
    descriptionContainer.append(descriptionHeader)
    // title
    let productTitle = document.createElement("h4");
    let productTitleText = document.createTextNode(data.title);
    productTitle.classList = "product_title";
    productTitle.append(productTitleText);
    descriptionContainer.append(productTitle);
    // price
    let productPrice = document.createElement("h2");
    let productPriceText = document.createTextNode("Price: $" + data.price);
    productPrice.classList = "product_price";
    productPrice.append(productPriceText);
    descriptionContainer.append(productPrice);
    // quantity
    let quantatyContainer = document.createElement("div");
    quantatyContainer.classList = "quantaty_container";
    let productQuentaty = document.createElement("input");
    productQuentaty.setAttribute("type", "number");
    productQuentaty.setAttribute("value", "1");
    productQuentaty.setAttribute("min", "1");
    productQuentaty.classList="productQuantity";
    let addToChartButton = document.createElement("button");
    let addToChartButtonText = document.createTextNode("Add to chart");
    addToChartButton.append(addToChartButtonText);
    addToChartButton.classList = "btn-sm addingProduct";
    addToChartButton.setAttribute("data-price",data.price);
    addToChartButton.setAttribute("data-id",data.id);
    quantatyContainer.append(productQuentaty);
    quantatyContainer.append(addToChartButton);
    descriptionContainer.append(quantatyContainer);
    // product details
    let productDetails = document.createElement("h3");
    let productDetailsText = document.createTextNode("Product Details");
    productDetails.append(productDetailsText);
    descriptionContainer.append(productDetails);
    // description
    let productDescription = document.createElement("p");
    let productDescriptionText = document.createTextNode(data.description);
    productDescription.classList = "product_description";
    productDescription.append(productDescriptionText);
    descriptionContainer.append(productDescription);
}

function productImage() {
    let mainImageSrc = localStorage.getItem("imageId");
    let productGalleryContainer = document.querySelector(".prduct_gallery-img");
    // get api
    let request = new XMLHttpRequest();
    request.open("GET", `https://dummyjson.com/products/${mainImageSrc}`, true);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let datas = JSON.parse(this.response);

            productGalleryContainer.src = datas.thumbnail;
            creatDescriptionContent(datas);
            relatedProduct(datas.category, datas.id);
            let favoriteProduct=document.querySelector(".showAddToFavorite");
            
            loadData(favoriteProduct)
            favoriteProduct.addEventListener("click",()=>{
               
                addFavoriteProductToLocalStorage(favoriteProduct.dataset.favorite,favoriteProduct)
            })
        let addProductToCart=document.querySelector(".addingProduct")
        let qunatity=document.querySelector(".productQuantity");
      
        addProductToCart.onclick=function(){
            let id=addProductToCart.dataset.id;
            let price=addProductToCart.dataset.price;
            let qunatity=document.querySelector(".productQuantity").value;
                 // to check if person have an account
                 if(localStorage.getItem("userInforamtion")){
                    addChartToLocal(id, qunatity,price);
                    cartsNumbers();
                    document.querySelector(".popup").classList.remove("active");
                }else{
                    document.querySelector(".popup_regiser").classList.remove("active");
    
                }
        
        }
        }
    };
}
productImage();
function relatedProduct(category, id) {
    // get api
    let request = new XMLHttpRequest();
    request.open(
        "GET",
        `https://dummyjson.com/products/category/${category}`,
        true
    );
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let dataes = JSON.parse(this.response);
            dataes.products.forEach((data) => {
                if (data.id != id) {
                    creatProductCard(data);
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
                let RelatedFavorite = document.querySelectorAll(".RelatedFavorite");
                RelatedFavorite.forEach((element) => {
                    
                    loadData(element)
                    element.onclick = function () {
                        addFavoriteProductToLocalStorage(element.id, element);
                        
                    };
                });

            }
            });
        }
    };
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
        totalCost(price,q)
    }
    localStorage.setItem("chart",JSON.stringify(chartArray))
}
function closePopup() {
    document.querySelector(".popup").classList.add("active");
}
function closeRegisterPopup() {
    document.querySelector(".popup_regiser").classList.add("active");
}

// add favorite item to localstorage
function addFavoriteProductToLocalStorage(id,icon){
    let clicked=0;
    let favorite={
        id:id,
        colored:1,
    }
    let local=JSON.parse(localStorage.getItem("favorite"));
    if(localStorage.getItem("favorite")){
        local.forEach((item)=>{
            if(item.id == id){
                clicked=item.colored;
            }
        })
    }
    if(clicked==0||clicked==2){
        // gonna work when product clicked for first time
        if(clicked ==0){
            favoriteProduct.push(favorite);
        }else{
            favoriteProduct.forEach((element)=>{
                if(element.id==id){
                    element.colored=1
                }
            })
        }
        icon.classList="fa-solid fa-heart addToFavorite active"
    }else{
        icon.classList="fa-regular fa-heart addToFavorite";
        favoriteProduct.forEach((element)=>{
            if(element.id==id){
                element.colored=2;
                deleteItemFromlocal(element.id)
            }
           
        })
    }
    
    localStorage.setItem("favorite",JSON.stringify(favoriteProduct));
}
// remove product from favorite
function deleteItemFromlocal(id){

    favoriteProduct=favoriteProduct.filter((product)=>product.id != id)
    
}

// load favorite icon from local storage
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
function cartsNumbers(){
    let productNumbers = localStorage.getItem('chart')
    if (productNumbers){
        document.querySelector('.cart span').textContent = JSON.parse(productNumbers).length;
    }
}

function onloadCartNumbers(){
    let productNumbers = localStorage.getItem('chart')
    if (productNumbers){
        document.querySelector('.cart span').textContent = JSON.parse(productNumbers).length;
    }
}
onloadCartNumbers();
function totalCost(price,quanity){
    let cartCost = localStorage.getItem('totalCost');    
    if (cartCost != null){
        cartCost = parseInt(cartCost);
        sum=cartCost+ (+price * +quanity);
        
        localStorage.setItem("totalCost",sum)
    }
    else{
        localStorage.setItem("totalCost", +price);
    }
}