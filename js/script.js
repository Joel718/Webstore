 // Börjar med att skapa globala variabler
var categoryList;
var subCategoryList;
var productList;
var customerList;

// Fetchar in JSON filerna till variablerna jag skapade.
fetch("json/huvudkategorier.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(lt) {
        categoryList = lt;
        showMainCategory();
    });
fetch("json/underkategorier.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(lt) {
        subCategoryList = lt;
    });

fetch("json/produkter.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(lt) {
        productList = lt;
    });

fetch("json/kunder.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(lt) {
        customerList = lt;
    });

// alert när man trycker på köp knappen i kundvagnen.
function alertFunction() {

    alert("Thank you for buying");
}

// Loopar ut huvudkategorierna gå vidare till subcategory. se onclick.
function showMainCategory() {

    $str = "<table><tr>";
    for (i = 0; i < categoryList.length; i++) {
        if (i == 0)
            $str += "<td align='center' class='categoryitem' onclick='showSubCategory(" + i + ")'>" + categoryList[i].mainCategory + "</td>";
        else
            $str += "<td align='center' class='categoryitem' onclick='showSubCategory(" + i + ")'>" + categoryList[i].mainCategory + "</td>";
    }
    $str += "</tr></table>";
    $('.category').append($str);

}

// underkategorierna
function showSubCategory(index) { 
    $('.sub_category').html('');
    $str = "<ul>";
    for (i = 0; i < subCategoryList.length; i++) {
        if (subCategoryList[i].mainCategory == index + 1)
            $str += "<li class='subitem' onclick='showProduct(" + index + "," + subCategoryList[i].id + ");'>" + subCategoryList[i].subCategory + "</li>";
    }
    $str += "</ul>";
    $('.sub_category').append($str);
    $('.route').text(categoryList[index].mainCategory);
    $('.mask,.largeview,.cartview').fadeOut();
}


// produkterna
function showProduct(mainIndex, subIndex) {
    $('.content').html('');
    $str = "";
    for (i = 0; i < productList.length; i++) {
        if (productList[i].mainCategory == mainIndex +1 && productList[i].subCategory == subIndex)
            $str += "<div class='productitem' onclick='largeview(" + (mainIndex +1) + "," + subIndex +")'>" + "<span class='image'>" +"<img class='photo' src=./img/" + productList[i].image + ">'" + "</span><span class='name'>" + productList[i].prodName + "</span><span class='price'>price: " + productList[i].prodPrice + "</span></div>";
    }
    $('.content').append($str);
    $('.mask,.largeview').fadeOut();
}



// Produktinfo
function largeview(m, n) {
    for (i=0;i<productList.length;i++) {
        if (productList[i].mainCategory == m && productList[i].subCategory == n) {
            $('.largeview').children('.name').text(productList[i].prodName);
            $('.largeview').children('.title').text(productList[i].prodDesc);
            $('.largeview').children('.price').text('price:'+productList[i].prodPrice);
            break;
        }			
    }
    
    $('.mask,.largeview').fadeIn();
}

// Börjar med kundvagnen, lägger till och räkna produkterna till array
$(function() {
    $cart_count = 0;
    $products = new Array();
    $('.buy').click(function() {
        $('.mask,.largeview').fadeOut();
        $products[$cart_count] = $('.largeview').children('.name').text();
        $cart_count++;
        $('.shoppingcart').text('Cart : ' + $cart_count);
    });

    // Kryssa ner
    $('.exit').click(function() {
        $('.mask,.largeview').fadeOut();
    });

    // Kundvagnen och knapp för "check out"
    $('.shoppingcart').click(function() {
        $('.largeview').hide();
        $('.mask,.cartview').fadeIn();
        $('.cartview').html('');
        if ($cart_count == 0)
            $('.cartview').append("<span class='empty'>Empty Cart</span>");
        else {
            $('.cartview').append("<button class='btn' onclick='alertFunction()'>" + "Buy products" + "</button>");
            for (i = 0; i < $cart_count; i++) {
                $('.cartview').append("<div class='cartitem'><img src='img/clone.jpg' class='icon'><span class='name'>" + $products[i] + "</span></div>");

            }
        }
    });
});