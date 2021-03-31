var userNameEl = document.querySelector("#userName");
var zipCodeEl = document.querySelector("#zipInput");
var dogBreedEl = document.querySelector("#breedList");
var dogGenderEl = document.querySelector("#genderList");
var submitBtn = document.querySelector("#submitBtn");
var apiKey = "wXLHuqnERd3gBuA4H9pf8ebYS7pbCkJ82IUssFuZq2R6MVIqrg";
var apiSecret = "MHoCHbdR6geJ7b3lU2UTlWiXTCbZbaOwaKYUUJoQ";
// var apiToken = "";

// POST
if (!localStorage.getItem("petAPIToken")) {
  fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "grant_type": "client_credentials",
      "client_id": "wXLHuqnERd3gBuA4H9pf8ebYS7pbCkJ82IUssFuZq2R6MVIqrg",
      "client_secret": "MHoCHbdR6geJ7b3lU2UTlWiXTCbZbaOwaKYUUJoQ",
    }),
    // Putting access token in local storage as petapi token 
  }).then(response => response.json())
    .then(data => {
      localStorage.setItem('petAPIToken', `Bearer ${data.access_token}`);
      // If token is expired, it gets removed
      setTimeout(function () {
        localStorage.removeItem('petAPIToken')
      }, 3600000)
    })
    .catch((error) => {
      console.error('Error:', error);
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
});
 

var token = localStorage.getItem('petAPIToken')
function getApi() {
  fetch('https://api.petfinder.com/v2/animals?type=dog', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': { token },
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
  .then(data => {
    console.log("test")
  }) 
}