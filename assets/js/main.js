  // arrow functions not supported in ie11.
  // forEach not supported in ie11 on querySelectorAll.
  // let partially supported in ie11. using var.
  // template strings not supported in ie11.

  var holes = document.querySelectorAll(".hole");
  var ScoreDisplay = document.getElementById("ScoreDisplay");
  var TimeDisplay = document.getElementById("TimeDisplay");
  var StartButton = document.getElementById("StartButton");
  var StopButton = document.getElementById("StopButton");
  var ResetButton = document.getElementById("ResetButton");
  var score = 0;
  var time = 60;
  var minTime = 0;
  var timer;
  var popups1;
  var popups2;

  StartButton.addEventListener("click", function(e) { e.preventDefault() ;startGame(); });
  StopButton.addEventListener("click", function(e) { e.preventDefault(); stopGame(); });
  ResetButton.addEventListener("click", function(e) { e.preventDefault(); resetGame(); });

  for (i = 0; i < holes.length; ++i) {
    holes[i].addEventListener("click", function(e) {
      e.preventDefault();
      // if the hole is active with either class and time has not run out.
      if((this.classList.contains("active1") || this.classList.contains("active2")) && time > minTime) {
        var whichPopup = this.classList.contains("active1") ? "1" : "2"; // if it has either class from the conditional it will always be 2 if not 1
        this.classList.remove("active1", "active2"); // prevents multiple scores on click
        score += 1; // adding to score
        ScoreDisplay.innerHTML = score; // setting score display
        setPopupsDuration(whichPopup);
      }
    })
  }

  function keepTime() {
    if(hasTime()) {
      time -= 1; // add one second
      var timeFormat = time < 10 ? ':0' + time : ':' + time; // format the time for the display clock
      TimeDisplay.innerHTML = timeFormat; // display formatted time
    } else {
      stopGame(); // stop all if time is up
    }
  }

  function hasTime() {
    return time > minTime; // if there's time left on the clock... true/false
  }

  function changePopups(which) {
    var opposite = which === "1" ? "2" : "1"; // assign the opposite of which

    if(hasTime()) {
      var newPopup = Math.floor(Math.random() * Math.floor(9)); // random 1-9
      clearPopups(which);

      // if the hole doesn't have the class from the other group
      if(!holes[newPopup].classList.contains('active' + opposite)){
        holes[newPopup].classList.add('active' + which);
      }
    }
  }

  function setPopupsDuration(which) {
    if(which === "1") {
      window.clearInterval(popups1);
      popups1 = null; // setting to null to ensure a reset
      popups1 = window.setInterval(function() { changePopups(which) }, getRandomDuration());
    } else {
      window.clearInterval(popups2)
      popups2 = null; // setting to null to ensure a reset
      popups2 = window.setInterval(function() { changePopups(which) }, getRandomDuration());
    }
  }

  function clearPopups(which) {
    for (i = 0; i < holes.length; ++i) {
      if(!which) {
        holes[i].classList.remove("active1", "active2");
      } else if(holes[i].classList.contains('active' + which)) {
        holes[i].classList.remove('active' + which);
      }
    }
  }

  function startGame() {
    timer = window.setInterval(keepTime, 1000);
    popups1 = window.setInterval(function() { changePopups("1") }, getRandomDuration());
    popups2 = window.setInterval(function() { changePopups("2") }, getRandomDuration());
  }

  function stopGame() {
    clearPopups();
    clearIntervals();
  }

  function resetGame() {
    clearPopups();
    clearIntervals();
    TimeDisplay.innerHTML = ":60";
    ScoreDisplay.innerHTML = "0";
    time = 60;
    score = 0;
  }

  function clearIntervals() {
    window.clearInterval(timer);
    window.clearInterval(popups1);
    window.clearInterval(popups2);
  }

  function getRandomDuration() {
    var min = Math.ceil(500);
    var max = Math.floor(1000);
    return Math.floor(Math.random() * (max - min + 1)) + min; // inclusive of min and max values
  }
