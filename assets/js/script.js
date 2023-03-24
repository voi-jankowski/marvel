var searchButton = $("button");
var expression = $("#movie-title").val();
var resultContainer = $(".container");
console.log(expression);
const apiKey = "k_42i4oflg";

function getApi() {
  //   expression = "spiderman"; //sample search keyword only
  var requestUrl =
    "https://imdb-api.com/en/API/SearchMovie/" + apiKey + "/" + expression;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var requestUrl2 =
        "https://imdb-api.com/en/API/Title/" +
        apiKey +
        "/" +
        data.results[0].id +
        "/Trailer";
      // console.log(requestUrl2);

      fetch(requestUrl2)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          console.log(data.title);
          console.log(data.year);
          console.log(data.contentRating);
          console.log(data.runtimeStr);
          console.log(data.image);
          console.log(data.trailer.linkEmbed);
          console.log(data.plot);
          console.log(data.directors);
          console.log(data.stars);

          var newSearch = {
            title: data.title,
            image: data.image,
          };

          var savedSearch =
            JSON.parse(localStorage.getItem("savedSearch")) || [];
          savedSearch.push(newSearch);
          localStorage.setItem("savedSearch", JSON.stringify(savedSearch));
        });
    });
}

// Persist saved events during page refresh
window.onload = function () {
  var savedSearch = JSON.parse(window.localStorage.getItem("savedSearch"));
  if (savedSearch !== null) {
    for (var i = 0; i < savedSearch.length; i++) {
      var title = savedSearch[i].title;
      var image = savedSearch[i].image;
    }
  }
};

document.addEventListener("click", getApi);
