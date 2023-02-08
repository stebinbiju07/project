function register(uname, email, upass, umob) {
  if (localStorage.getItem(uname) === null) {
    var a = { username: uname, email: email, phone: umob, password: upass };
    localStorage.setItem(uname, JSON.stringify(a));
    document.getElementById("regform").reset();
    alert(uname + " is registered succesfully");
  } else {
    alert("Your already registered, please login");
    document.getElementById("regform").reset();
  }
}

function login(uname, upass) {
  if (localStorage.getItem(uname) === null) {
    alert("You are not registered, please register");
    document.getElementById("logform").reset();
  } else {
    var data = JSON.parse(localStorage.getItem(uname));
    if (data.password == upass) {
      document.getElementById("logform").reset();
      sessionStorage.setItem("name", data.username);
      sessionStorage.setItem("phone", data.phone);
      sessionStorage.setItem("email", data.email);
      window.location.href = "./home.html";
    } else {
      document.getElementById("logform").reset();
      alert("You entered wrong password");
    }
  }
}

function logout() {
  if (sessionStorage.getItem("name") === null) {
    alert("You are already logged out");
  } else {
    sessionStorage.clear();
    window.location.href = "./index.html";
  }
}

var apiData = (function () {
  var executed = false;
  return function () {
    if (!executed) {
      executed = true;
      const xhr = new XMLHttpRequest(),
        method = "GET",
        url = "https://jsonplaceholder.typicode.com/users";
      xhr.open(method, url, true);
      xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
          var status = xhr.status;
          if (status === 0 || (status >= 200 && status < 400)) {
            var res = xhr.responseText;
            var jd = JSON.parse(res);
            for (var i = 0; i < res.length; i++) {
              var data = "<tr>"
                + "<td data-label='ID'>" + jd[i].id + "</td>"
                + "<td data-label='NAME'>" + jd[i].name + "</td>"
                + "<td data-label='USERNAME'>" + jd[i].username + "</td>"
                + "<td data-label='E-MAIL'>" + jd[i].email + "</td>"
                + "<td data-label='PHONE'>" + jd[i].phone + "</td>"
                + "<td data-label='WEBSITE'>" + jd[i].website + "</td>"
                + "<td data-label='STREET'>" + jd[i].address.street + "</td>"
                + "<td data-label='SUITE'>" + jd[i].address.suite + "</td>"
                + "<td data-label='CITY'>" + jd[i].address.city + "</td>"
                + "<td data-label='ZIPCODE'>" + jd[i].address.zipcode + "</td>"
                + "<td data-label='LATITUDE'>" + jd[i].address.geo.lat + "</td>"
                + "<td data-label='LONGITUDE'>" + jd[i].address.geo.lng + "</td>"
                + "<td data-label='NAME'>" + jd[i].company.name + "</td>"
                + "<td data-label='PHRASE'>" + jd[i].company.catchPhrase + "</td>"
                + "<td data-label='SERVICE'>" + jd[i].company.bs + "</td>"
                + "</tr>";
              document.getElementById("tdata").innerHTML += data;
            }
          }
          else {
            console.error();
          }
        }
      };
      xhr.send();
    }
  };
})();

function showPro() {
  document.getElementById("profile").style.display = "block";
  document.getElementById("home").style.display = "none";
  var ret = "<div class='card'><h3>My Profile Details</h3><br><p>Name: " + sessionStorage.getItem("name") + "</p><br><p>Phone: " + sessionStorage.getItem("phone") + "</p><br><p>E-mail: " + sessionStorage.getItem("email") + "</p></div>";
  document.getElementById("profile").innerHTML += ret;
  document.getElementById("active").innerText = "Active: Profile";
  onbodyload();
}
function showHome() {
  document.getElementById("profile").style.display = "none";
  document.getElementById("home").style.display = "block";
  document.getElementById("active").innerText = "Active: Home";
}

function onbodyload() {
  if (sessionStorage.getItem("name") != null) {
    var name = sessionStorage.getItem("name");
    var phone = sessionStorage.getItem("phone");
    var mail = sessionStorage.getItem("mail");
  } else {
    window.location.href = "./index.html";
  }
}