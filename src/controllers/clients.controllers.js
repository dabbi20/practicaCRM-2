const service = require("../services/clients.service");

function create(req, res) {
  const result = service.createClient(req.body);
  if (!result.ok) return res.status(400).json(result);
  res.status(201).json(result);
}

function list(req, res) {
  res.json(service.listClients());
}

function getById(req, res) {
  const result = service.getClientById(req.params.id);
  if (!result.ok) return res.status(404).json(result);
  res.json(result);
}

function remove(req, res) {
  const result = service.deleteClient(req.params.id);
  if (!result.ok) return res.status(404).json(result);
  res.json(result);
}

function patchContacted(req, res) {
  const result = service.markContacted(req.params.id, req.body.value);
  if (!result.ok) return res.status(400).json(result);
  res.json(result);
}

function patchUpdate(req, res) {
  const result = service.updateClient(req.params.id, req.body);
  if (!result.ok) return res.status(400).json(result);
  res.json(result);
}

module.exports = {
  create,
  list,
  getById,
  remove,
  patchContacted,
  patchUpdate,
};