// javascript
// Challenge: Import 'initializeApp' from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// Challenge: Import 'getDatabase' from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// import {initializeApp} from "htttps://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// import {getDatabase} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const AppSettings = {
        databaseURL : "https://realtime-database-8e0f4-default-rtdb.firebaseio.com/"
}
const app = initializeApp(AppSettings)
const database = getDatabase(app)
const endorsementListInDb = ref(database, "endorsementList")
const endorsementEl = document.getElementById('endorsement-card');
const publishBtn = document.getElementById('publish-btn')
const endorsementtextEl = document.getElementById('endorsement-text').value

function myFunction() {
  var x = document.getElementById("endorsement-text").value;
  if (!x) {
    console.log("You need to input a value in the box");
  } else {
    document.getElementById("endorsement-card").innerHTML += `<ul><li>${x}</li></ul>`;
    document.getElementById("endorsement-text").value = ""; 
  }
}
publishBtn.addEventListener('click',myFunction)