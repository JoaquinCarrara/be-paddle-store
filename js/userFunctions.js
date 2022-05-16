function updateBio(event) {
	event.preventDefault();
	const newBio = event.target[0].value;

	if (!newBio) return showMessage("La bio no puede estar vacía", "error");


	const updatedUser = searchUserByID(currentUser.id);

	updatedUser.bio = newBio;
	updateLocalStorage();


	currentUser = updatedUser;


	bioContainer.innerText = currentUser.bio;

	toggleBioEdit(false);

	showMessage("La bio se actualizó correctamente", "success");
}

function searchUserByID(id) {
	return userList.find((user) => user.id === id);
}

function searchUserByEmail(email) {
	return userList.find((user) => user.email === email);
}

function deleteUser() {
	const index = userList.findIndex((user) => user?.id === currentUser?.id);

	if (index === -1) return showMessage("El usuario no existe", "error");

	userList.splice(index, 1);
	updateLocalStorage();
	logout();
}
