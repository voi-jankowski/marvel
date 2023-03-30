//Global variable
var heroImage = $("#hero-image");
var heroCharacter = $("#hero-character");
var heroName = $("#hero-name");
var heroDescription = $("#hero-description");
var heroComics = $("#hero-comics");
var heroSeries = $("#hero-series");
var heroStories = $("#hero-stories");
var heroEvents = $("#hero-events");
var comicsItems = $("#comics-items");
var heroName = $("#hero-name");
var heroNameBtn = $("#hero-name-btn");
var statusCode = $("#status-code");
var statusMessage = $("#status-message");
var errorStatus = $("#error-status");
var heroResultPage = $("#hero-result-page");

//Parameters for Marvel API
var ts = Date.now();
var public_key = "01b22ec1bf1ed69b137633346d18cd93";
var private_key = "ecbc9ce9c1a2d35a974c9e32d6126893492730f6";
var hash = md5(ts + private_key + public_key);
var parameter = "ts=" + ts + "&apikey=" + public_key + "&hash=" + hash;

//Function for API call
function getHero(query) {
  var requestUrl =
    "https://gateway.marvel.com/v1/public/characters?name=" +
    query +
    "&" +
    parameter;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //Code and status display if API call is not successful
      if (data.code !== 200) {
        errorStatus.css("display", "block");
        heroResultPage.css("display", "none");
        statusCode.text("Error Status Code: " + data.code);
        statusMessage.text("Status: " + data.status);
      }
      //Code and status display if API call is successful but no data
      if (data.data.count === 0) {
        errorStatus.css("display", "block");
        heroResultPage.css("display", "none");
        statusCode.text("");
        statusMessage.text("No Result found. Please enter a correct name.");
      }
      //Processing API call response to display in the page
      var imageURLRaw = data.data.results[0].thumbnail.path;
      var imageURL1 = imageURLRaw.slice(0, 4);
      var imageURL2 = imageURLRaw.slice(4);
      var imageURL = imageURL1 + "s" + imageURL2;
      heroImage.attr(
        "src",
        imageURL +
        "." +
        data.data.results[0].thumbnail.extension
      );
      heroName.text(data.data.results[0].name);
      heroDescription.text(data.data.results[0].description);
      heroComics.text(data.data.results[0].comics.available);
      heroSeries.text(data.data.results[0].series.available);
      heroStories.text(data.data.results[0].stories.available);
      heroEvents.text(data.data.results[0].events.available);
      var attribution = $(data.attributionHTML);
      heroCharacter.append(attribution);

      var comicsItem = data.data.results[0].comics.items;
      for (var i = 0; i < comicsItem.length; i++) {
        var comicURIRaw = comicsItem[i].resourceURI;
        var comicURI1 = comicURIRaw.slice(0, 4);
        var comicURI2 = comicURIRaw.slice(4);
        var comicURI = comicURI1 + "s" + comicURI2;
        var requestUrl2 = comicURI + "?" + parameter;
        fetch(requestUrl2)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            var div1 = $("<div>");
            div1.addClass("col l3 m4 s6");
            var div2 = $("<div>");
            div2.addClass("card comics-card");
            var div3 = $("<div>");
            div3.addClass("card-image waves-effect waves-block waves-light");
            var comicImage = $("<img>");

            var comicURLRaw = data.data.results[0].thumbnail.path;
            var comicURL1 = comicURLRaw.slice(0, 4);
            var comicURL2 = comicURLRaw.slice(4);
            var comicURL = comicURL1 + "s" + comicURL2;
            comicImage.attr(
              "src",
              comicURL +
              "." +
              data.data.results[0].thumbnail.extension
            );
            comicImage.addClass("activator");
            var comicDetails = $("<div>");
            comicDetails.addClass("card-content");
            var comicTitle = $("<span>");
            comicTitle.addClass("card-title activator grey-text text-darken-4");
            comicTitle.text(data.data.results[0].title);
            var i1 = $("<i>");
            i1.addClass("material-icons right");
            i1.text("more_vert");
            var cardReveal = $("<div>");
            cardReveal.addClass("card-reveal");
            var span2 = $("<span>");
            span2.addClass("card-title grey-text text-darken-4");
            comicTitle.text(data.data.results[0].title);
            span2.text(data.data.results[0].title);
            var i2 = $("<i>");
            i2.addClass("material-icons right");
            i2.text("close");
            var comicDescription = $("<p>");
            comicDescription.text(data.data.results[0].description);

            div3.append(comicImage);
            comicTitle.append(i1);
            comicDetails.append(comicTitle);
            span2.append(i2);
            cardReveal.append(span2);
            cardReveal.append(comicDescription);
            div2.append(div3);
            div2.append(comicDetails);
            div2.append(cardReveal);
            div1.append(div2);
            comicsItems.append(div1);
            heroResultPage.css("display", "block");
            errorStatus.css("display", "none");
          });
      }
    });
}
errorStatus.css("display", "none");
heroResultPage.css("display", "none");

//Eventlistener for hero name search click
heroNameBtn.on("click", function (event) {
  event.preventDefault();
  var name = heroName.val();
  var queryArray = name.split(" ");
  var query = " ";
  for (let i = 0; i < queryArray.length; i++) {
    query += queryArray[i] + "%20";
  }
  query = query.slice(0, -3).trim();
  heroName.val("");
  getHero(query);
});
