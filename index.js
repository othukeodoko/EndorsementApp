import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue, set, push, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const AppSettings = {
  databaseURL: "https://realtime-database-8e0f4-default-rtdb.firebaseio.com/"
}

const app = initializeApp(AppSettings)
const database = getDatabase(app)
const endorsementListInDb = ref(database, "endorsementList")

const endorsementEl = document.getElementById('endorsement-card');
let endorsementInputValue = document.getElementById('endorsement-text').value
const publishBtn = document.getElementById('publish-btn')

onValue(endorsementListInDb, (snapshot) => {
 
 if(!snapshot.exists()){
   endorsementEl.textContent = "There are no records here"
 }else{
   const endorsementArray = Object.entries(snapshot.val())
  
  document.getElementById('endorsement-card').innerHTML = ""
  for (let i = 0; i < endorsementArray.length; i++) {
    
    const currentItem = endorsementArray[i];
    const currentItemId = currentItem[0]
    const currentItemValue = currentItem[1]
    renderItems(currentItem)
  }
 }
  
}, (error) => {
  console.error(error)
})

function pushToFirebase() {
  const endorsement = document.getElementById("endorsement-text").value;
  if (!endorsement) {
    alert("You need to input a value in the box");
  } else {
    set(push(endorsementListInDb), endorsement)
      .then(() => {
        alert("data pushed successfully")
        resetInput()
      })
      .catch((error) => {
        
      });
  }
}

function renderItems(item){
   
   let itemId = item[0]
   let itemValue = item[1]
   let newEl = document.createElement("li");
   
   newEl.textContent = itemValue 
   newEl.className = "endorsement-list" // Add a class to the element

   endorsementEl.append(newEl)
   newEl.addEventListener("click", function(){
    
        let exactLocationOfItemInDB = ref(database, `endorsementList/${itemId}`)
        
        remove(exactLocationOfItemInDB)
  })
   
}
function resetInput(){
   document.getElementById("endorsement-text").value = "";
}

publishBtn.addEventListener('click', pushToFirebase)