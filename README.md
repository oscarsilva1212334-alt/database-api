# API Demo – Bases de Datos

API REST con **Node.js + Express + TypeScript + MongoDB**, organizada por capas
(rutas → controlador → servicio → repositorio), más un frontend sencillo de tareas
servido desde la carpeta `public/`.

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior (incluye `npm`)
- MongoDB en local (`mongodb://127.0.0.1:27017`) o una URI de MongoDB Atlas
- Git

## Instalación

```bash
npm install
```

Copia el archivo de variables de entorno y ajústalo si es necesario:

```bash
cp .env.example .env        # Windows (CMD): copy .env.example .env
```

## Ejecución

Modo desarrollo (recarga automática):

```bash
npm run dev
```

Compilar y ejecutar en producción:

```bash
npm run build
npm start
```

Abre en el navegador: <http://localhost:3000>

## Endpoints

| Método | Ruta                 | Descripción                    |
|--------|----------------------|--------------------------------|
| GET    | `/api/v1/health`     | Estado de la API               |
| GET    | `/api/v1/demo`       | Listar registros               |
| GET    | `/api/v1/demo/:id`   | Obtener un registro            |
| POST   | `/api/v1/demo`       | Crear (`title`, `description`) |
| PUT    | `/api/v1/demo/:id`   | Actualizar                     |
| DELETE | `/api/v1/demo/:id`   | Eliminar                       |

## Estructura

```
src/
├── config/        # env y conexión a MongoDB
├── modules/demo/  # model, repository, service, controller, routes
├── shared/        # AppError y middlewares
├── api/v1/        # enrutador versionado
├── app.ts         # configuración de Express
└── server.ts      # arranque del servidor
public/            # frontend (HTML, CSS, JS)
```

## Subir a GitHub

1. Crea un repositorio vacío en GitHub (sin README).
2. Ejecuta en la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Primer commit: API demo con Express y TypeScript"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/api-demo-bases-datos.git
git push -u origin main
```
