$('#start-date').pickadate();
$('#end-date').pickadate();
$('#start-time').pickatime();
$('#end-time').pickatime();

//Firebase configuration
// Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: "AIzaSyBmgtwduBCHIg8RNXB2Wv978QPZQCVan4I",
    authDomain: "dungeon-protocols.firebaseapp.com",
    databaseURL: "https://dungeon-protocols.firebaseio.com",
    projectId: "dungeon-protocols",
    storageBucket: "dungeon-protocols.appspot.com",
    messagingSenderId: "701545727450",
    appId: "1:701545727450:web:269a08f0258a5e74e9ece3"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function GetData(){
  return database.ref('/events').once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var eventData = childSnapshot.val();
    document.getElementById("past-events").innerHTML += '<div class="col"><div class="card"><h5 class="card-header">'+ eventData.title +'</h5><div class="card-body"><p class="card-text" id="event1">'+eventData.details+'</p></div><ul class="list-group list-group-flush"><li class="list-group-item">Players: '+eventData.signups.signups+'/'+eventData.spot+'</li><li class="list-group-item">Start time: '+eventData.starttime+' '+eventData.timezone+'</li><li class="list-group-item">End time : '+eventData.endtime+' '+eventData.timezone+'</li></ul></div></div>';
    console.log(eventData);
  });
});
}
GetData();

function ParseData(){

}

document.getElementById("event1").innerHTML = "New text!";
