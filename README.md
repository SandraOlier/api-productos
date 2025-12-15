# 📦 API REST de Productos con Firebase Firestore y JWT

Este proyecto implementa una **API REST** para administrar productos de un catálogo.  
Incluye autenticación con **JWT**, almacenamiento en **Firestore (Firebase)** y una arquitectura escalable basada en capas.

---

## 🚀 Características

- CRUD de productos (crear, leer, actualizar, eliminar).
- Autenticación de usuarios con **JWT**.
- Conexión a **Firebase Firestore** para persistencia de datos.
- Arquitectura por capas: **rutas, controladores, servicios, modelos, middlewares**.
- Manejo de errores con códigos HTTP claros (400, 401, 403, 404, 500).
- Configuración mediante variables de entorno (`.env`).

---

## 📂 Estructura del proyecto
src/ 
index.js # Punto de entrada del servidor
config/ firebase.js # Configuración de Firebase 
routes/
products.routes.js # Rutas de productos
auth.routes.js # Rutas de autenticación
controllers/
products.controller.js 
auth.controller.js 
services/ 
products.service.js
auth.service.js 
models/ 
product.model.js # Interacción con Firestore
middlewares/ 
auth.middleware.js # Middleware JWT
notFound.middleware.js


---

## ⚙️ Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tuusuario/api-productos.git
   cd api-productos
2.Instalar dependencias:
  npm install

3. Crear archivo .env en la raíz:
 PORT=3000
JWT_SECRET=supersecreto123
FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_CLIENT_EMAIL=tu_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...tu clave...\n-----END PRIVATE KEY-----\n"

4. Iniciar servidor:
npm run start

🔑 Endpoints
Autenticación
POST /auth/login Recibe credenciales y devuelve un Bearer Token.
{
  "username": "admin",
  "password": "1234"
}


Productos
GET /api/products → Lista todos los productos.

GET /api/products/:id → Devuelve producto por ID.

POST /api/products/create → Crea producto nuevo (requiere token).

DELETE /api/products/:id → Elimina producto por ID (requiere token).


🔒 Seguridad
Rutas de creación y eliminación de productos protegidas con JWT.

Middleware de autenticación verifica el token en Authorization: Bearer <token>.

Manejo de errores:

401 Unauthorized → Token ausente o inválido.

403 Forbidden → Token expirado o sin permisos.

404 Not Found → Ruta o recurso inexistente.

400 Bad Request → Datos inválidos.

500 Internal Server Error → Fallo en servidor o servicios externos.


🗄️ Firebase Firestore
Crear proyecto en Firebase Console.

Habilitar Firestore Database.

Crear colección products.

Insertar documento inicial con campos:

{
  "name": "Camiseta",
  "price": 100,
  "stock": 50,
  "status": "active"
}

🧪 Pruebas rápidas con cURL
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"1234"}'

Login:
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"1234"}'

Crear producto:
curl -X POST http://localhost:3000/api/products/create \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Camiseta","price":100,"stock":50}'


📌 Notas
No subir el archivo .env al repositorio.

Configurar reglas de seguridad en Firestore para restringir acceso según autenticación.

Extender validaciones de datos con librerías como Joi o Zod si se requiere.
