var userNameEl = document.querySelector("#userName");
var zipCodeEl = document.querySelector("#zipInput");
var dogBreedEl = document.querySelector("#breedList");
var dogGenderEl = document.querySelector("#genderList");
var submitBtn = document.querySelector("#submitBtn");
var dogNameEl = document.querySelector("#dogName");
var dogImgEl = document.querySelector(".card-img-top");
var submitDogBtn = document.querySelector("#btn3");

//variables for petfinder API. client id = key
var apiKey = "wXLHuqnERd3gBuA4H9pf8ebYS7pbCkJ82IUssFuZq2R6MVIqrg";
var apiSecret = "MHoCHbdR6geJ7b3lU2UTlWiXTCbZbaOwaKYUUJoQ";
// var apiToken = "";

// POST
if (!localStorage.getItem("petAPIToken")) {
  fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: "wXLHuqnERd3gBuA4H9pf8ebYS7pbCkJ82IUssFuZq2R6MVIqrg",
      client_secret: "MHoCHbdR6geJ7b3lU2UTlWiXTCbZbaOwaKYUUJoQ",
    }),
    // Putting access token in local storage as petapi token
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("petAPIToken", `Bearer ${data.access_token}`);
      // If token is expired, it gets removed
      setTimeout(function () {
        localStorage.removeItem("petAPIToken");
      }, 3600000);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// submit btn function
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

  getApi();
});

// Zip code function
var zipcode = zipCodeEl.value;
var token = localStorage.getItem("petAPIToken");
var status = "adoptable";
// var gender = dogGenderEl.value;

function getApi() {
  fetch(
    "https://api.petfinder.com/v2/animals?type=dog&status=" +
      status +
      "&postcode" +
      zipCode +
      "&gender=male" +
      "&limit=100",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      // body: JSON.stringify(data)
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // this is trying to filter the results with dogs that have pictures
      // console.log('pets', data.animals.filter(animal => animal.photos.primary_photo_cropped !== null))
      //console.log('pets', data)
      console.log("pets", data.animals[2].name);
      console.log("img", data.animals[0].photos[0].small);

      dogNameEl.textContent = "Name: " + data.animals[2].name;
      dogImgEl.setAttribute("src", data.animals[0].photos[0].small);
    });
}

// Use Image API to get random images
submitDogBtn.addEventListener("click", function picApi() {
  fetch("https://dog.ceo/api/breeds/image/random", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("randomImage", data);
      // get the image url from the array
      var url = data.message;
      console.log(url);

      // get the image object
      var image = document.querySelector("#dogImage");

      // set the src of the image object
      image.src = url;
    });
});
