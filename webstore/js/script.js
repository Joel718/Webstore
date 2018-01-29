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
    location.href = 'admin/index.html';
    alert("Please login before you buy. Thank you for your purschase");
}

// Loopar ut huvudkategorierna gå vidare till subcategory.
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
            $('.largeview').children('.price').attr('value',productList[i].prodPrice);
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
        $products[$cart_count] = {}
        $products[$cart_count]['name'] = $('.largeview').children('.name').text();
        $products[$cart_count]['title'] = $('.largeview').children('.title').text();
        $products[$cart_count]['price'] = $('.largeview').children('.price').attr('value');
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
            $html = "<table><thead><tr><th></th><th>Name</th><th>Title</th><th>Price</th></tr></thead><tbody>";
            sum = 0;
            for (i = 0; i < $cart_count; i++) {
                sum += parseInt($products[i].price);
                $html += "<tr class=''><td class=''>" + "<img class='photo' src=./img/" + productList[i].image + ">" + "</td><td class=''>" + $products[i].name + "</td><td class=''>"+$products[i].title+"</td><td class=''>"+$products[i].price+"</td></tr>";
            }
            $html += "<tr class=''><td colspan= '2'>total price:</td><td colspan='2'>"+sum+"</td></tr></tbody></table> + 55 for shipping";
            $('.cartview').append($html);
        }
    });
});