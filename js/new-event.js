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
    complete = false;
    var element = document.getElementById("event-title");
    element.classList.add("is-invalid");
    element.parentElement.innerHTML += '<div class="invalid-feedback">Give your event a title</div>';
  }

  var startDate = document.getElementById("start-date").value;
  if(startDate == '')
  {
    complete = false;
    var element = document.getElementById("start-date");
    element.classList.add("is-invalid");
    element.parentElement.innerHTML += '<div class="invalid-feedback">Give your event a start date</div>';

  }

  var startTime = document.getElementById("start-time").value;
  if(startTime == '')
  {
    complete = false;
    var element = document.getElementById("start-time");
    element.classList.add("is-invalid");
    element.parentElement.innerHTML += '<div class="invalid-feedback">Give your event a start time</div>';

  }

  var endDate = document.getElementById("end-date").value;
  if(endDate == '')
  {
    complete = false;
    var element = document.getElementById("end-date");
    element.classList.add("is-invalid");
    element.parentElement.innerHTML += '<div class="invalid-feedback">Give your event an end date</div>';

  }

  var endTime = document.getElementById("end-time").value;
  if(endTime == '')
  {
    complete = false;
    var element = document.getElementById("end-time");
    element.classList.add("is-invalid");
    element.parentElement.innerHTML += '<div class="invalid-feedback">Give your event an end time</div>';

  }

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
  if(details == '')
  {
    complete = false;
    var element = document.getElementById("details");
    element.classList.add("is-invalid");
    element.parentElement.innerHTML += '<div class="invalid-feedback">Give the details of your event</div>';

  }

  var gamertag = document.getElementById("gamertag").value;
  if(gamertag == '')
  {
    complete = false;
    var element = document.getElementById("gamertag");
    element.classList.add("is-invalid");
    element.parentElement.innerHTML += '<div class="invalid-feedback">Provide your gamertag</div>';

  }

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
  else
  {
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
  }
}
