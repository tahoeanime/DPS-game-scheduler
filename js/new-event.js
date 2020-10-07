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

//Populate templated objects on the page
SetNav();
SetFooter();

var gameChoice = document.getElementById('game-choice');
for(i=0; i<availGamesNice.length; i++)
{
  const gameSelect = `
    <div class="form-check">
      <input class="form-check-input" type="radio" name="game-radios" value="${availGamesID[i]}" id="${availGamesID[i]}" onclick="GetCategories()">
      <label class="form-check-label" for="${availGamesID[i]}">
        <h4>${availGamesNice[i]}</h4>
      </label>
    </div>
  `;
  gameChoice.innerHTML += gameSelect;
}
var gameRadios = document.getElementsByName('game-radios');
gameRadios[0].checked = true;


function GetCategories()
{
  for (var i = 0, length = gameRadios.length; i < length; i++) {
    if (gameRadios[i].checked) {
      // do whatever you want with the checked radio
      var game = gameRadios[i].value
      // only one radio can be logically checked, don't check the rest
      break;
    }
  }

  var category = document.getElementById('category');

  const destinyCats = `
  <option value="multiplayer">Multiplayer</option>
  <option value="raid">Raid</option>
  <option value="goofing">Goofing Around</option>
  <option value="social">Social</option>
  <option value="other">Other</option>
  `;

  const elderCats = `
  <option value="killing">Killing</option>
  <option value="looting">Looting</option>
  <option value="pillaging">Pillaging</option>
  <option value="other">Other</option>
  `;

  const otherCats = `
  <option value="casual">Casual</option>
  <option value="fps">FPS</option>
  <option value="rpg">RPG</option>
  <option value="racing">Racing</option>
  `;

  switch(game){
    case "destiny-2":
    category.innerHTML = destinyCats;
    break;
    case "elder-scrolls":
    category.innerHTML = elderCats;
    break;
    case "other":
    category.innerHTML = otherCats;
    break;
  }
}

GetCategories();

// Function called when submit button is pressed
function SubmitEvent() {

  var complete = new Boolean(true);

  //Get the values of each form input and set as variables
  for (var i = 0, length = gameRadios.length; i < length; i++) {
    if (gameRadios[i].checked) {
      // do whatever you want with the checked radio
      var game = gameRadios[i].value
      // only one radio can be logically checked, don't check the rest
      break;
    }
  }

  //Match to a nice name for the game so we can store it
  //Match to a webhookURL so we can use it later
  var gameNice = "";
  var webhookURL = "";
  switch(game){
    case "destiny-2":
      gameNice = "Destiny 2";
      webhookURL = "https://discord.com/api/webhooks/371746863659089922/N0QZnhnYHMlRX8hj8nuqmXjvFXP8GG-3tNntd-vVSlLrN3D2lo0JnmHK4e8gcVYwFBDF";
    break;
    case "elder-scrolls":
      gameNice = "Elder Scrolls";
      webhookURL = "";
    break;
    case "other":
      gameNice = "Other";
      webhookURL = "";
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

  var category = document.getElementById("category").value;

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

  //Handle timezones
  var localOffset = 0;
  switch(timezone)
  {
    case "PST":
    localOffset = 2 * 3600000;
    break;
    case "MST":
    localOffset = 1 * 3600000;
    break;
    case "CST":
    localOffset = 0 * 3600000;
    break;
    case "EST":
    localOffset = -1 * 3600000;
    break;
  }

  var inverseDate = 0 - Date.now();
  var startDateMil = new Date(startDate + ' ' + startTime).getTime();
  startDateMil += localOffset;
  var invStartDateMil = 0-startDateMil;
  var endDateMil = new Date(endDate + ' ' + endTime).getTime();
  endDateMil += localOffset;

  //If the fields are all complete, add to the database
  if(complete == true)
  {
    //Write the data to the database NOTE: push() updates and set() overwrites
    var ref = firebase.database().ref().child(game).push({
      game: game,
      gameNice: gameNice,
      title: title,
      category: category,
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
      endDateMil : endDateMil,
      invStartDateMil : invStartDateMil
    });

    fetch(
      webhookURL,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // contents of the message to be sent
          content:
            'everyone',
          // embeds to be sent
          embeds: [
            {
              image: {
                url: siteURL+ '/img/' + category + '.jpg'
              },
              // decimal number colour of the side of the embed
              color: 14177041,
              // embed description
              description: details,
              fields: [
                  {
                  name: 'Start Time',
                  value: startTime + ' ' + timezone,
                  "inline": true
                  },
                  {
                  name: 'End Time',
                  value: endTime + ' ' + timezone,
                  "inline": true
                  },
                  {
                  name: 'Created by:',
                  value: gamertag,
                  "inline": true
                  },
                  {
                  name: 'Open spots:',
                  value: openSpots,
                  "inline": true
                  },
                  {
                  name: 'backup spots:',
                  value: backupSpots,
                  "inline": true
                  },

                ],
                title: title + ' >> Click to Join',
                url:
                siteURL + '/event-detail.html?e='+ref.key +"&game="+ game,
                // footer
                // - icon next to text at bottom
                footer: {
                  text: 'DPS',
                  icon_url:
                    'https://cdn.discordapp.com/icons/230026270258364417/248837c9a0a596cdffc65facdbb7cfeb.png?size=128',
                },
            },
          ],
        }),
      }
    )

    //Load the modal
    $('#loading').modal({backdrop: 'static', keyboard: false})

    //Wait and then load the event details page
    setTimeout(() => {  document.location.href=siteURL+"/event-detail.html?e="+ref.key +"&game="+game; }, 2000);
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
