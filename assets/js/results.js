var randomBtn = $('#random-btn')
var customizeBtn = $('#generate-customized')
var resultsHTML = './results.html'
var quoteEl = $('#quote')
var authorEl = $('#author')
var bodyEl = $('body');
var imageEL = $('#image')
var divEl = $('#img-container')
var downloadBtn = $('#download')

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

/* Quote generation function */
var getQuote = function() {
    var category = 'inspirational'
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
        headers: { 'X-Api-Key': 'v0tccXcwsiP+3vSXv3/lOg==q1GzyzemvaKPl4ad'},
        contentType: 'application/json',
    }).then(function(result) {
            /* console.log(result[0].quote); */
            localStorage.setItem('Quote', result[0].quote)
            localStorage.setItem('Author', result[0].author)
        },  
    );
}

/* Function which appends a different font-family to the .full-quote and .full-author classes based on dropdown value */

/* Displays quote and image saved in local storage */
if(localStorage.getItem('Quote') != null){
    var fullQuote = $(".full-quote").html(localStorage.getItem('Quote'));
    quoteEl.append(fullQuote);
    var fullAuthor = $(".full-author").html(localStorage.getItem('Author'));
    authorEl.append(fullAuthor);

    var posterImage = localStorage.getItem('posterImage');
    $(".poster").css("background-image", `url(${posterImage})`);
}

/* Event listener for Generate button */
randomBtn.click(function() {
    getQuote();
    makeImg();
    clearPoster();

    var fullQuote = $(".full-quote").html(localStorage.getItem('Quote'));
    quoteEl.append(fullQuote);
    var fullAuthor = $(".full-author").html(localStorage.getItem('Author'));
    authorEl.append(fullAuthor);
    
    var posterImage = localStorage.getItem('posterImage');
    $(".poster").css("background-image", `url(${posterImage})`);
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

/* Function with IF statements which selects a single api to pull an image from or randomizes and selects from a random one */

/* Function generates image by choosing random API from backgroundIMG object */
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
        console.log(data[0]);
        localStorage.setItem('posterImage', data[0]);
        $(".poster").css("background-image", `url(${data[0]})`);
    });
}

customizeBtn.click(function() {
    var animal = $("#animal").val();
    var theme = $("#theme").val();
    var font = $("#font").val();
    console.log(animal);
    console.log(theme);
    console.log(font);
    makeImg(animal);
    
})