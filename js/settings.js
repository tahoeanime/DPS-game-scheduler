//Settings
var siteURL = "https://bmansayswhat.github.io/game-scheduler";
var availGamesNice = ['Destiny 2','Elder Scrolls','Other'];
var availGamesID = ['destiny-2','elder-scrolls','other'];

//Template functions
function SetGameSelect()
{
  var gameChoice = document.getElementById('game-choice');
  for(i=0; i<availGamesNice.length; i++)
  {
    const gameSelect = `
    <label class="btn btn-info">
      <input type="radio" name="game-radios" id="option1" value="${availGamesID[i]}" id="${availGamesID[i]}" onclick="GetGame()"> ${availGamesNice[i]}
    </label>
    `;
    gameChoice.innerHTML += gameSelect;
  }
  var gameRadios = document.getElementsByName('game-radios');
  gameRadios[0].checked = true;
  gameRadios[0].parentElement.classList.add("active");
}

function SetNav()
{
  const nav = `
  <a class="nav-item nav-link" name="nav-items" href="${siteURL}/">Upcoming Events <span class="sr-only">(current)</span></a>
  <a class="nav-item nav-link" name="nav-items" href="${siteURL}/new-event.html"><i class="fas fa-plus-circle"></i> New Event</a>
  <a class="nav-item nav-link" name="nav-items" href="https://dungeonprotocols.godaddysites.com"><i class="fas fa-external-link-alt"></i> DPS Webite</a>
  <a class="nav-item nav-link" name="nav-items" href="${siteURL}/past-events.html">Past Events</a>
  `;
  document.getElementById('siteNav').innerHTML = nav;

  var navLinks = document.getElementsByName('nav-items');
  var url = window.location.href;
  for(i=0; i<navLinks.length; i++)
  {
    if(navLinks[i].href == url)
    {
      navLinks[i].classList.add("active");
    }
  }
}

function SetFooter()
{
  const foot = `
  <span>Dungeon Protocols</span>
  `;
  document.getElementById('footer').innerHTML = foot;
}

SetNav();
SetFooter();
