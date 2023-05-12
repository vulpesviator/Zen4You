// pseudo code

// User clicks randomizer button
// Page is redirected to results html
// Displayed is a random picture from shibe api and a random quote from zenquotes api
// CSS styles pictures and text
// Bonus: User has the option to download
// Bonus: User can select fonts (Google Fonts), borders (materialize), colors (materialize), etc.
var randomBtn = $('#random-btn')
var resultsHTML = './results.html'
var quoteEl = $('#quote')

document.addEventListener("DOMContentLoaded", function() {
    var modal = document.querySelectorAll(".modal")
    M.Modal.init(modal)
    })    

var getQuote = function() {
    var category = 'inspirational'
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
        headers: { 'X-Api-Key': 'v0tccXcwsiP+3vSXv3/lOg==q1GzyzemvaKPl4ad'},
        contentType: 'application/json',
    }).then(function(result) {
        console.log(result[0].quote);
        localStorage.setItem('Quote', result[0].quote)
        localStorage.setItem('Author', result[0].author)
    },  
    );
}

function makeImg(animal) {
    var backgroundImg = {
        shiba: "http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true",
        birds: "https://shibe.online/api/birds?count=1&urls=true&httpsUrls=true",
        cats: "https://shibe.online/api/cats?count=1&urls=true&httpsUrls=true",
    };

    //var cuteImgs = Object.keys(backgroundImg);
    //var randomIndex = Math.floor(Math.random() * cuteImgs.length);
    //var randomImg = cuteImgs[randomIndex];
    var generateImg = backgroundImg[animal];


    fetch(generateImg)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data[0]);
        
        localStorage.setItem('posterImage', data[0]);
    });
}

randomBtn.click(function() {
    console.log("hello");
    const animal = $("animal").val
    if(animal){
        chooseFont();
        location.replace(resultsHTML) 
        getQuote()
        makeImg(animal)
        quoteEl.text(localStorage.getItem('quote'))
    }
})

//initializes Materialize forms
$(document).ready(function() {
    $('select').formSelect();
 });

 






// var bodyEl = $('body');


$('.modal-close').click(function(event){
    event.preventDefault();
    chooseFont();
    location.replace(resultsHTML) 

})

function chooseFont(){
    var fontInput = $("#font option:selected").val();
    var allFonts = $('#font');

    var fontArray = [];
    for (var i = 0; i < allFonts.children('#font-style').length; i++){
        fontArray[i] = allFonts.children('#font-style')[i].value;
    }

    if(fontInput == ''){
        var index = Math.floor(Math.random() * fontArray.length)
        fontInput = fontArray[index]
    }

    localStorage.setItem("font-family", fontInput)
}
// customFont();

    