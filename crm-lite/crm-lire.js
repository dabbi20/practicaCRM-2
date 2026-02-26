/*
CLASE DE CLIENTE CON LA ESTRUCTURA QUE VENDRAN NUESTROS CLIENTES YA DISEÑADA
*/
class Client {
  constructor(nombre, email, cell, servicio, mensaje) {
    this.nombre = nombre;
    this.email = email;
    this.cell = cell;
    this.servicio = servicio;
    this.mensaje = mensaje;
    // DEFAUL CONTROLADOS POR SISTEMA
    this.contacted = false;
    this.id = null;
    this.created_at = new Date().toDateString();
  }
}

/*VARIABLES GLOBALES DEL SISTEMA */

let clientes = [];
let nextID = 1;
let emails = new Set();

/*FUNCION DONDE VALIDAMOS QUE TENGA TEXTO REAL */

function inNonEmptyString(x) {
  return typeof x === "string" && x.trim().length > 0;
}

/*FUNCION DONDE RECIBIMOS CORREO EN MINUSCULAS */

/*PARA EVITAR ESTO 
"DAVID@GMAIL.COM"
" david@gmail.com "
*/

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

/*FUNCION DONDE VALIDAMOS QUE COMPLETEN LOS DATOS CORRESPONDIENTES A LA INSTANCIA */

function guardarClientes(cliente) {
  if (!(cliente instanceof Client)) {
    return { ok: false, message: "Debe ser una instacia de Cliente" };
  }
  if (cliente.id !== null) {
    return {
      ok: false,
      message: "El cliente ya tiene un ID no es posible asignar dos veces",
    };
  }
  if (!inNonEmptyString(cliente.nombre)) {
    return { ok: false, message: "Nombre es obligatorio" };
  }
  if (!inNonEmptyString(cliente.email)) {
    return { ok: false, message: "Email es obligatorio" };
  }
  if (!inNonEmptyString(cliente.cell)) {
    return { ok: false, message: "Cell es obligatorio" };
  }
  if (!inNonEmptyString(cliente.servicio)) {
    return { ok: false, message: "Servicio es obligatorio" };
  }
  if (!inNonEmptyString(cliente.mensaje)) {
    return { ok: false, message: "Mensaje es obligatorio" };
  }

  const emailNorm = normalizeEmail(cliente.email);
  if (emails.has(emailNorm)) {
    return { ok: false, message: "El correo esta duplicado" };
  }
  // MUTACION DEL SISTEMA (UNA VEZ VALIDADO)
  // SE LE ASIGNA EL PRIMER NUMERO DE NEXTID Y DESPUES SE LE ASIGNA UN +1
  cliente.id = nextID;
  nextID += 1;
  // GUARDAMOS EL EMAIL NORMALIZADO PARA EVITAR DUPLICADOS POR MAYUSCULAS O ESPACIOS
  cliente.email = emailNorm;

  //Guardamos los datos
  clientes.push(cliente);
  emails.add(emailNorm);

  // GENERAMOS UN RESUMEN DE LOS DATOS QUE QUEREMOS RETORNAR
  const resumen = {
    id: cliente.id,
    nombre: cliente.nombre,
    servicio: cliente.servicio,
    contacted: cliente.contacted,
    created_at: cliente.created_at,
  };

  return { ok: true, data: resumen };
}

let c1 = new Client(
  "David Carrasco",
  "DAVIDack123456789@gmail.com ",
  "3134476364",
  "Diseño web",
  "por favor contactame",
);
console.log(guardarClientes(c1)); // ok true

let c2 = new Client("Otro", "davidack12356789@gmail.com", "300", "SEO", "hola");
console.log(guardarClientes(c2)); // ok false (duplicado)

/*CONTRATO DE LA FUNCION LIST */

function listClients() {
  // 1️ Si no hay clientes, devolver lista vacía (no es error)
  if (clientes.length === 0) {
    return { ok: true, data: [] };
  }

  // 2️ Separar en dos grupos
  const pendientes = clientes.filter((c) => c.contacted === false);
  const contactados = clientes.filter((c) => c.contacted === true);

  // 3️ Ordenar cada grupo por fecha DESC (más recientes primero)
  pendientes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  contactados.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // 4️ Unir grupos (pendientes primero)
  const ordenFinal = pendientes.concat(contactados);

  // 5️ Mapear a resumen (no devolver todo el objeto)
  const lista = ordenFinal.map((cliente) => ({
    id: cliente.id,
    nombre: cliente.nombre,
    servicio: cliente.servicio,
    contacted: cliente.contacted,
    created_at: cliente.created_at,
  }));

  return { ok: true, data: lista };
}

