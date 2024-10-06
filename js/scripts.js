let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
//open cart
cartIcon.onclick = () =>{
    cart.classList.add("active");
    updateTotal();
};
//close cart
closeCart.onclick = () =>{
    cart.classList.remove("active");
};

//cart
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}
else{
    ready();
}

//functions
function ready(){
    // remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removecartItem);
    }
    //quantity change
    var QuantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < QuantityInputs.length; i++){
        var input = QuantityInputs[i]
        input.addEventListener('change', quantityChanged);
    }
    //add to cart
    var addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i]
        button.addEventListener('click', addCartClicked);
    }
    //Buy button work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)
}

//buy button
function buyButtonClicked(){
    
}

//remove items from cart
function removecartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

//quanitty change
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}

//add to cart
function addCartClicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText
    var price = shopProducts.getElementsByClassName('price')[0].innerText
    var productImage = shopProducts.getElementsByClassName('product-img')[0].src
    addProductToCart(title,price,productImage);
    updateTotal();
}

function addProductToCart(title, price, productImage){
    var cartShopBox = document.createElement('div')
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
    for (var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            alert('You have already added this item to cart')
            return;
        }
    }
    var cartBoxContent = `
        <img src="${productImage}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- remove cart -->
        <i class='bx bxs-trash cart-remove' ></i>`;

    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removecartItem)
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
}

// update total
function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('€', ""))
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        //if price cents
        total =  Math.round(total *  100)/100;

        document.getElementsByClassName('total-price')[0].innerText = '€' + total;
    
}