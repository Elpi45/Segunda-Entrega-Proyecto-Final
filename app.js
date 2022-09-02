//crear el constructor que nos sirve como referencia para nuestro objeto prod
// Si vamos a ingresar muchos productos creamos un constructor

class Moneda {
    constructor (nombre, precio){
        this.nombre = nombre.toUpperCase()
        this.precio = Number(precio)
     }

     sumaImp() {this.precio *= 1.70} 
  }

//Este trabajo hay que hacerlo si o si, por mas que sean 5000 productos
// Esta lista la voy a crear en JSON para no tenerla aca y que me pese

const divi1 = new Moneda("Dolar", 136)
const divi2 = new Moneda("Euro", 137)
const divi3 = new Moneda("Libra", 164)
const divi4 = new Moneda("Real",27)




//Metemos, mandamos, todos los productos adentro de un array

const listaDivisas = [];

//

listaDivisas.push(divi1,divi2,divi3,divi4) //aca sirve asi separados por coma porque son solo 5 productos, pero si los productos los tomamos desde un formulario, porque hay 25mil productos y estamos metiendo productos todo el timepo, ahi entra en juego JSON

console.log(listaDivisas)


//DEFINO EL DOM

//Lo primero que hacemos es traernos los id

let formulario = document.getElementById('formulario')
let inputDivi = document.getElementById('idivisa')

let mostrarDiviSolas = document.getElementById('mostrarDiviSolas') //nos traemos los div vacios para mostrarlos
let mostrarTodasDivi = document.getElementById('mostrarTodasDivi')
let btnMostrarDivi = document.getElementById('btnMostrar')
let bandera = false


//CAPTURO LOS HIJOS DEL FORM

let idivisa = formulario.children[1].value; // con value vemos el valor que le entra
let iprecio = formulario.children[3].value;


//DEFINIR LOS EVENTOS

// en evento tenemos los botones "enviar divisas a la lista"



formulario.addEventListener('submit', agregarDivi)  


btnMostrarDivi.addEventListener('click', mostrarTodasLasDivi) 



//FUNCIONES POR ORDEN

//funcion para comprobar el ingreso de datos en los input

//pongo en focus el input

inputDivi.focus()

function validarDatos() {
    idivisa = formulario.children[1].value;
    iprecio = formulario.children[3].value;
    
    console.log(idivisa)
    console.log(iprecio)

    
    if(idivisa == '' || iprecio == ''){
        alert("Error debe completar todos los campos para continuar")
        inputProd.focus()
        bandera = false;
    } else {
        bandera = true;
    }
}





//Funcion agregar prod al ARRAY

function agregarDivi(e){ // ESA "e" del prevent the fault = previene que los input que estan siendo enviados por el form esten vacios

    //cancelamos el comportamiento del evento
    
    e.preventDefault()
    
    //creamos cada una de las partes de las variables y pusharlos al array


    validarDatos();
    if(bandera == true){
        let opcion = confirm("Esta seguro de agregar la divisa")
        if(opcion == true){
            //captura el dato del input en formato objeto del DOM
            let datos = e.target
            //enviamos los datos al array
            listaDivisas.push(new Moneda (idivisa, iprecio))
            datos.children[1].value = "";
            datos.children[3].value = "";
            
            //traer el innerHTML 

            mostrarDiviSolas.innerHTML = ""

            //agregar la funcion que los muestra en el DOM

            mostrarUnaDivi() //Callback = llamamos a la funcion para que nos muestre los productos
            inputDivi.focus()
        } else {
            alert("No se agregara el usuario")
        }

        } else {
            inputDivi.focus();
        }

}


//funcion para mostrar el DOM de la ultima divisa ingresada

const mostrarUnaDivi = () =>{
    mostrarDiviSolas.innerHTML = `
    <h3>Ultimo producto ingresado:</h3>
    <p><strong>Producto: </strong>${idivisa}</p>
    <p><strong>Precio: </strong>${iprecio}</p>
    `
}

//funcion para mostrar todas las divisas ingresadas

function mostrarTodasLasDivi (e){
    e.preventDefault();
    mostrarTodasDivi.innerHTML = '<h3>Listado de todas las divisas</h3>';
    for(const datos of listaDivisas){
        mostrarTodasDivi.innerHTML += `
        <p><strong>Producto: </strong>${datos.nombre}</p>
        <p><strong>Precio: </strong>${datos.precio}</p>
         `
    }
}


// STORAGE

const divisas = [{ id: 1,  divisa: "Dolar", precio: 136 },
                  {  id: 2,  divisa: "Euro", precio: 137 },
                  {  id: 3,  divisa: "Libra"  , precio: 164},
                  {  id: 4,  divisa: "Real" , precio: 27}];

const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
//Almacenar producto por producto
for (const divisa of divisas) {
    guardarLocal(divisa.id, JSON.stringify(divisa));
}
// o almacenar array completo
guardarLocal("listaDivisas", JSON.stringify(divisas));