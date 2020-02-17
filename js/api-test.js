var apiKey = "031375cf97e14c8193046ff6912b17e9";
var memId = "";

fetch('https://www.bungie.net/platform/User/SearchUsers?q=bmansayswhat',{
  headers:{
    'X-API-KEY' : apiKey
  }
})
.then((response) => {
  return response.json();
})
.then((myJson) => {
  memId = myJson.Response[0].membershipId;
  //Get the player's linked Destiny profiles
  fetch('https://www.bungie.net/platform/Destiny2/1/Profile/' + memId + '/LinkedProfiles/',{
      headers:{
        'X-API-KEY' : apiKey
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((profile) => {
      memId = profile.Response.profiles[0].membershipId;
      //Get the data from the first of the player's linked Destiny profiles
      fetch('https://www.bungie.net/platform/Destiny2/1/Profile/' + memId +'?components=Characters',{
          headers:{
            'X-API-KEY' : apiKey
          }
        })
        .then((response) => {
          return response.json();
        })
        .then((destinyProfile) => {
          // console.log(destinyProfile.Response.characters.data);
        })
    })
});

/*
//Get the current URL
var url = window.location.href;
//Split the URL
var v = url.split("?");
var d = v[1].split("&");
//Trim off the identifiers and store as variable
var e = d[0].substr(2); //The event key
var game = d[1].substr(5); //The game name
*/

//just for testing purposes
var e = '-M00ibRxHAVhqBgDWo_Q';
var game = 'destiny-2';

GetData();

//Get the data from the database
function GetData(){
  //Clear the html for the event card
  document.getElementById("event").innerHTML = '';
  //Clear the html for the players card
  document.getElementById("players").innerHTML = '';
  //Get the data from the database for the selected radio button
  return database.ref('/' + game + '/' + e).once('value', function(snapshot) {
  //Store the data
  const eventData = snapshot.val();
  //The template we'll use for the event card
  const eventCard = `
    <div class="card">
      <h5 class="card-header bg-dark text-white">${eventData.gameNice}</h5>
      <div class="card-body">
        <h5 class="card-title">${eventData.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${eventData.details}</h6>
        <div class="row mt-4">
          <div class="col-lg"><strong>Start:</strong> ${eventData.startDate} ${eventData.startTime} ${eventData.timezone}</div>
          <div class="col-lg"><strong>End:</strong> ${eventData.endDate} ${eventData.endTime} ${eventData.timezone}</div>
        </div>
      </div>
      <div class="card-footer text-muted">
      Created by: ${eventData.gamertag}
      </div>
    </div>`;

    //Add to the html on the page
    document.getElementById("event").innerHTML += eventCard;
    console.log(eventData);

    //Seperate out the players joined data from the data we already pulled
    const playerData = eventData.joined;
    const backupData = eventData.backups;

    //Initialize a variable to count players
    var playerCount = 0;

    //Add to the html on the page
    for(x in playerData)
    {
      playerCount++;

      const playerLine = `
      <li class="list-group-item">
        ${playerData[x].gamertag} <img src="" id="jimg-${x}"><a class="btn btn-sm btn-outline-dark float-right" data-toggle="collapse" href="#j-${x}" role="button" aria-expanded="false" aria-controls="collapseExample"><i class="fas fa-user-minus"></i></a>
      </li>
      <div class="collapse" id="j-${x}">
        <div class="card-body bg-danger text-white clearfix">
          <span class="align-middle">Remove ${playerData[x].gamertag}?</span><a href="" class="btn btn-sm btn-outline-light float-right" onclick="PlayerDelete('${x}','joined')">Confirm</a>
        </div>
      </div>
      `;

      document.getElementById("players").innerHTML += playerLine;

      //Get the player's destiny profile
      if(game == "destiny-2")
      {
        fetch('https://www.bungie.net/platform/User/SearchUsers?q='+playerData[x].gamertag,{
          headers:{
            'X-API-KEY' : apiKey
          }
        })
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          memId = myJson.Response[0].membershipId;
          //Get the player's linked Destiny profiles
          fetch('https://www.bungie.net/platform/Destiny2/1/Profile/' + memId + '/LinkedProfiles/',{
              headers:{
                'X-API-KEY' : apiKey
              }
            })
            .then((response) => {
              return response.json();
            })
            .then((profile) => {
              memId = profile.Response.profiles[0].membershipId;
              //Get the data from the first of the player's linked Destiny profiles
              fetch('https://www.bungie.net/platform/Destiny2/1/Profile/' + memId +'?components=Characters',{
                  headers:{
                    'X-API-KEY' : apiKey
                  }
                })
                .then((response) => {
                  return response.json();
                })
                .then((destinyProfile) => {
                  var dprofile = destinyProfile.Response.characters.data[0];
                  // console.log(destinyProfile.Response.characters.data);
                  // console.log("firebase id: " + x);
                  console.log(dprofile);
                  document.getElementById("jimg-"+x).src = "http://www.bungie.net/"+dprofile.emblemPath;
                })
            })
        });
      }
    }

    //Initialize a variable to count backups
    var backupCount = 0;

    //Add to the html on the page
    for(x in backupData)
    {
      backupCount++;
      const backupLine = `
      <li class="list-group-item">
        ${backupData[x].gamertag} <a class="btn btn-sm btn-outline-dark float-right" data-toggle="collapse" href="#j-${x}" role="button" aria-expanded="false" aria-controls="collapseExample"><i class="fas fa-user-minus"></i></a>
      </li>
      <div class="collapse" id="j-${x}">
        <div class="card-body bg-danger text-white clearfix">
          <span class="align-middle">Remove ${backupData[x].gamertag}?</span><a href="" class="btn btn-sm btn-outline-light float-right" onclick="PlayerDelete('${x}','backups')">Confirm</a>
        </div>
      </div>
      `;

      document.getElementById("backups").innerHTML += backupLine;
    }

    //Update the player and backup count on the page
    document.getElementById("playerCount").innerHTML = playerCount + '/' + eventData.openSpots;
    document.getElementById("backupCount").innerHTML = backupCount + '/' + eventData.backupSpots;

    console.log("Player count: " + playerCount);
    console.log("Backup count: " + backupCount);

    if(playerCount == eventData.openSpots)
    {
      document.getElementById("joinMain").disabled = true;
      document.getElementById("joinBackup").checked = true;
    }

    if(backupCount == eventData.backupSpots)
    {
      document.getElementById("joinBackup").disabled = true;
      document.getElementById("joinMain").checked = true;
    }

    if(playerCount == eventData.openSpots && backupCount == eventData.backupSpots)
    {
      document.getElementById("joinSubmit").disabled = true;
      document.getElementById("gamertag").disabled = true;
    }

  });
}

function PlayerJoin() {
  var joinTypes = document.getElementsByName('join-radios');
  for (var i = 0, length = joinTypes.length; i < length; i++) {
    if (joinTypes[i].checked) {
      // do whatever you want with the checked radio
      var joinType = joinTypes[i].value
      // only one radio can be logically checked, don't check the rest
      break;
    }
  }
  var gamertag = document.getElementById("gamertag").value;
  if(gamertag != "" && joinType != null)
  {
    if(joinType == "main")
    {
      //Add the gamertag to the joined branch
      var ref = firebase.database().ref('/' + game + '/' + e + '/joined').push({
        gamertag
      });
    }
    else if(joinType == "backup")
    {
      //Add the gamertag to the backups branch
      var ref = firebase.database().ref('/' + game + '/' + e + '/backups').push({
        gamertag
      });
    }
    location.reload();
  }
  else if(gamertag == "") {
    var element = document.getElementById("gamertag");
    //Add the is-invalid class which makes the field red
    element.classList.add("is-invalid");
    //Check if the invalid-feeback class has already been added and if not, add it and the necessary html
    if(element.parentElement.querySelector(".invalid-feedback") == null){
      element.parentElement.innerHTML += '<div class="invalid-feedback">Provide your gamertag</div>';
    }
  }
}

function PlayerDelete(id, joinType)
{
  var ref = firebase.database().ref('/' + game + '/' + e + '/'+ joinType +'/' + id).remove();
  // document.getElementById("player-join").action = "https://bmansayswhat.github.io/game-scheduler/event-detail.html?e="+e +"&game="+game;
  location.reload();
}

function EventDelete()
{
  var ref = firebase.database().ref('/' + game + '/' + e).remove();
  document.location.href="https://bmansayswhat.github.io/game-scheduler/index.html";
}

$('#deleteEvent').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})
