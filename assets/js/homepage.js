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

/* Collapisble accordion listerner */
$(document).ready(function(){
    $('.collapsible').collapsible();
  });

/* Carousel javascript */
$(document).ready(function(){
    $('.carousel').carousel({
        padding: 0,
        shift: 5,
        indicators: true,
    });
    autoplay();
function autoplay() {
    $('.carousel').carousel('next');
    setTimeout(autoplay, 2000);
}
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

    localStorage.setItem("QuoteTheme", theme)
}

randomBtn.click(function() {
    console.log("hello");
    const animal = $("animal").val
    localStorage.removeItem('Quote');
    localStorage.removeItem('Author');
    localStorage.removeItem('posterImage');
    localStorage.removeItem('font-family');
    location.replace(resultsHTML)  
});

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

    localStorage.setItem("posterImage", animal);
}

/* Listener for generate button on the customizable modal to pass values to each function  */
customizeBtn.click(function() {
    var animal = $("#animal").val();
    var theme = $("#theme").val();
    var font = $("#font").val();
    makeImg(animal);
    getQuote(theme);
    chooseFont(font);
    chooseBorderColor()
    chooseFontColor()
    choosePosition()
    location.replace(resultsHTML) 

})

//initializes Materialize forms
$(document).ready(function() {
    $('select').formSelect();
 });


function chooseFont(){
    var fontInput = $("#font option:selected").val();
    var allFonts = $('#font');

    var fontArray = [];
    for (var i = 0; i < allFonts.children('#font-style').length; i++){
        fontArray[i] = allFonts.children('#font-style')[i].value;
    }

    if(fontInput == '' || localStorage.getItem('font-family') == 'null' || fontInput == "Random"){
        var index = Math.floor(Math.random() * fontArray.length)
        fontInput = fontArray[index]
    }

    localStorage.setItem("font-family", fontInput)
}

// customFont();
function chooseBorderColor() {
    localStorage.setItem('border-color', $('#border-color').val())
    console.log("border");
}

function chooseFontColor() {
    localStorage.setItem('font-color', $('#font-color').val())
    console.log("color");
}

function choosePosition() {
    var quoteFlex = $("#position").val();
    localStorage.setItem('flex-align', quoteFlex)
    if (quoteFlex === "flex-start") {
        localStorage.setItem('text-align', 'left')
    } else if (quoteFlex === "center") {
        localStorage.setItem('text-align', 'center')
    } else {
        localStorage.setItem('text-align', 'right')
    }     
}
   
