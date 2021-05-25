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
  <option value="crucible">Crucible</option>
  <option value="gambit">Gambit</option>
  <option value="strikes">Strikes</option>
  <option value="raid">Raid</option>
  <option value="other">Other</option>
  `;

  const elderCats = `
  <option value="dailyquests">Daily Quests</option>
  <option value="publicdelves">Public Delves</option>
  <option value="publicdungeons">Public Dungeons</option>
  <option value="undauntedpledges">Undaunted Pledges</option>
  <option value="esotrials">Trials</option>
  <option value="esopvp">PVP</option>
  <option value="esoother">Other</option>
  `;

  const otherCats = `
  <option value="comingsoon">Casual</option>
  <option value="comingsoon">FPS</option>
  <option value="comingsoon">RPG</option>
  <option value="comingsoon">Racing</option>
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
  var discordannouncement = "";
  switch(game){
    case "destiny-2":
      gameNice = "Destiny 2";
      webhookURL = "https://discord.com/api/webhooks/371746863659089922/N0QZnhnYHMlRX8hj8nuqmXjvFXP8GG-3tNntd-vVSlLrN3D2lo0JnmHK4e8gcVYwFBDF";
      discordannouncement = "@Destiny 2 💠";
    break;
    case "elder-scrolls":
      gameNice = "Elder Scrolls";
      webhookURL = "https://discord.com/api/webhooks/371757360042999808/1cFKGLglAaP8y7ciqxyTTPu_yIhylE2fqDFxXFM9f-UBhNbvmFfeWn7XetO8zKHrjqu2";
      discordannouncement = "Elder Scolls Online ⚔";
    break;
    case "other":
      gameNice = "Other";
      webhookURL = "https://discord.com/api/webhooks/397773450464198666/EOkVJekPonqSPTWlkET1bXE34aOPFn44KhAoJg-cA9RoXIoEgha0ybpYFL8xc3hfWqlW";
      discordannouncement = "@here";
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
  var d = new Date();
  var localOffset = d.getTimezoneOffset(); //get the local offset in minutes
  // switch(timezone)
  // {
  //   case "PST":
  //   localOffset = 2 * 3600000;
  //   break;
  //   case "MST":
  //   localOffset = 1 * 3600000;
  //   break;
  //   case "CST":
  //   localOffset = 0 * 3600000;
  //   break;
  //   case "EST":
  //   localOffset = -1 * 3600000;
  //   break;
  // }

  var inverseDate = 0 - Date.now();
  var sd = new Date(startDate + ' ' + startTime);
  var startDateMil = sd.getTime();
  var regExp = /\(([^)]+)\)/; //Regular expression to get the text between ()
  var sdString = regExp.exec(sd); //execute the regular expression to get the timezone
  var tz = sdString[1].split(" ");
  timezone = tz[0];
  var invStartDateMil = 0-startDateMil;
  var endDateMil = new Date(endDate + ' ' + endTime).getTime();

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
            discordannouncement,
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
                  name: '**Start Time:**',
                  value: startDate + ' ' + startTime + ' ' + timezone,
                  "inline": true
                  },
                  {
                  name: '**End Time:**',
                  value: endDate + ' ' + endTime + ' ' + timezone,
                  "inline": true
                  },
                  {
                  name: '**Created by:**',
                  value: gamertag,
                  "inline": true
                  },
                  {
                  name: '**Open spots:**',
                  value: openSpots,
                  "inline": true
                  },
                  {
                  name: '**Backup spots:**',
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
                    'https://cdn.discordapp.com/icons/230026270258364417/f3cf9bdd5f3b5b4bf2e658043e9b8fb2.png?size=128',
                },
            },
          ],
        }),
      }
    )

    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch((error) => {
    //   console.error('Error:', error);
    //   })
    // .then(document.location.href="https://tahoeanime.github.io/DPS-game-scheduler/event-detail.html?e="+ref.key +"&game="+game);


    //Load the modal
    $('#loading').modal({backdrop: 'static', keyboard: false})

    //Wait and then load the event details page

    setTimeout(() => {  document.location.href=siteURL+"/event-detail.html?e="+ref.key +"&game="+game; }, 2000);

    setTimeout(() => {  document.location.href="https://tahoeanime.github.io/DPS-game-scheduler/event-detail.html?e="+ref.key +"&game="+game; }, 2000);
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
