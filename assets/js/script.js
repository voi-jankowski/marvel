// Add function for the carousel.
$(document).ready(function () {
  $(".carousel").carousel({
    indicators: true,
  });
});

// function to make mobile dropdown navbar work.

$(document).ready(function () {
  $(".dropdown-trigger").dropdown();
});

//global variables (used for carousel)
var movieContent = document.querySelector(".card-content");
var carouselItem = document.querySelector(".carousel-item");
//moviedb API
var APIKey = "k_42i4oflg";

// Movie countdown carousel
// Checking release date of movie is in the future
function isDateInFuture(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  return date.getTime() > now.getTime();
}

function getMovies(futureMovieArray) {
  var APIURL =
    "https://api.themoviedb.org/3/list/140624?api_key=d9c490609e2985e864fc511399c550ca&language=en-US";
  fetch(APIURL)
    .then(function (repsonse) {
      return repsonse.json();
    })
    .then(function (data) {
      console.log(data);

      let counter = 0;
      for (var i = 0; i < data.items.length && counter < 8; i++) {
        if (isDateInFuture(data.items[i].release_date + "T12:00:00.000Z")) {
          var title = document.querySelector(".title" + (counter + 1));
          var timerHeading = document.querySelector(".timer" + (counter + 1));
          var countDownImage = document.querySelector(".image" + (counter + 1));
          var countDownTimer = new Date(data.items[i].release_date);

          // Get today's date and time
          var now = new Date().getTime();
          console.log(now);

          // Find the difference between now and the count down date
          var timeUntilNextRelease = countDownTimer - now;
          setCountdown(timeUntilNextRelease, timerHeading);
          console.log(timeUntilNextRelease);

          // to do - resolve set interval erroes and get time to update
          console.log(timerHeading);
          //Title
          title.textContent = data.items[i].original_title;
          //Image
          countDownImage.setAttribute(
            "src",
            "https://image.tmdb.org/t/p/w500" + data.items[i].poster_path
          );

          $(countDownImage).on("click", function (event) {
            var filmTitle = $(event.target).next().text();
            console.log(filmTitle);
            getApi(filmTitle);
          });

          counter++;
        }
      }
    });
}

// Created the function outside the getMovies function to set the interval for the countdown clock.
function setCountdown(timeUntilNextRelease, timerHeading) {
  setInterval(function () {
    var days = Math.floor(timeUntilNextRelease / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (timeUntilNextRelease % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor(
      (timeUntilNextRelease % (1000 * 60 * 60)) / (1000 * 60)
    );

    var seconds = Math.floor((timeUntilNextRelease % (1000 * 60)) / 1000);

    //Timer

    timerHeading.textContent =
      "Next Marvel Film Release: " +
      days +
      "d " +
      hours +
      "h " +
      minutes +
      "m " +
      seconds +
      "s ";

    timeUntilNextRelease -= 1000;
  }, 1000);
}

getMovies();

// JavaScript for dropdown search options.
var instances;
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll("select");
  const options = [
    { name: "Ant-Man", value: "Ant-Man" },
    { name: "Ant-Man and the Wasp", value: "Ant-Man and the Wasp" },
    {
      name: "Ant-Man and the Wasp: Quantumania",
      value: "Ant-Man and the Wasp: Quantumania",
    },
    { name: "Avengers: Age of Ultron", value: "Avengers: Age of Ultron" },
    { name: "Avengers: Infinity War", value: "Avengers: Infinity War" },
    { name: "Avengers: Endgame", value: "Avengers: Endgame" },
    { name: "Avengers: The Kang Dynasty", value: "Avengers: The Kang Dynasty" },
    { name: "Avengers: Secret Wars", value: "Avengers: Secret Wars" },
    { name: "Black Panther", value: "Black Panther" },
    {
      name: "Black Panther: Wakanda Forever",
      value: "Black Panther: Wakanda Forever",
    },
    { name: "Black Widow", value: "Black Widow" },
    { name: "Blade", value: "Blade" },
    { name: "Blade 2", value: "Blade 2" },
    { name: "Captain America: Civil War", value: "Captain America: Civil War" },
    {
      name: "Captain America: The First Avenger",
      value: "Captain America: The First Avenger",
    },
    {
      name: "Captain America: The Winter Soldier",
      value: "Captain America: The Winter Soldier",
    },
    {
      name: "Captain America: New World Order",
      value: "Captain America: New World Order",
    },
    { name: "Captain Marvel", value: "Captain Marvel" },
    { name: "Dark Phoenix", value: "Dark Phoenix" },
    { name: "Deadpool", value: "Deadpool" },
    { name: "Deadpool 2", value: "Deadpool 2" },
    { name: "Deadpool 3", value: "Deadpool 3" },
    { name: "Doctor Strange", value: "Doctor Strange" },
    {
      name: "Doctor Strange in the Multiverse of Madness",
      value: "Doctor Strange in the Multiverse of Madness",
    },
    { name: "Eternals", value: "Eternals" },
    { name: "Fantastic Four", value: "Fantastic Four" },
    { name: "Guardians of the Galaxy", value: "Guardians of the Galaxy" },
    {
      name: "Guardians of the Galaxy Vol. 2",
      value: "Guardians of the Galaxy Vol. 2",
    },
    {
      name: "Guardians of the Galaxy Vol. 3",
      value: "Guardians of the Galaxy Vol. 3",
    },
    { name: "Iron Man", value: "Iron Man" },
    { name: "Iron Man 2", value: "Iron Man 2" },
    { name: "Iron Man 3", value: "Iron Man 3" },
    { name: "Logan", value: "Logan" },
    {
      name: "Shang-Chi and the Legend of the Ten Rings",
      value: "Shang-Chi and the Legend of the Ten Rings",
    },
    { name: "Spider-Man", value: "Spider-Man" },
    { name: "Spider-Man 2", value: "Spider-Man 2" },
    { name: "Spider-Man: Homecoming", value: "Spider-Man: Homecoming" },
    { name: "Spider-Man: Far From Home", value: "Spider-Man: Far From Home" },
    { name: "Spider-Man: No Way Home", value: "Spider-Man: No Way Home" },
    { name: "The Avengers", value: "The Avengers" },
    { name: "The Incredible Hulk", value: "The Incredible Hulk" },
    { name: "The Marvels", value: "The Marvels" },
    { name: "The New Mutants", value: "The New Mutants" },
    { name: "Thor", value: "Thor" },
    { name: "Thor: Ragnarok", value: "Thor: Ragnarok" },
    { name: "Thor: The Dark World", value: "Thor: The Dark World" },
    { name: "Thor: Love and Thunder", value: "Thor: Love and Thunder" },
    { name: "Thunderbolts", value: "Thunderbolts" },
    { name: "The Wolverine", value: "The Wolverine" },
    { name: "X-Men", value: "X-Men" },
    { name: "X2", value: "X2" },
    { name: "X-Men: The Last Stand", value: "X-Men: The Last Stand" },
    { name: "X-Men Origins: Wolverine", value: "X-Men Origins: Wolverine" },
    { name: "X-Men: First Class", value: "X-Men: First Class" },
    { name: "X-Men: Days of Future Past", value: "X-Men: Days of Future Past" },
    { name: "X-Men: Apocalypse", value: "X-Men: Apocalypse" },
  ];
  instances = M.FormSelect.init(elems, options);
});

