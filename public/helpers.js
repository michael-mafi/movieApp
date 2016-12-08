function byId(id) {
  return document.getElementById(id);
}

function ajax(url, type, data, callback) {
  console.log('ajax call poppin off');
  var type = type || 'GET';
  var data = data || null;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
      console.log('ajax call success');
      if(xmlhttp.status == 200) {
        callback( JSON.parse(xmlhttp.responseText) );
      }
      else {
        alert('uh...ermkay');
      }
    }
  }
  xmlhttp.open(type, url, true);
  if(type ==="POST") {
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  }
  xmlhttp.send(data);
}