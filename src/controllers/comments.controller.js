let comments = [];
let nextId = 1;

function list(req, res) {
  res.json({ ok: true, data: comments });
}

function create(req, res) {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({
      ok: false,
      message: "Nombre y mensaje son obligatorios"
    });
  }

  const newComment = {
    id: nextId++,
    name,
    message,
    created_at: new Date().toISOString()
  };

  comments.unshift(newComment); // más reciente arriba
  res.status(201).json({ ok: true, data: newComment });
}

module.exports = {
  list,
  create
};