// GLOBAL VARIABLES
var mainPageEl = $("#main-page");
var resultPageEl = $("#result-page");
var mainNav = $("#main-nav");
var resultsNav = $("#results-nav");
var recentSearchesEL = $("#recent-searches");
var resultTitle = $("#result-title");
var resultYear = $("#result-year");
var resultRating = $("#result-rating");
var resultRuntime = $("#result-runtime");
var resultImage = $("#result-image");
var resultTrailer = $("#result-trailer");
var resultPlot = $("#result-plot");
var resultDirectors = $("#result-directors");
var resultStars = $("#result-stars");

const apiKey = "k_42i4oflg";

function getApi(expression) {
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
          resultTitle.text(data.title);
          console.log(data.year);
          resultYear.text(data.year);
          console.log(data.contentRating);
          resultRating.text(data.contentRating);
          console.log(data.runtimeStr);
          resultRuntime.text(data.runtimeStr);
          console.log(data.image);
          resultImage.attr("src", data.image);
          console.log(data.trailer.linkEmbed);
          resultTrailer.attr("src", data.trailer.linkEmbed);
          console.log(data.plot);
          resultPlot.text(data.plot);
          console.log(data.directors);
          resultDirectors.text(data.directors);
          console.log(data.stars);
          resultStars.text(data.stars);

          var newSearch = {
            title: data.title,
            image: data.image,
          };

          var savedSearch =
            JSON.parse(localStorage.getItem("savedSearch")) || [];

          if (savedSearch.length < 6) {
            // Check if title already exist
            if (
              savedSearch.some(
                (savedSearch) => savedSearch.title === newSearch.title
              )
            ) {
              // Get the index number of the object if title already exists
              var arrayIndex = savedSearch.findIndex(
                (savedSearch) => savedSearch.title === newSearch.title
              );
              // Remove the old object
              savedSearch.splice(arrayIndex, 1);
              // Push updated object with updated value
              savetoLocal();
            } else {
              savetoLocal();
            }
          } else {
            savedSearch.splice(0, 1);
            savetoLocal();
          }

          function savetoLocal() {
            savedSearch.push(newSearch);
            localStorage.setItem("savedSearch", JSON.stringify(savedSearch));
          }

          mainPageEl.css("display", "none");
          resultPageEl.css("display", "block");
          mainNav.css("display", "none");
          resultsNav.css("display", "block");
        });
    });
}

// When the result page is being displayed pressing the nav bar links takes you back to those elements being displayed and hides the result page.
var link = document.querySelectorAll("a");
for (var j = 0; j < link.length; j++) {
  link[j].addEventListener("click", function (event) {
    mainPageEl.css("display", "block");
    resultPageEl.css("display", "none");
  });
}

function getVAl() {
  // console.log(instances[0].getSelectedValues());
  // window.location.href = 'results.html';
  console.log(document.getElementById("movie-title").value);
  expression = $("#movie-title").val();
  console.log(expression);
  getApi(expression);
}

// Persist saved events during page refresh
window.onload = function () {
  var savedSearch = JSON.parse(window.localStorage.getItem("savedSearch"));
  if (savedSearch !== null) {
    for (var i = 0; i < savedSearch.length; i++) {
      var savedTitle = savedSearch[i].title;
      var savedImage = savedSearch[i].image;
      var div1 = $("<div>");
      div1.addClass("col l6 m4 s6");
      var div2 = $("<div>");
      div2.addClass("card search-tile");
      var div3 = $("<div>");
      div3.addClass("card-image");
      var image = $("<img>");
      image.addClass("poster");
      image.attr("src", savedImage);
      var title = $("<p>");
      title.addClass("saved-title valign-wrapper center-align");
      title.text(savedTitle);

      div3.append(image);
      div3.append(title);
      div2.append(div3);
      div1.append(div2);
      recentSearchesEL.append(div1);
    }
  } else {
    var status = $("<p>");
    status.text("No recent searches");
    recentSearchesEL.append(status);
  }
};

recentSearchesEL.on("click", function (event) {
  event.preventDefault();
  var cardTitle = $(event.target).text();
  console.log(cardTitle);
  getApi(cardTitle);
});
