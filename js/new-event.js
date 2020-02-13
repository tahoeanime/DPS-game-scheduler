$('#start-date').pickadate({
  format: 'mm/dd/yyyy',
  min: 0
});
$('#end-date').pickadate({
  format: 'mm/dd/yyyy',
  min: 0
});
$('#start-time').pickatime({
  min: 0
});
$('#end-time').pickatime({
  min: 0
});

// Make sure any browser can get today's Date
// This will be inverted and stored so we can retrieve items in desc order
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

// Function called when submit button is pressed
function SubmitEvent() {

  var complete = new Boolean(true);

  //Get the values of each form input and set as variables
  var gameRadios = document.getElementsByName('game-radios');
  for (var i = 0, length = gameRadios.length; i < length; i++) {
    if (gameRadios[i].checked) {
      // do whatever you want with the checked radio
      var game = gameRadios[i].value
      // only one radio can be logically checked, don't check the rest
      break;
    }
  }
  var title = document.getElementById("event-title").value;
  if(title == '')
  {
    alert("add a title");
    complete = false;
  }
  var startDate = document.getElementById("start-date").value;
  var startTime = document.getElementById("start-time").value;
  var endDate = document.getElementById("end-date").value;
  var endTime = document.getElementById("end-time").value;

  var tzRadios = document.getElementsByName('timezones');
  for (var i = 0, length = tzRadios.length; i < length; i++) {
    if (tzRadios[i].checked) {
      // do whatever you want with the checked radio
      var timezone = tzRadios[i].value
      // only one radio can be logically checked, don't check the rest
      break;
    }
  }
  var openSpots = document.getElementById("open-spots").value;
  var backupSpots = document.getElementById("backup-spots").value;
  var details = document.getElementById("details").value;
  var gamertag = document.getElementById("gamertag").value;
  var inverseDate = 0 - Date.now();
  var startDateMil = new Date(startDate).getTime();
  var invStartDateMil = 0-startDateMil;

  //If the fields are all complete, add to the database
  if(complete == true)
  {
    //Write the data to the database NOTE: push() updates and set() overwrites
    var ref = firebase.database().ref().child(game).push({
      game: game,
      title: title,
      startDate : startDate,
      startTime : startTime,
      endDate : endDate,
      endTime : endTime,
      timezone : timezone,
      openSpots : openSpots,
      backupSpots : backupSpots,
      details : details,
      gamertag : gamertag,
      inverseDate : inverseDate,
      playersJoined : 0,
      playersBackup : 0,
      startDateMil : startDateMil,
      invStartDateMil : invStartDateMil
    });

    //set the form action to open the event details page which will show the data for the event
    // document.getElementById("new-event").action = "https://bmansayswhat.github.io/game-scheduler/event-detail.html?e="+ref.key +"&game="+game;
    document.location.href="https://bmansayswhat.github.io/game-scheduler/event-detail.html?e="+ref.key +"&game="+game;
  }
}
