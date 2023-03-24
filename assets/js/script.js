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
var searchButton = $("button");
var resultContainer = $(".container");
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

function getVAl() {
  // console.log(instances[0].getSelectedValues());
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
      var title = savedSearch[i].title;
      var image = savedSearch[i].image;
    }
  }
};

// document.addEventListener("click", getApi);
