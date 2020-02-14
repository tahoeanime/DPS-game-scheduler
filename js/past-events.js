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
  return database.ref('/' + game).orderByChild('invStartDateMil').startAt(invYesterday).limitToFirst(25).once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      //Store the data
      const eventData = childSnapshot.val();
      const eventKey = childSnapshot.key;
      console.log(eventKey);
      //The template we'll use for the data
      const eventCard = `
      <div class="col-lg-6">
        <div class="card mt-4">
          <div class="card-body">
            <h5 class="card-title">${eventData.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${eventData.details}</h6>
            <div class="row mt-4">
              <div class="col-lg"><strong>Start:</strong> ${eventData.startDate} ${eventData.startTime} ${eventData.timezone}</div>
              <div class="col-lg"><strong>End:</strong> ${eventData.endDate} ${eventData.endTime} ${eventData.timezone}</div>
            </div>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><span class="badge badge-success" id="playerCount-${eventKey}">0/0</span> <span class="badge badge-success" id="backupCount-${eventKey}">0/0</span></li>
          </ul>
          <div class="card-body">
            <a href="https://bmansayswhat.github.io/game-scheduler/event-detail.html?e=${eventKey}&game=${eventData.game}" class="btn btn-primary">View event</a>
          </div>
          <div class="card-footer text-muted">
          Created by: ${eventData.gamertag}
          </div>
        </div>
      </div>
      <div class="col-lg"
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
