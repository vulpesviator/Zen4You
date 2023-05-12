var randomBtn = $('#random-btn')
var resultsHTML = './results.html'
var quoteEl = $('#quote')
var authorEl = $('#author')
var bodyEl = $('body');
var imageEL = $('#image')
var divEl = $('#img-container')
var downloadBtn = $('#download')

if (localStorage.getItem('font-family') != null){
    var font = localStorage.getItem('font-family')
    $(".full-quote").css("font-family", font)
    $(".full-author").css("font-family", font)
}

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

var img = document.createElement("img");
divEl.append(img);

if(localStorage.getItem('Quote') != null){
    var fullQuote = $(".full-quote").html(localStorage.getItem('Quote'));
    quoteEl.append(fullQuote);
    var fullAuthor = $(".full-author").html(localStorage.getItem('Author'));
    authorEl.append(fullAuthor);

    var posterImage = localStorage.getItem('posterImage');
    $(".poster").css("background-image", `url(${posterImage})`);
}

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


function clearPoster() {
    fullQuote.html("");
    fullAuthor.html("");

}

downloadBtn.click(function(){
    console.log("hrllo");
    domtoimage.toBlob(document.getElementById("img-container")).then(function(blob) {
        window.saveAs(blob, "motivated.jpg")
    })
})



function makeImg() {
    var backgroundImg = {
        shiba: "http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true",
        birds: "https://shibe.online/api/birds?count=1&urls=true&httpsUrls=true",
        cats: "https://shibe.online/api/cats?count=1&urls=true&httpsUrls=true",
    };

    var cuteImgs = Object.keys(backgroundImg);
    var randomIndex = Math.floor(Math.random() * cuteImgs.length);
    var randomImg = cuteImgs[randomIndex];
    var generateImg = backgroundImg[randomImg];


    fetch(generateImg)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data[0]);

        localStorage.setItem('posterImage', data[0]);
    });
}

makeImg();