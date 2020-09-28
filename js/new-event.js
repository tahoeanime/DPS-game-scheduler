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

  //Match to a nice name for the game so we can store it
  var gameNice = "";
  switch(game){
    case "destiny-2":
      gameNice = "Destiny 2";
    break;
    case "elder-scrolls":
      gameNice = "Elder Scrolls";
    break;
    case "other":
      gameNice = "Other";
    break;
  }

  var title = document.getElementById("event-title").value;
  if(title == '')
  {
    complete = false;
    var element = document.getElementById("event-title");
    //Add the is-invalid class which makes the field red
    element.classList.add("is-invalid");
    //Check if the invalid-feeback class has already been added and if not, add it and the necessary html
    if(element.parentElement.querySelector(".invalid-feedback") == null){
      element.parentElement.innerHTML += '<div class="invalid-feedback">Give your event a title</div>';
    }
  }

  var startDate = document.getElementById("start-date").value;
  if(startDate == '')
  {
    complete = false;
    var element = document.getElementById("start-date");
    //Add the is-invalid class which makes the field red
    element.classList.add("is-invalid");
    //Check if the invalid-feeback class has already been added and if not, add it and the necessary html
    if(element.parentElement.querySelector(".invalid-feedback") == null){
    element.parentElement.innerHTML += '<div class="invalid-feedback">Give your event a start date</div>';
    }
  }

  var startTime = document.getElementById("start-time").value;
  if(startTime == '')
  {
    complete = false;
    var element = document.getElementById("start-time");
    //Add the is-invalid class which makes the field red
    element.classList.add("is-invalid");
    //Check if the invalid-feeback class has already been added and if not, add it and the necessary html
    if(element.parentElement.querySelector(".invalid-feedback") == null){
      element.parentElement.innerHTML += '<div class="invalid-feedback">Give your event a start time</div>';
    }
  }

  var endDate = document.getElementById("end-date").value;
  if(endDate == '')
  {
    complete = false;
    var element = document.getElementById("end-date");
    //Add the is-invalid class which makes the field red
    element.classList.add("is-invalid");
    //Check if the invalid-feeback class has already been added and if not, add it and the necessary html
    if(element.parentElement.querySelector(".invalid-feedback") == null){
      element.parentElement.innerHTML += '<div class="invalid-feedback">Give your event an end date</div>';
    }
  }

  var endTime = document.getElementById("end-time").value;
  if(endTime == '')
  {
    complete = false;
    var element = document.getElementById("end-time");
    //Add the is-invalid class which makes the field red
    element.classList.add("is-invalid");
    //Check if the invalid-feeback class has already been added and if not, add it and the necessary html
    if(element.parentElement.querySelector(".invalid-feedback") == null){
      element.parentElement.innerHTML += '<div class="invalid-feedback">Give your event an end time</div>';
    }
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
    //Add the is-invalid class which makes the field red
    element.classList.add("is-invalid");
    //Check if the invalid-feeback class has already been added and if not, add it and the necessary html
    if(element.parentElement.querySelector(".invalid-feedback") == null){
      element.parentElement.innerHTML += '<div class="invalid-feedback">Give the details of your event</div>';
    }
  }

  var gamertag = document.getElementById("gamertag").value;
  if(gamertag == '')
  {
    complete = false;
    var element = document.getElementById("gamertag");
    //Add the is-invalid class which makes the field red
    element.classList.add("is-invalid");
    //Check if the invalid-feeback class has already been added and if not, add it and the necessary html
    if(element.parentElement.querySelector(".invalid-feedback") == null){
      element.parentElement.innerHTML += '<div class="invalid-feedback">Provide your gamertag</div>';
    }
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
      gameNice: gameNice,
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

    //Discord HTTP
    var request = new XMLHttpRequest();
    request.open("POST", "https://discordapp.com/api/webhooks/371746863659089922/N0QZnhnYHMlRX8hj8nuqmXjvFXP8GG-3tNntd-vVSlLrN3D2lo0JnmHK4e8gcVYwFBDF");

    request.setRequestHeader('Content-type', 'application/json');

    //The Message
    var params = {
      content: '@everyone **' + title + ' **' + ' ``` ' + startTime + ' ' + timezone + ' ``` ' + ' created by: ' + ' **'+ gamertag + '**' + ' for ' + '** ' + openSpots + ' ' + 'players' + ' ** ' + ' ``` ' + details + ' ``` ' + ' (Tap the link to sign up for the event) ' + 'https://bmansayswhat.github.io/game-scheduler/event-detail.html?e='+ref.key +"&game="+ game
    }

    //Post to Discord
    request.send(JSON.stringify(params));

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
