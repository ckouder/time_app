const div = document.getElementById("timing"),
      startButton = document.getElementById('start'),
      endButton = document.getElementById('stop');

var time, flag, database = {};

var start = function() {
  var taskName = prompt("Please enter the task name: ");

  time = new Date();

  database["start"] = time;
  database["name"] = taskName;

  flag = true;
  refreshment(flag);
  endButton.style.visibility = "visible";
  startButton.style.visibility = "hidden";
}

function stop() {
  var msProcess = (time - database["start"]) / 1000,
      hLength = mLength = sLength = "",
      lastFor;

  if (msProcess > 3600) {
    hLength = Math.floor(msProcess / 3600);
    hLength += (hLength > 1)? " hours": " hour";
    msProcess -= hLength * 3600;
  }
  if (msProcess > 60) {
    mLength = Math.floor(msProcess / 60);
    mLength += (mLength > 1)? " minutes": " minute";
    msProcess -= mLength * 60;
  }
  sLength = Math.floor(msProcess);
  sLength += (sLength > 1)? " seconds": " second";

  lastFor = hLength + mLength + sLength;
  flag = false;

  database["end"] = time;
  database["taken"] = lastFor;

  div.innerHTML = `Task ${database.name} stopped at ${database.end}. It lasts for ${database.taken}`;
  startButton.style.visibility = "visible";
  endButton.style.visibility = "hidden";

  sendData(database);
}

function refreshment(boolean) {
  //console.log(boolean);
  if (boolean) {
    time = new Date();
    div.innerHTML = time;

    var k = setTimeout(() => {
      refreshment(flag);
    }, 1000)
  } else {
    clearTimeout(k);
  }
}

startButton.addEventListener('click', start);
endButton.addEventListener('click', stop);
receiveData("./data/example.json");
