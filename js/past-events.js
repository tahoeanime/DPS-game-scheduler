//Get the current date and store it in milliseconds
//Instead of using Date.now() which is too precise, this stops at day, doesn't include time
var d = new Date();
var date = d.getDate() - 1; //Yesterday
var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
var year = d.getFullYear();
var dateStr = month + "/" + date + "/" + year;
var yesterday = new Date(dateStr).getTime();
var invYesterday = 0-yesterday;
console.log(dateStr);

var localTime = d.getTime();
var today = 0-localTime;

console.log(today);

//Populate templated objects on the page
SetGameSelect();

//Get the selected game from the radio buttons on the page
function GetGame(){
  var radios = document.getElementsByName('game-radios');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      // do whatever you want with the checked radio
      var game = radios[i].value
      // only one radio can be logically checked, don't check the rest
      break;
    }
  }
  GetData(game);
}

//Run the GetGame function to initialize the results on the page
GetGame();
//Get the data from the database
function GetData(game){
  //Clear the html on the page
  document.getElementById("past-events").innerHTML = '';
  //Get the data from the database for the selected radio button
  return database.ref('/' + game).orderByChild('invStartDateMil').startAt(today).limitToFirst(25).once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      //Store the data
      const eventData = childSnapshot.val();
      const eventKey = childSnapshot.key;

      var startDateMil = new Date(eventData.startDateMil);
      var endDateMil = new Date(eventData.endDateMil);
      var startDateLocale = startDateMil.toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short"});
      var endDateLocale = endDateMil.toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short"});

      //The template we'll use for the data
      const eventCard = `
      <div class="row">
        <div class="col-lg-6">
          <div class="card mt-4">
          <img src="${siteURL}/img/${eventData.category}.jpg" class="card-img-top" alt="category image">
            <div class="card-body bg-ltred">
              <h5 class="card-title">${eventData.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${eventData.details}</h6>
              <div class="row mt-4">
                <div class="col-lg"><strong>Start:</strong> ${startDateLocale}</div>
                <div class="col-lg"><strong>End:</strong> ${endDateLocale}</div>
              </div>
              <div class="row mt-4">
                <div class="col">
                  <span class="badge badge-success" id="playerCount-${eventKey}">0/0</span> <span class="badge badge-success" id="backupCount-${eventKey}">0/0</span>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col">
                  <a href="${siteURL}/event-detail-past.html?e=${eventKey}&game=${eventData.game}" class="btn btn-danger btn-block">View event</a>
                </div>
              </div>
            </div>
            <div class="card-footer text-muted">
            Created by: ${eventData.gamertag}
            </div>
          </div>
        </div>
        <div class="col-lg">
        </div>
      </div>`;
      //Add to the html on the page
      document.getElementById("past-events").innerHTML += eventCard;
      console.log(eventData);

      //Seperate out the players joined data from the data we already pulled
      const playerData = eventData.joined;
      const backupData = eventData.backups;

      //Initialize a variable to count players
      var playerCount = 0;

      //Count the players
      for(x in playerData)
      {
        playerCount++;
      }

      //Initialize a variable to count backups
      var backupCount = 0;

      //Count the backups
      for(y in backupData)
      {
        backupCount++;
      }

      //Update the player counts on the page
      document.getElementById("playerCount-"+eventKey).innerHTML = 'Players: ' + playerCount + '/' + eventData.openSpots;
      document.getElementById("backupCount-"+eventKey).innerHTML = 'Backups: ' + backupCount + '/' + eventData.backupSpots;

      //Change the color of the span based on the player counts
      if(playerCount == eventData.openSpots)
      {
        document.getElementById("playerCount-"+eventKey).className = "badge badge-secondary";
      }
      if(backupCount == eventData.backupSpots)
      {
        document.getElementById("backupCount-"+eventKey).className = "badge badge-secondary";
      }

    });
  });
}
