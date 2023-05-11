var randomBtn = $('#random-btn')
var resultsHTML = './results.html'
var quoteEl = $('#quote')
var authorEl = $('#author')
var bodyEl = $('body');
var imageEL = $('#image')
var divEl = $('#img-container')
var downloadBtn = $('#download')

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
    quoteEl.text(`${localStorage.getItem('Quote')}` )
    authorEl.text(`-${localStorage.getItem('Author')}`)
    img.src = `${localStorage.getItem('posterImage')}`;
}

randomBtn.click(function() {
    getQuote()
    makeImg()
    quoteEl.text(`${localStorage.getItem('Quote')}`)
    authorEl.text(`-${localStorage.getItem('Author')}`)
    
    img.src = `${localStorage.getItem('posterImage')}`;
})

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