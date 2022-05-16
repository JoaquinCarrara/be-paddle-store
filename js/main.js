let carrito = [];
const tbody = document.querySelector('.tbody')

function init(){
mostrarProductos()
añadirAlCarrito()
getLocalStorage()
mostrarLogin()

}



function mostrarProductos(){
    const nodoContenedorCards = document.querySelector(".cardContainer")
    let articulo="";
    productos.forEach((element)=>{
        articulo+=`<div class="col d-flex justify-content-center mb-4">
        <div class="estiloCard  card shadow mb-1 rounded bg-dark" style="width: 19rem;">
            <h5 class="card-title pt-2 text-center text-light ">${element.nombre}</h5>
            <img src="${element.img}" class="card-img-top imgCard" alt="...">
            <div class="card-body">
                <p class="card-text text-white-50 description">${element.descripcion}</p>
                <h5 class="text-light ">$ <span class="precio">${element.precio}</span></h5>
                <div class="d-grid gap-2">
                    <button class="btn btn-primary button">Añadir a carrito</button>
                </div>
            </div>
        </div>
    </div>`
                nodoContenedorCards.innerHTML=articulo;
    })
}

// function botonComprar(){
//     const btnComprar = document.querySelector('.btnComprar')
//     modalComprar = '';
//     btnComprar.addEventListener("click", ()=>{
//         modalComprar = ``
//     })
// }

function añadirAlCarrito(){
    const clickBtn = document.querySelectorAll('.button')

    clickBtn.forEach((btn)=>{
    btn.addEventListener('click', addToCarritoItem)
        })
}

function addToCarritoItem(e){
    const button = e.target;
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.imgCard').src;



    const newItem= {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }

    addItemCarrito(newItem)

}

function addItemCarrito(newItem){

    cartelAgregarAlCarrito()

    const inputElemento = tbody.getElementsByClassName('inputElemento');
    for(let i = 0; i<carrito.length; i++){
        if(carrito[i].title.trim() === newItem.title.trim())
        {
            carrito[i].cantidad ++;
            const inputValue = inputElemento[i];
            inputValue.value++;
            carritoTotal()
            return null;
        }
    }

    carrito.push(newItem)
    renderCarrito()
}



function renderCarrito(){
    tbody.innerHTML = '';
    
    carrito.map((item) =>{
        
        const tr = document.createElement('tr')
        tr.classList.add('itemCarrito');
        const content = `<th scope="row">1</th>
        <td class="table__productos">
        <img src=${item.img}  alt="">
            <h6 class="title">${item.title}</h6>
        </td>
        <td class="table__precio">
            <p>$ ${item.precio}</p>
        </td>
        <td class="table__cantidad">
            <input type="number" class="inputElemento" min="1" value=${item.cantidad}>
            <button class="delete btn btn-danger">X</button>
        </td>`

        tr.innerHTML= content;
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener('click', removeItemCart)
        tr.querySelector(".inputElemento").addEventListener('change', sumaCantidadPrecio)
    })
    carritoTotal()

}



function carritoTotal(){
    let total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item)=>{
        const precio = Number(item.precio.replace("$", ''))
        total = total + precio*item.cantidad
    })

    itemCartTotal.innerHTML= `Total $${total}`
    addLocalStorage()
}

function removeItemCart(e){
    const botonEliminar = e.target;
    const tr = botonEliminar.closest(".itemCarrito");
    const title = tr.querySelector('.title').textContent;
    for(let i =0; i<carrito.length; i++){
        if(carrito[i].title.trim()===title.trim()){
            carrito.splice(i,1)
        }
    }
    tr.remove()
    carritoTotal()
}

function sumaCantidadPrecio(e){
    const sumaInput = e.target
    const tr = sumaInput.closest(".itemCarrito");
    const title = tr.querySelector('.title').textContent;
    carrito.forEach((item)=>{
        if(item.title.trim()===title){
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            carritoTotal()
        }
    })
    console.log(carrito);
}

function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


function getLocalStorage(){
    const storage = JSON.parse(localStorage.getItem('carrito'))
    if(storage){
        carrito = storage;
        renderCarrito()
    }
}

function cartelAgregarAlCarrito(){
    Toastify({
        text: "Articulo agregado al carrito",
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
            background: "darkolivegreen",
            borderRadius: "10px"
          }
    }).showToast();
}

// function showMesasage()

/* ---------------------------------- FIN CART ------------------------------------ */

/* --------------------------------- LOGIN ---------------------------------------- */

const userList = JSON.parse(localStorage.getItem("userList")) || [];

let currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || null;

let onLogin = true

// const logoutBtn = document.querySelector("#logoutBtn")

function mostrarLogin(){
    let user = JSON.parse(sessionStorage.getItem("currentUser"))
    
    if(user){
            const nombreHeader = document.querySelector(".containerHeader");
            nombreHeader.innerHTML=`            <div class="d-flex justify-content-between">
                                                    <div class="d-flex">
                                                        <a href="./index.html"><img class="img-fluid imgHead" src="./img/bepaddlehead.png" alt=""></a>
                                                    </div>
                                                    <div class=""></div>
                                                    <div class="d-flex align-items-center flex-column justify-content-center" style="margin-right:15px">
                                                        <div class="usuarioHeader">
                                                        <span class="text-uppercase" style="font-weight:bold">${user.nombre} ${user.apellido}</span>
                                                        </div>
                                                        <button id="logoutBtn" onclick="logout()" class="button btn btn-danger">
                                                            <strong>Cerrar Sesión</strong>
                                                        </button>
                                                    </div>
                                                </div>`;

    }
   }


   function logout(){
      sessionStorage.removeItem("currentUser")
       window.location.href="index.html"
       console.log("cerrar sesion");
       
   }
/* ------------------------------------------- FIN LOGIN ----------------------------------------------*/


/* ------------------------------------------- BARRA DE BUSQUEDA ---------------------------------------*/
const formulario = document.querySelector("#formulario");
const btnBuscar = document.querySelector("#btnBuscar");
const resultadoBusqueda = document.querySelector("#resultado")



const filtrar = () =>{
    // console.log(formulario.value);
    resultadoBusqueda.innerHTML='';
    const textoIngresado = formulario.value.toLowerCase();

    for(let producto of productos){
        let nombre = producto.nombre.toLocaleLowerCase();
        if(nombre.indexOf(textoIngresado) !==-1){
            resultadoBusqueda.innerHTML +=`<div class="col d-flex justify-content-center mb-4">
            <div class="estiloCard card shadow mb-1 rounded bg-dark" style="width: 19rem;">
                <h5 class="card-title pt-2 text-center text-light ">${producto.nombre}</h5>
                <img src="${producto.img}" class="card-img-top imgCard" alt="...">
                <div class="card-body">
                    <p class="card-text text-white-50 description">${producto.descripcion}</p>
                    <h5 class="text-light">$ <span class="precio">${producto.precio}</span></h5>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary button">Añadir a carrito</button>
                    </div>
                </div>
            </div>
        </div>`
        }
    }
    if(resultadoBusqueda.innerHTML===''){
        resultadoBusqueda.innerHTML +=`<h3>Producto no encontrado</h3>`
    }

    

}

   btnBuscar.addEventListener('click', filtrar)
    formulario.addEventListener('keyup', filtrar)
    // filtrar()


    