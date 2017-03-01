function sendData(data) {
  var xhr = new XMLHttpRequest(),
      tr = document.getElementsByTagName("tr"),
      realData;

  data.id = parseInt(tr[tr.length - 1].id) + 1 || 0;
  realData = JSON.stringify(data);
  console.log(typeof realData);
  xhr.open("POST", "/upload", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = receiveData("./data/example.json");
  xhr.send(realData);

  receiveData("./data/example.json");
}

function receiveData(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var datachunk = JSON.parse(xhr.response),
          record = document.getElementById('record'),
          text = "";

      console.log(xhr.response);

      datachunk.forEach((data) => {
        var {id, name, start, end, taken} = data;
        if (! document.getElementById(id)) {
          let tr = document.createElement("tr");
          tr.id = id;

          for (i of [name, start, end, taken]) {
            var td = document.createElement("td");
            td.append(i);
            tr.appendChild(td);
          }
          record.appendChild(tr);
        }
      })
    }
  }

  xhr.send();
}
