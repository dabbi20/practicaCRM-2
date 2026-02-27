const API_BASE = "/api/clients";

const form = document.getElementById("commentForm");
const nombreEl = document.getElementById("nombre");
const emailEl = document.getElementById("email");
const cellEl = document.getElementById("cell");
const servicioEl = document.getElementById("servicio");
const mensajeEl = document.getElementById("mensaje");

const statusEl = document.getElementById("status");
const listEl = document.getElementById("commentsList");
const refreshBtn = document.getElementById("refreshBtn");

function setStatus(text, isError = false) {
  statusEl.textContent = text;
  statusEl.style.color = isError ? "#fda4af" : "#a78bfa";
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderList(list) {
  listEl.innerHTML = "";

  if (!Array.isArray(list) || list.length === 0) {
    listEl.innerHTML = `<div class="item"><div class="itemMeta">No hay comentarios aún.</div></div>`;
    return;
  }

  for (const c of list) {
    const nombre = escapeHtml(c.nombre ?? "Anon");
    const servicio = escapeHtml(c.servicio ?? "N/A");
    const created = escapeHtml(c.created_at ?? "");
    const contacted = Boolean(c.contacted);

    const badgeClass = contacted ? "ok" : "pending";
    const badgeText = contacted ? "Contactado" : "Pendiente";

    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <div class="itemTop">
        <div>
          <div class="itemName">${nombre}</div>
          <div class="itemMeta">${servicio}</div>
        </div>
        <div style="text-align:right">
          <span class="badge ${badgeClass}">${badgeText}</span>
          <div class="itemMeta">${created}</div>
        </div>
      </div>
    `;
    listEl.appendChild(div);
  }
}

async function loadClients() {
  setStatus("Cargando...");
  try {
    const res = await fetch(API_BASE);
    const data = await res.json();

    if (!res.ok || data.ok === false) {
      throw new Error(data.message || "Error al cargar");
    }

    const list = Array.isArray(data) ? data : data.data;
    renderList(list);
    setStatus("Listo ✅");
  } catch (err) {
    setStatus(err.message, true);
  }
}

async function createClient(payload) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok || data.ok === false) {
    throw new Error(data.message || "No se pudo guardar");
  }
  return data;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    nombre: nombreEl.value.trim(),
    email: emailEl.value.trim(),
    cell: cellEl.value.trim(),
    servicio: servicioEl.value,
    mensaje: mensajeEl.value.trim(),
  };

  // Validación rápida front (para no pegarle al backend vacío)
  if (!payload.nombre || !payload.email || !payload.cell || !payload.servicio || !payload.mensaje) {
    setStatus("Completa todos los campos.", true);
    return;
  }

  try {
    setStatus("Enviando...");
    await createClient(payload);

    // limpiar
    nombreEl.value = "";
    emailEl.value = "";
    cellEl.value = "";
    servicioEl.value = "Diseño web";
    mensajeEl.value = "";

    await loadClients();
    setStatus("Guardado ✅");
  } catch (err) {
    setStatus(err.message, true);
  }
});

refreshBtn.addEventListener("click", loadClients);

// cargar al inicio
loadClients();