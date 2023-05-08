let carticon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closecart = document.querySelector("#close-cart");

//Open Cart
carticon.addEventListener("click" ,() =>{
    cart.classList.add("active");
});
// Close cart
closecart.addEventListener("click", () =>{
    cart.classList.remove("active")
});

//Cart  Working JS
if (document.readyState == "loading"){
     document.addEventListener('DOMContentLoaded' , ready());
}
else{
    ready()
}

//Making function 
function ready(){

    //Remove Items From Cart
var removecartbuttons = document.getElementsByClassName('cart-remove') 
for ( var i = 0; i < removecartbuttons.length; i++)
{
    var buttonsclicked = removecartbuttons[i];
    buttonsclicked.addEventListener("click", removeCartItems)
} 




//Quantity changes
var quantityInputs = document.getElementsByClassName("cart-quantity");
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
}
 
//Add To Cart
var addcart = document.getElementsByClassName('add-cart')
for (var i = 0; i < addcart.length; i++){
    var buttoned = addcart[i]
    buttoned.addEventListener('click', addcartclicked )
}

//Buy Button Work
document.getElementsByClassName('btn-buy')[0].addEventListener('click' , buybuttonclicked)
}

function buybuttonclicked(){
    alert('your order is placed')
    var cartcontent = document.getElementsByClassName('cart-content')[0]
    while(cartcontent.hasChildNodes()) {
        cartcontent.removeChild(cartcontent.firstChild);
     } 
      updateTotal()
}


//Remove Items From Cart

function  removeCartItems (event) {
    var buttonclicked = event.target
    buttonclicked.parentElement.remove();
    updateTotal();
}

// quantity Changes 
function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal()
}

 

//Add to cart
function addcartclicked(event){
    var button = event.target;
    var shopproducts = button.parentElement;
    var title = shopproducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopproducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopproducts.getElementsByClassName('product-img')[0].src;
    addproducttocart(title, price, productImg);
    updateTotal();
}

function addproducttocart(title, price, productImg) {
    var cartshopbox = document.createElement("div");
    cartshopbox.classList.add("cart-box");
    var cartitems = document.getElementsByClassName("cart-content")[0]
    var cartitemsnames = cartitems.getElementsByClassName("cart-product-title")
    for (var i = 0; i < cartitemsnames.length; i++){
     if(cartitemsnames[i].innerText == title) {
        alert("you have already added this item to cart");  
        return;
     }
    }  
     
var cartboxcontent = `
<img src="${productImg}" alt="" class="cart-img">

<div class="detail-box">
 <div class="cart-product-title">${title}</div>
 <div class="cart-price">${price}</div>
 <input type="number" value="1" class="cart-quantity">
</div>
<!-- Remove Cart-->
<i class="fa fa-trash cart-remove" aria-hidden="true"></i> 
`;

cartshopbox.innerHTML = cartboxcontent;
cartitems.append(cartshopbox)
cartshopbox.getElementsByClassName("cart-remove")[0].addEventListener('click', removeCartItems)
cartshopbox.getElementsByClassName("cart-quantity")[0].addEventListener('change', quantityChanged)


}



 //Update Total
function updateTotal () {

    var cartcontent = document.getElementsByClassName('cart-content')[0]
    var  cartboxes = document.getElementsByClassName("cart-box")
    var total = 0;
    for(var i = 0; i < cartboxes.length; i++){

        var cartbox = cartboxes[i]
        var pricelement = cartbox.getElementsByClassName('cart-price')[0]
        var  quantityelement =  cartbox.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(pricelement.innerText.replace("$",""));
        var quantity = quantityelement.value
        total = total + (price * quantity);
    }
        //if price contain some cents value
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "$" + total;

   
}
