# CodeArt – Hobby: Programación

Proyecto académico desarrollado con arquitectura Backend + Frontend integrado.

##  Descripción

Este proyecto consiste en una página web sobre mi hobby: la programación.  
Integra:

- Frontend: HTML, CSS y JavaScript
- Backend: Node.js + Express
- Arquitectura modular (Rutas, Controladores, Servicios, Repo en memoria)
- CRUD completo para gestión de clientes/comentarios

Los comentarios del formulario se almacenan como clientes en memoria del servidor.

---

##  Arquitectura

Se implementó una arquitectura por capas:

- Routes → Manejo de endpoints
- Controllers → Manejo de req/res
- Services → Lógica de negocio
- Repo (memory) → Almacenamiento temporal en memoria
- Model → Clase Client

Patrones aplicados:
- MVC (Model-View-Controller)
- Repository Pattern
- Service Layer Pattern
- Arquitectura modular

---

##  Cómo ejecutar el proyecto

1. Instalar dependencias:

```bash
npm install

Ejecutar el servidor:

npm run dev

Abrir en navegador:

http://localhost:3000
 Estructura del Proyecto
server.js
src/
  routes/
  controllers/
  services/
  repo/
  models/
public/
  index.html
  styles.css
  app.js
 Endpoints principales

GET /api/clients
POST /api/clients
PATCH /api/clients/:id
DELETE /api/clients/:id

 Tecnologías utilizadas

Node.js

Express

JavaScript (ES6)

HTML5

CSS3


---

#  2️⃣ INFORME TÉCNICO (Para entregar en PDF o Word)

Copia esto y pásalo a Word si necesitas formato formal:

---

## INFORME TÉCNICO – PROYECTO HOBBY PROGRAMACIÓN

### 1. Descripción del proyecto

El proyecto consiste en una página web que representa mi hobby: la programación.  
Incluye un frontend moderno y un backend desarrollado con Node.js y Express.

El sistema permite registrar comentarios mediante un formulario, los cuales son almacenados como registros tipo cliente en memoria.

---

### 2. Arquitectura utilizada

Se implementó una arquitectura modular por capas basada en el patrón MVC:

- **Model:** Clase Client que define la estructura de datos.
- **Routes:** Definen los endpoints HTTP.
- **Controllers:** Manejan la comunicación HTTP.
- **Services:** Contienen la lógica de negocio.
- **Repository:** Maneja almacenamiento en memoria.
- **Public:** Contiene el frontend.

Esta arquitectura permite:
- Separación de responsabilidades
- Escalabilidad
- Mantenibilidad
- Reutilización de código

---

### 3. Funcionalidades implementadas

- Crear cliente (POST)
- Listar clientes (GET)
- Obtener cliente por ID
- Actualizar cliente (PATCH)
- Marcar cliente como contactado
- Eliminar cliente

---

### 4. Tecnologías utilizadas

- Node.js
- Express
- JavaScript ES6
- HTML5
- CSS3

---

### 5. Conclusión

El proyecto demuestra la integración completa entre frontend y backend, aplicando arquitectura profesional y buenas prácticas de desarrollo.

---

#  3️⃣ ANEXO – PROCESO DE DESARROLLO (Resumen técnico de la conversación)

Copia esto como Anexo:

---

## ANEXO – PROCESO DE DESARROLLO

Durante el desarrollo del proyecto se realizaron los siguientes pasos:

1. Diseño del modelo Client con validaciones.
2. Implementación del CRUD en memoria.
3. Separación por capas (routes, controllers, services).
4. Configuración del servidor Express.
5. Integración del frontend con fetch API.
6. Corrección de errores de:
   - CORS
   - Endpoint no encontrado
   - Validaciones obligatorias
   - Diferencia entre Live Server y Express
7. Ajuste del formulario para enviar todos los campos requeridos por el backend.

Se solucionó el error “Email es obligatorio” adaptando el frontend para enviar todos los campos requeridos por el CRUD.

---

#  4️⃣ Texto para describirlo en Replit/Glitch

Puedes poner esto en la descripción del proyecto: https://codeart-backend--davidack1234567.replit.app

> Proyecto académico que integra frontend (HTML/CSS/JS) con backend Node.js + Express usando arquitectura modular por capas. Implementa CRUD completo en memoria con validaciones y separación de responsabilidades.

---

