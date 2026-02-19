/*
CLASE DE CLIENTE CON LA ESTRUCTURA QUE VENDRAN NUESTROS CLIENTES YA DISEÑADA
*/
class Client{
    constructor(nombre,email,cell,servicio,mensaje){
        this.nombre = nombre;
        this.email = email;
        this.cell = cell;
        this.servicio = servicio;
        this.mensaje = mensaje;
        // DEFAUL CONTROLADOS POR SISTEMA
        this.contacted = contacted;
        this.id = null;
        this.created_at = new Date().toDateString();
        
    }
}


/*VARIABLES GLOBALES DEL SISTEMA */

let clientes =[]
let nextID = 1
let emails = new Set ()

/*FUNCION DONDE VALIDAMOS QUE TENGA TEXTO REAL */

function inNonEmptyString(x){
    return typeof x === "string" && x.trim().length > 0
}

/*FUNCION DONDE RECIBIMOS CORREO EN MINUSCULAS */

/*PARA EVITAR ESTO 
"DAVID@GMAIL.COM"
" david@gmail.com "
*/

function normalizeEmail(email){
    return email.trim().toLowerCase()
}



/*FUNCION  */

function guardarClientes(cliente){
   if (!(cliente instanceof Client)){
    return {ok: false, message: "Debe ser una instacia de Cliente"}
   }
   if(cliente.id !== null){
return {ok: false, message:"El cliente ya tiene un ID no es posible asignar dos veces"}
   }

}


