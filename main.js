// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLy3u7BxPWMpAxJqPawtCCcf5Oxx5w_h4",
  authDomain: "todo-b2fc0.firebaseapp.com",
  projectId: "todo-b2fc0",
  storageBucket: "todo-b2fc0.appspot.com",
  messagingSenderId: "1034880743632",
  appId: "1:1034880743632:web:4d8b33d74274b19b1346d5",
  measurementId: "G-VGGGMTGSCH"
};

// Initialize Firebase
  firebase.initializeApp(firebaseConfig);
	  firebase.analytics();

if (window.localStorage.getItem('id') == undefined) {
	window.localStorage.setItem('id', 0);
}

function compo(Desc, Chore, id){
	if (Desc == "" || Chore == ""){
		window.alert("Please enter some data for the todo");
	}
	else{
		let div = document.createElement("div");
		div.id = id;
		let head = document.createElement("h1");
		head.innerHTML = Chore;
		let hr = document.createElement("hr");
		let para = document.createElement("p");
		para.innerHTML = Desc;
		var btn = document.createElement("button");
		btn.innerHTML = "Completed!";

		div.append(head, hr, para, btn);
		btn.onclick = function() {
			document.getElementById(id).style.display = "none";
			window.localStorage.removeItem("task" + id);
			window.localStorage.removeItem("desc" + id);
		}
		document.getElementById("components").appendChild(div);
	}
}
function sendStuff(){
	var db = firebase.database();
	let chore = document.getElementById("chore").value;
	let desc = document.getElementById("desc" ).value;

	if (desc == "" || chore == ""){
		window.alert("Please enter some data for the todo");
	}
	else{
		var id = window.localStorage.getItem('id');
		console.log(id);
		db.ref("component " + id).set({
			chore : chore,
			desc : desc
		})
		
		db.ref("id/").set({
			id: parseInt(id) + 1
		})
		window.localStorage.setItem('id',parseInt(id) + 1);
		sendToLocal(chore, desc, id);
		compo(desc,chore,id);
	}
}
function sendToLocal(chore, desc, id) {
	
	window.localStorage.setItem("task" + id, chore);
	window.localStorage.setItem("desc" + id, desc);
}	
function loadwala(){
	for(i=0; i<100; i++){
		if(window.localStorage.getItem("desc" + i) == undefined){
			continue;
		}
			var Desc = window.localStorage.getItem("desc" + i);
			var Chore = window.localStorage.getItem("task" + i);
			compo(Desc, Chore, i);
		}
}