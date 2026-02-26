function inNonEmptyString(x) {
  return typeof x === "string" && x.trim().length > 0;
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function parsePositiveIntId(id) {
  const idNumber = Number(id);

  if (Number.isNaN(idNumber) || !Number.isInteger(idNumber) || idNumber <= 0) {
    return { ok: false, message: "ID no es válido" };
  }

  return { ok: true, value: idNumber };
}

module.exports = {
  inNonEmptyString,
  normalizeEmail,
  parsePositiveIntId,
};