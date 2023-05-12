// pseudo code

// User clicks randomizer button
// Page is redirected to results html
// Displayed is a random picture from shibe api and a random quote from zenquotes api
// CSS styles pictures and text
// Bonus: User has the option to download
// Bonus: User can select fonts (Google Fonts), borders (materialize), colors (materialize), etc.
var randomBtn = $('#random-btn')
var customizeBtn = $('#generate-customized')
var resultsHTML = './results.html'
var fullQuote = $(".full-quote");
var fullAuthor = $(".full-author");
var quoteEl = $('#quote')
var authorEl = $('#author')
var bodyEl = $('body');
var imageEL = $('#image')
var divEl = $('#img-container')
var downloadBtn = $('#download-btn')

/* Initializes Materialize Forms */
$(document).ready(function() {
    $('select').formSelect();
 });


/* Modal event listener */
document.addEventListener("DOMContentLoaded", function() {
    var modal = document.querySelectorAll(".modal")
    M.Modal.init(modal)
    });
    

/* Generate quote either randomly or with category based on dropdown input */
var getQuote = function(theme) {
    
    var categories = {
        inspirational: 'inspirational', 
        courage: 'courage',
        empathy: 'empathy',
        friendship: 'friendship', 
        imagination: 'imagination', 
        happiness: 'happiness', 
        knowledge: 'knowledge'
    };
    
    var category;
    
    if (theme && categories.hasOwnProperty(theme)) {
        category = categories[theme];
    } else {
        var categoryKeys = Object.keys(categories);
        var randomIndex = Math.floor(Math.random() * categoryKeys.length);
        category = categories[categoryKeys[randomIndex]];
    }

    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
        headers: { 'X-Api-Key': 'v0tccXcwsiP+3vSXv3/lOg==q1GzyzemvaKPl4ad'},
        contentType: 'application/json',
    }).then(function(result) {
            localStorage.setItem('Quote', result[0].quote)
            
            localStorage.setItem('Author', result[0].author)
           
        },  
    );
}

/* Event listener for Generate button and moves to results page */
randomBtn.click(function() {
    getQuote();
    makeImg();
    window.location.replace(resultsHTML);
    clearPoster();
})

/* Removes previous image and quote from poster div */
function clearPoster() {
    fullQuote.html("");
    fullAuthor.html("");

}

/* Downloads poster as jpg */
downloadBtn.click(function(){
    console.log("hrllo");
    domtoimage.toBlob(document.getElementById("poster-container")).then(function(blob) {
        window.saveAs(blob, "motivated.jpg")
    })
})

/* Function that selects a single api to pull an image from or selects from a random one */
function makeImg(animal) {
    var backgroundImg = {
        dogs: "http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true",
        birds: "https://shibe.online/api/birds?count=1&urls=true&httpsUrls=true",
        cats: "https://shibe.online/api/cats?count=1&urls=true&httpsUrls=true",
    };

    var generateImg;
    if (animal && backgroundImg[animal]) {
        generateImg = backgroundImg[animal];
    } else {
        var cuteImgs = Object.keys(backgroundImg);
        var randomIndex = Math.floor(Math.random() * cuteImgs.length);
        var randomImg = cuteImgs[randomIndex];
        generateImg = backgroundImg[randomImg];
    }

    fetch(generateImg)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        localStorage.setItem('posterImage', data[0]);
    });
}

/* Listener for generate button on the customizable modal to pass values to each function  */
customizeBtn.click(function() {
    var animal = $("#animal").val();
    var theme = $("#theme").val();
    var font = $("#font").val();
    makeImg(animal);
    getQuote(theme);
})





    