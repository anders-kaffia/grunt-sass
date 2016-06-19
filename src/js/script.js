init();
/*===========================
*		  VARIABLES			*
===========================*/
var prodBank = '';
var allProducts = document.getElementById('primary');
/* 'totalPrice' and 'total' are used to calculate a total price for the products */
var totalPrice = '<div id="sum"><h3>Total cost is: <span></span></h3></div>';
var total = 0;

/*===========================
*		  FUNCTIONS			*
===========================*/
/* Loads the products.json file with AJAX */
function init() {
	var prodLoader = new XMLHttpRequest();
	/* Forces the filetype to .json */
	prodLoader.overrideMimeType("application/json");
	prodLoader.open('GET', 'products.json', true);
	prodLoader.onreadystatechange = function() { 
		if(prodLoader.readyState == 4 && prodLoader.status == 200) { 
			prodBank = JSON.parse(prodLoader.responseText);
		}
	}
	prodLoader.send();
	return prodBank;
}
/* Prints out all the products to the #primary div */
function listAllProducts() {
	$(allProducts).html('<h1>Donuts!</h1><span>Here they are, mmmmm..</span><ul id="ul-products"></ul>');
	for(var donut in prodBank.donuts) {
		var img = prodBank.donuts[donut].imgLocation;
		var desc = prodBank.donuts[donut].desc;
		var price = prodBank.donuts[donut].cost;
		var id = prodBank.donuts[donut].id;
		$("#ul-products").append('<li><p>' + desc + '</p><img src="img/' + img + '" alt="plain"><p>Price: ' + price + ' dollars</p><h3>Order quantity: </h3><input type="number" id="' + id + '" data-price="'+price+'"></li>');
	}
	$(totalPrice).appendTo(allProducts);
	$("input").change(function() {
		total = 0;
		$("input").each(function() {
			total += Number($(this).val()) * Number($(this).data('price'));
		});
		$("#sum span").html(total+" dollars.");
	});
}
/*===========================
*		  WIRING			*
===========================*/
/* Toggles the 'hamburger menu' */
$(".mobile-menu").on("click", function(e) {
  e.preventDefault();
  $(".menu").toggleClass("open", 100000);
});
/* 
* The following code binds divs and anchors to AJAX-requests. 
* When the binded element is clicked, it shows the requested information in target div(#primary).
* e.preventDefault(); prevents the page from reloading, and only reloades the content in #primary
*/
$("#primary a").on("click", function(e) {
	e.preventDefault();
	listAllProducts();
});
$("#products").on("click", function(e) {
	e.preventDefault();
	listAllProducts();
});
$("#about").on("click", function(e) {
	e.preventDefault();
	$("#primary").load("pages/about.html");
});
$("#location").on("click", function(e) {
	e.preventDefault();
	$("#primary").load("pages/location.html");
});
