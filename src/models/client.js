class Client {
  constructor(nombre, email, cell, servicio, mensaje) {
    this.nombre = nombre;
    this.email = email;
    this.cell = cell;
    this.servicio = servicio;
    this.mensaje = mensaje;

    this.contacted = false;
    this.id = null;
    this.created_at = new Date().toISOString();
  }
}

module.exports = Client;