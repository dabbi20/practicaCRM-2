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



/*FUNCION DONDE VALIDAMOS QUE COMPLETEN LOS DATOS CORRESPONDIENTES A LA INSTANCIA */

function guardarClientes(cliente){
   if (!(cliente instanceof Client)){
    return {ok: false, message: "Debe ser una instacia de Cliente"}
   }
   if(cliente.id !== null){
return {ok: false, message:"El cliente ya tiene un ID no es posible asignar dos veces"}
   }
if (!inNonEmptyString(cliente.nombre)){
return {ok: false, message: "Nombre es obligatorio"}
}
if (!inNonEmptyString(cliente.email)){
    return {ok: false, message: "Email es obligatorio"}
}
if (!inNonEmptyString(cliente.cell)){
    return {ok: false, message: "Cell es obligatorio"}
}
if (!inNonEmptyString(cliente.servicio)){
    return {ok: false, message: "Servicio es obligatorio"}
}
if (!inNonEmptyString(cliente.mensaje)){
    return {ok: false, message: "Mensaje es obligatorio"}
}

const emailNorm = normalizeEmail(cliente.email)
if(emails.has(emailNorm)){
    return {ok: false, message: "El correo esta duplicado"}
}
// MUTACION DEL SISTEMA (UNA VEZ VALIDADO)
// SE LE ASIGNA EL PRIMER NUMERO DE NEXTID Y DESPUES SE LE ASIGNA UN +1
cliente.id = nextID
nextID += 1
// GUARDAMOS EL EMAIL NORMALIZADO PARA EVITAR DUPLICADOS POR MAYUSCULAS O ESPACIOS
cliente.email = emailNorm

//Guardamos los datos
clientes.push(cliente)
emails.add(emailNorm)

}

// GENERAMOS UN RESUMEN DE LOS DATOS QUE QUEREMOS RETORNAR
const resumen = {
    id: cliente.id,
    nombre: cliente.nombre,
    servicio: cliente.servicio,
    contacted: cliente.contacted,
    created_at: cliente.created_at
}

return {ok: true, data: resumen}