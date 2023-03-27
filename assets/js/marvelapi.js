var heroImage = $("#hero-image");
var heroCharacter = $("#hero-character");
var heroName = $("#hero-name");
var heroDescription = $("#hero-description");
var heroComics = $("#hero-comics");
var heroSeries = $("#hero-series");
var heroStories = $("#hero-stories");
var heroEvents = $("#hero-events");
var comicsItems = $("#comics-items");

var ts = Date.now();
var public_key = "b1afdf67373bc4db632b9b0eef7c26b2";
var private_key = "6c62bf011bbb7b98ee7aeff5d9a7f519a467a3d3";
var hash = md5(ts + private_key + public_key);
var parameter = "ts=" + ts + "&apikey=" + public_key + "&hash=" + hash;

console.log(hash);

function getApi() {
  var requestUrl =
    "http://gateway.marvel.com/v1/public/characters?name=Hulk&" + parameter;
  console.log(requestUrl);

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //Using console.log to examine the data
      console.log(data);
      heroImage.attr(
        "src",
        data.data.results[0].thumbnail.path +
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
        // console.log(comicsItem[i].name);
        // console.log(comicsItem[i].resourceURI);
        var comicURI = comicsItem[i].resourceURI;
        var requestUrl2 = comicURI + "?" + parameter;
        console.log(requestUrl2);
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
            comicImage.attr(
              "src",
              data.data.results[0].thumbnail.path +
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
          });
      }
    });
}

getApi();
