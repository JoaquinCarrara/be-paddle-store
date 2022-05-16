if (currentUser) allowAccess();

function login(event){

    event.preventDefault(); 
    const email = event.target[0].value;
    const pass = event.target[1].value;

    const userFound = searchUserByEmail(email)
    
    if(userFound?.password === pass){
        currentUser = userFound;
        updateSessionStorage(currentUser);
        allowAccess()
        showMessage("ingreso exitoso", "success");
        window.location.href="index.html"
        
    }else{
        event.target.reset();
        showMessage("Hubo un error", "error")
    }
}



function logout(){
    showMessage("Gracias por usar nuestro servicio", "success");
    currentUser="";
    restrictAccess()
}

function register(event){
    event.preventDefault();
    console.log(event);
    const nombre = event.target[0].value;
    const apellido = event.target[1].value;
    const edad = calcularEdad(event.target[2].value);
    const email = event.target[3].value;
    const pass = event.target[4].value;
    const id = generateId()

    if(edad < 16){
        event.target.reset()

        return showMessage("Ingreso permitido para mayores de 16 años", "error")
    }

    if(!nombre || !edad || !email || !pass || !id || searchUserByID(id)){
        event.target.reset();
        return showMessage("Hubo un error, intente nuevamente", "error")
    }

    if(searchUserByEmail(email)){
        event.target[3].value = "";
        event.target[3].focus();
        return showMessage("El correo electrónico ya esta siendo utilizado", "error")
    }

    const newUser = new User(nombre, apellido, edad, email, pass, id);
    userList.push(newUser);
    updateLocalStorage();
    currentUser = newUser;
    allowAccess();
    showMessage("Registro exitoso", "success")
}

function generateId(){
	return "xxxxxx".replace(/[xy]/g, (c) => {
		let r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

function calcularEdad(fecha){
    let fechaActual = new Date();
    let fechaNacimiento = new Date(fecha);

    return fechaActual.getFullYear() - fechaNacimiento.getFullYear();
}

function updateLocalStorage(){
    localStorage.setItem("userList", JSON.stringify(userList))
}

function updateSessionStorage(user){
    sessionStorage.setItem("currentUser", JSON.stringify(user))
}