function getClientById(id) {
  // CONVERTIR A NUMERO
  const idNumber = Number(id);

  //VALIDAD ID

  if (Number.isNaN(idNumber) || !Number.isInteger(idNumber) || idNumber <= 0) {
    return { ok: false, message: "ID no es válido" };
  }

  //BUSCAR CLIENTE

  const clienteEncontrado = clientes.find((cliente) => cliente.id === idNumber);
  //SI NO EXISTE
  if (!clienteEncontrado) {
    return { ok: false, message: "CLIENTE NO ENCONRADO" };
  }
  //SI EL CLIENTE SI EXISTE
  return { ok: true, data: clienteEncontrado };
}

function deleteClient(id) {
  // Convertir a número
  const idNumber = Number(id);

  //  Validar ID
  if (Number.isNaN(idNumber) || !Number.isInteger(idNumber) || idNumber <= 0) {
    return { ok: false, message: "ID no es válido" };
  }

  //  Buscar cliente
  const idx = clientes.findIndex((cliente) => cliente.id === idNumber);

  //  Si no existe
  if (idx === -1) {
    return { ok: false, message: "CLIENTE NO ENCONTRADO" };
  }
  // GUARDAR EMAIL ANTES DE BORRAR
  const guardarEmail = clientes[idx].email;
  //BORRAR EL ARRAY

  let [borrar] = clientes.splice(idx, 1);

  //BORRAR DEL SET
  emails.delete(guardarEmail);
  //RESPUESTA
  return {
    ok: true,
    data: {
      id: deleted.id,
      nombre: deleted.nombre,
      email: deleted.email,
      servicio: deleted.servicio,
      contacted: deleted.contacted,
      created_at: deleted.created_at,
    },
  };
}

//FUNCION CONTACTED

//DECLARAMOS LA FUNCION

function markContacted(id, value) {
  // Convertir a número
  const idNumber = Number(id);

  //  Validar ID
  if (Number.isNaN(idNumber) || !Number.isInteger(idNumber) || idNumber <= 0) {
    return { ok: false, message: "ID no es válido" };
  }

  //  Buscar cliente
  const clienteEncontrado = clientes.find((cliente) => cliente.id === idNumber);

  //  Si no existe
  if (!clienteEncontrado) {
    return { ok: false, message: "CLIENTE NO ENCONTRADO" };
  }

  if (typeof value !== "boolean") {
    return { ok: false, message: "Tipo de dato no valido" };
  }
  clienteEncontrado.contacted = value;
  return { ok: true, data: clienteEncontrado };
}

//FUNCION UPDATE

function updateClient(id, changes) {
  // Convertir a número
  const idNumber = Number(id);
  //VALIDAMOS CHANGES
  if (
    changes === null ||
    typeof changes !== "object" ||
    Array.isArray(changes)
  ) {
    return { ok: false, message: "Changes debe ser un objeto valido" };
  }

  //SI ALMENOS TIENE UNA PROPIEDAD

  if (Object.keys(changes).length === 0) {
    return { ok: false, message: "No hay ningun cambio" };
  }

  //  Validar ID
  if (Number.isNaN(idNumber) || !Number.isInteger(idNumber) || idNumber <= 0) {
    return { ok: false, message: "ID no es válido" };
  }

  const idx = clientes.findIndex((c) => c.id === idNumber);
  if (idx === -1) {
    return { ok: false, message: "CLIENTE NO ENCONTRADO" };
  }
  const allowed = ["nombre","cell","servicio","mensaje","email"];
  for (let recorrer of Object.keys(changes)) {
if(! allowed.includes(recorrer)){
return { ok: false, message: "Campo no permitido" }
}
  }

  for(let campo of Object.keys(changes)){
    const value = changes[campo]
    if(!inNonEmptyString(value)){
return {ok: false, message:`Dato inválido en ${campo}`}
    }
    if(campo === "email"){
        emailNorm = normalizeEmail(value)
    }
  }
}
