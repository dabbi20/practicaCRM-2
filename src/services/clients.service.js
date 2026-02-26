const Client = require("../models/client");
const repo = require("../repo/clients.repo.memory");
const { inNonEmptyString, normalizeEmail, parsePositiveIntId } = require("../utils/validators");

// CREATE
function createClient(body) {
  const cliente = new Client(
    body.nombre,
    body.email,
    body.cell,
    body.servicio,
    body.mensaje
  );

  if (!inNonEmptyString(cliente.nombre))
    return { ok: false, message: "Nombre es obligatorio" };

  if (!inNonEmptyString(cliente.email))
    return { ok: false, message: "Email es obligatorio" };

  const emailNorm = normalizeEmail(cliente.email);

  if (repo.existsEmail(emailNorm))
    return { ok: false, message: "Email duplicado" };

  const saved = repo.insertClient(cliente, emailNorm);

  return { ok: true, data: saved };
}

//GET ALL

function listClients() {
  const all = repo.findAll();

  const pendientes = all.filter(c => !c.contacted);
  const contactados = all.filter(c => c.contacted);

  pendientes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  contactados.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return {
    ok: true,
    data: pendientes.concat(contactados),
  };
}

//GET BY ID

function getClientById(id) {
  const parsed = parsePositiveIntId(id);
  if (!parsed.ok) return parsed;

  const found = repo.findById(parsed.value);
  if (!found) return { ok: false, message: "No encontrado" };

  return { ok: true, data: found };
}

//DELETE

function deleteClient(id) {
  const parsed = parsePositiveIntId(id);
  if (!parsed.ok) return parsed;

  const idx = repo.findIndexById(parsed.value);
  if (idx === -1)
    return { ok: false, message: "No encontrado" };

  const deleted = repo.deleteByIndex(idx);

  return { ok: true, data: deleted };
}

//PATCH CONTACTED 

function markContacted(id, value) {
  const parsed = parsePositiveIntId(id);
  if (!parsed.ok) return parsed;

  if (typeof value !== "boolean")
    return { ok: false, message: "Debe ser boolean" };

  const updated = repo.updateById(parsed.value, { contacted: value });
  if (!updated)
    return { ok: false, message: "No encontrado" };

  return { ok: true, data: updated };
}

//UPDATE 

function updateClient(id, changes) {
  const parsed = parsePositiveIntId(id);
  if (!parsed.ok) return parsed;

  if (!changes || typeof changes !== "object")
    return { ok: false, message: "Changes inválido" };

  const allowed = ["nombre", "cell", "servicio", "mensaje", "email"];

  for (const key of Object.keys(changes)) {
    if (!allowed.includes(key))
      return { ok: false, message: `Campo no permitido: ${key}` };

    if (!inNonEmptyString(changes[key]))
      return { ok: false, message: `Dato inválido en ${key}` };
  }

  const cliente = repo.findById(parsed.value);
  if (!cliente)
    return { ok: false, message: "No encontrado" };

  if (changes.email) {
    const emailNorm = normalizeEmail(changes.email);
    if (repo.existsEmail(emailNorm))
      return { ok: false, message: "Email duplicado" };

    repo.replaceEmail(cliente.email, emailNorm);
    changes.email = emailNorm;
  }

  const updated = repo.updateById(parsed.value, changes);
  return { ok: true, data: updated };
}

module.exports = {
  createClient,
  listClients,
  getClientById,
  deleteClient,
  markContacted,
  updateClient,
};