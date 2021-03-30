var userNameEl = document.querySelector("#userName");
var zipCodeEl = document.querySelector("#zipInput");
var dogBreedEl = document.querySelector("#breedList");
var dogGenderEl = document.querySelector("#genderList");
var submitBtn = document.querySelector("#submitBtn");

var apiKey = "wXLHuqnERd3gBuA4H9pf8ebYS7pbCkJ82IUssFuZq2R6MVIqrg";

// submit btn
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  //user name input
  var userName = userNameEl.value;
  var zipCode = zipCodeEl.value;
  // var userName = document.querySelector("#parentName").innerText;
  if (userName) {
    console.log(userName);
    console.log(zipCode);
  }
});

