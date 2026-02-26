/*
==========================================================
CRM Lite (en memoria) — Versión corregida (tu código)
==========================================================
*/

class Client {
  constructor(nombre, email, cell, servicio, mensaje) {
    this.nombre = nombre;
    this.email = email;
    this.cell = cell;
    this.servicio = servicio;
    this.mensaje = mensaje;

    // Controlados por sistema
    this.contacted = false;
    this.id = null;
    this.created_at = new Date().toDateString();
  }
}

// -------------------- Estado global --------------------
let clientes = [];
let nextID = 1;
let emails = new Set();

// -------------------- Helpers --------------------
function inNonEmptyString(x) {
  return typeof x === "string" && x.trim().length > 0;
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

// -------------------- CREATE --------------------
function guardarClientes(cliente) {
  if (!(cliente instanceof Client)) {
    return { ok: false, message: "Debe ser una instancia de Client" };
  }

  if (cliente.id !== null) {
    return { ok: false, message: "El cliente ya tiene ID (no se puede guardar dos veces)" };
  }

  if (!inNonEmptyString(cliente.nombre)) return { ok: false, message: "Nombre es obligatorio" };
  if (!inNonEmptyString(cliente.email)) return { ok: false, message: "Email es obligatorio" };
  if (!inNonEmptyString(cliente.cell)) return { ok: false, message: "Cell es obligatorio" };
  if (!inNonEmptyString(cliente.servicio)) return { ok: false, message: "Servicio es obligatorio" };
  if (!inNonEmptyString(cliente.mensaje)) return { ok: false, message: "Mensaje es obligatorio" };

  const emailNorm = normalizeEmail(cliente.email);
  if (emails.has(emailNorm)) {
    return { ok: false, message: "El correo está duplicado" };
  }

  // Mutación del sistema (ya validado)
  cliente.id = nextID;
  nextID += 1;
  cliente.email = emailNorm;

  clientes.push(cliente);
  emails.add(emailNorm);

  const resumen = {
    id: cliente.id,
    nombre: cliente.nombre,
    servicio: cliente.servicio,
    contacted: cliente.contacted,
    created_at: cliente.created_at,
  };

  return { ok: true, data: resumen };
}

// -------------------- LIST --------------------
function listClients() {
  if (clientes.length === 0) {
    return { ok: true, data: [] };
  }

  const pendientes = clientes.filter((c) => c.contacted === false);
  const contactados = clientes.filter((c) => c.contacted === true);

  pendientes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  contactados.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const ordenFinal = pendientes.concat(contactados);

  const lista = ordenFinal.map((c) => ({
    id: c.id,
    nombre: c.nombre,
    servicio: c.servicio,
    contacted: c.contacted,
    created_at: c.created_at,
  }));

  return { ok: true, data: lista };
}

// -------------------- GET BY ID --------------------
function getClientById(id) {
  const idNumber = Number(id);

  if (Number.isNaN(idNumber) || !Number.isInteger(idNumber) || idNumber <= 0) {
    return { ok: false, message: "ID no es válido" };
  }

  const clienteEncontrado = clientes.find((c) => c.id === idNumber);

  if (!clienteEncontrado) {
    return { ok: false, message: "CLIENTE NO ENCONTRADO" };
  }

  return { ok: true, data: clienteEncontrado };
}

// -------------------- DELETE --------------------
function deleteClient(id) {
  const idNumber = Number(id);

  if (Number.isNaN(idNumber) || !Number.isInteger(idNumber) || idNumber <= 0) {
    return { ok: false, message: "ID no es válido" };
  }

  const idx = clientes.findIndex((c) => c.id === idNumber);

  if (idx === -1) {
    return { ok: false, message: "CLIENTE NO ENCONTRADO" };
  }

  const emailToDelete = clientes[idx].email;

  const [deleted] = clientes.splice(idx, 1);

  emails.delete(emailToDelete);

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

// -------------------- PATCH contacted --------------------
function markContacted(id, value) {
  const idNumber = Number(id);

  if (Number.isNaN(idNumber) || !Number.isInteger(idNumber) || idNumber <= 0) {
    return { ok: false, message: "ID no es válido" };
  }

  const clienteEncontrado = clientes.find((c) => c.id === idNumber);

  if (!clienteEncontrado) {
    return { ok: false, message: "CLIENTE NO ENCONTRADO" };
  }

  if (typeof value !== "boolean") {
    return { ok: false, message: "Tipo de dato no válido (value debe ser boolean)" };
  }

  clienteEncontrado.contacted = value;

  return { ok: true, data: clienteEncontrado };
}

// -------------------- UPDATE --------------------
function updateClient(id, changes) {
  const idNumber = Number(id);

  // Validar ID
  if (Number.isNaN(idNumber) || !Number.isInteger(idNumber) || idNumber <= 0) {
    return { ok: false, message: "ID no es válido" };
  }

  // Validar changes
  if (changes === null || typeof changes !== "object" || Array.isArray(changes)) {
    return { ok: false, message: "Changes debe ser un objeto válido" };
  }

  if (Object.keys(changes).length === 0) {
    return { ok: false, message: "No hay ningún cambio" };
  }

  // Buscar cliente
  const idx = clientes.findIndex((c) => c.id === idNumber);
  if (idx === -1) {
    return { ok: false, message: "CLIENTE NO ENCONTRADO" };
  }

  // Validar campos permitidos
  const allowed = ["nombre", "cell", "servicio", "mensaje", "email"];

  for (const campo of Object.keys(changes)) {
    if (campo === "id" || campo === "created_at") {
      return { ok: false, message: `Campo prohibido: ${campo}` };
    }

    if (!allowed.includes(campo)) {
      return { ok: false, message: `Campo no permitido: ${campo}` };
    }
  }

  // Validar valores + aplicar cambios
  const cliente = clientes[idx];

  for (const campo of Object.keys(changes)) {
    const value = changes[campo];

    if (!inNonEmptyString(value)) {
      return { ok: false, message: `Dato inválido en ${campo}` };
    }

    if (campo === "email") {
      const emailNorm = normalizeEmail(value);
      const emailActual = cliente.email;

      if (emailNorm !== emailActual) {
        if (emails.has(emailNorm)) {
          return { ok: false, message: "El correo está duplicado" };
        }

        emails.delete(emailActual);
        emails.add(emailNorm);
        cliente.email = emailNorm;
      }
    } else {
      cliente[campo] = value.trim();
    }
  }

  return { ok: true, data: cliente };
}

// -------------------- PRUEBAS (Terminal) --------------------
const c1 = new Client(
  "David Carrasco",
  "DAVIDack123456789@gmail.com ",
  "3134476364",
  "Diseño web",
  "por favor contactame"
);
console.log("CREATE c1:", guardarClientes(c1));

const c2 = new Client("Otro", "davidack12356789@gmail.com", "300", "SEO", "hola");
console.log("CREATE c2:", guardarClientes(c2));

console.log("LIST:", listClients());

console.log("GET 1:", getClientById(1));

console.log("UPDATE 1 (nombre):", updateClient(1, { nombre: "David Updated" }));

console.log("PATCH contacted 1:", markContacted(1, true));

console.log("DELETE 1:", deleteClient(1));

console.log("LIST final:", listClients());