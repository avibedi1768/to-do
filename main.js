var db = firebase.database();

if (window.localStorage.getItem('id') == undefined) {
	window.localStorage.setItem('id', 1);
}
function sendStuff(){
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
		
		db.ref("id").set({
			id: parseInt(id) + 1
		})
		sendToLocal(chore, desc, id);
		window.localStorage.setItem('id',parseInt(id) + 1);
		document.getElementById("chore").value = "";
		document.getElementById("desc").value = "";
	}
}
function sendToLocal(chore, desc, id) {
	window.localStorage.setItem("task" + id, chore);
	window.localStorage.setItem("desc" + id, desc);
	var Desc = window.localStorage.getItem("desc" + id);
	var Chore = window.localStorage.getItem("task" + id);
	compo(Desc, Chore, id);
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