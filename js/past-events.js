//Get the current date and store it in milliseconds
//Instead of using Date.now() which is too precise, this stops at day, doesn't include time
var d = new Date();
var date = d.getDate() - 1; //Yesterday
var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
var year = d.getFullYear();
var dateStr = month + "/" + date + "/" + year;
var yesterday = new Date(dateStr).getTime();
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
  return database.ref('/' + game).orderByChild('startDateMil').endAt(yesterday).once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      //Store the data
      const eventData = childSnapshot.val();
      const eventKey = childSnapshot.key;
      console.log(eventKey);
      //The template we'll use for the data
      const eventCard = `
      <div class="col-md">
        <div class="card">
          <h5 class="card-header">${eventData.title}</h5>
          <div class="card-body">
            <p class="card-text" id="event1">${eventData.details}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"></li>
            <li class="list-group-item"><strong>Players:</strong> ${eventData.openSpots}</li>
            <li class="list-group-item"><strong>Start time:</strong> ${eventData.startDate} ${eventData.startTime} ${eventData.timezone}</li>
            <li class="list-group-item"><strong>End time:</strong> ${eventData.endDate} ${eventData.endTime} ${eventData.timezone}</li>
          </ul>
          <div class="card-body">
            <a href="https://bmansayswhat.github.io/game-scheduler/event-detail.html?e=${eventKey}&game=${eventData.game}" class="btn btn-primary">View event</a>
          </div>
        </div>
      </div>`;
      //Add to the html on the page
      document.getElementById("past-events").innerHTML += eventCard;
      console.log(eventData);
    });
  });
}
