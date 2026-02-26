const clientes = [];
let nextID = 1;
const emails = new Set();

function existsEmail(emailNorm) {
  return emails.has(emailNorm);
}

function insertClient(client, emailNorm) {
  client.id = nextID;
  nextID += 1;

  client.email = emailNorm;

  clientes.push(client);
  emails.add(emailNorm);

  return client;
}

function findAll() {
  return clientes;
}

function findById(id) {
  return clientes.find(c => c.id === id) || null;
}

function findIndexById(id) {
  return clientes.findIndex(c => c.id === id);
}

function deleteByIndex(idx) {
  const email = clientes[idx].email;
  const [deleted] = clientes.splice(idx, 1);
  emails.delete(email);
  return deleted;
}

function updateById(id, patch) {
  const c = findById(id);
  if (!c) return null;

  for (const key of Object.keys(patch)) {
    c[key] = patch[key];
  }

  return c;
}

function replaceEmail(oldEmail, newEmail) {
  emails.delete(oldEmail);
  emails.add(newEmail);
}

module.exports = {
  existsEmail,
  insertClient,
  findAll,
  findById,
  findIndexById,
  deleteByIndex,
  updateById,
  replaceEmail,
};