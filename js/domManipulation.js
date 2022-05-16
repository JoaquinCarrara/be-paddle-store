const loginScreen = document.querySelector("#loginScreen");
const registerScreen = document.querySelector("#registerScreen");
const swapScreenBtns = document.querySelectorAll(".swap-button");
const logoutBtn = document.querySelector("#logoutBtn")
const dashboardScreen = document.querySelector("#userDashboard");
const cardContainer = document.querySelector("#cardContainer");


let textarea;
let bioContainer;
let bioForm;
let cardButtons;


swapScreenBtns.forEach((btn)=>
    btn.addEventListener("click", ()=>swapScreen())
)

// logoutBtn.addEventListener("click",()=>logout());

function swapScreen(){
    if(onLogin){
        loginScreen.classList.add("hidden");
        registerScreen.classList.remove("hidden")
        onLogin = false;
    }else{
        registerScreen.classList.add("hidden");
        loginScreen.classList.remove("hidden");
        onLogin = true;
    }
}

function showMessage(message, type){
    Toastify({
		text: message,
		duration: 2500,
		gravity: "bottom",
		position: "center",
		stopOnFocus: true, // Prevents dismissing of toast on hover
		className: type,
        style: {
            background: "darkolivegreen",
            borderRadius: "10px"
          }
	}).showToast();
}

function allowAccess(){
    registerScreen.classList.add("hidden");
    loginScreen.classList.add("hidden");
    dashboardScreen.classList.remove("hidden");
    onLogin = false;
	window.location.href="login.html"
}

function restrictAccess(){
    dashboardScreen.classList.add("hidden");
    loginScreen.classList.remove("hidden");
    cardContainer.innerHTML ="";
    onLogin = true;

}

function toggleBioEdit(showEdit) {
	if (showEdit) {
		bioContainer.classList.add("hidden");
		cardButtons.classList.add("hidden");
		bioForm.classList.remove("hidden");
	} else {
		bioForm.classList.add("hidden");
		bioContainer.classList.remove("hidden");
		cardButtons.classList.remove("hidden");
	}
}
