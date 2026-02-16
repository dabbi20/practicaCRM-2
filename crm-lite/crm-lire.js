/*
CLASE DE CLIENTE CON LA ESTRUCTURA QUE VENDRAN NUESTROS CLIENTES YA DISEÑADA
*/
class Client{
    constructor(nombre,email,cell,servicio,mensaje,contacted = false,id = null,created_at = new Date().toISOString() ){
        this.nombre = nombre;
        this.email = email;
        this.cell = cell;
        this.servicio = servicio;
        this.mensaje = mensaje;
        this.contacted = contacted;
        this.id = id;
        this.created_at = created_at;
        
    }
}

let cliente1 = new Client("David Carrasco","davidack123456789@gmail.com","3134476364","Diseño web", "por favor contactame al cell para negociar")
console.log(cliente1)

/*VARIABLES GLOBALES DEL SISTEMA */

let clientes =[]
let nextID = 0
let emails = new Set ()
