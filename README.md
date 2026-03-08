# Tu Oficio

Plataforma marketplace en espanol que conecta clientes con profesionales de servicios (plomeros, electricistas, etc.).

## Requisitos previos

- Node.js
- PostgreSQL (localhost:5432, user/password/database: test/test/test)

## Instalacion

```bash
npm install
```

## Comandos

| Comando | Que hace |
|---------|----------|
| `npm run dev` | Levanta back (3000) + front (3001) juntos con hot-reload |
| `npm start` | Solo backend, sirve el frontend buildeado (produccion) |
| `npm run build` | Buildea frontend + backend |
| `npm run start:back` | Levanta solo el backend (puerto 3000) |
| `npm run start:front` | Levanta solo el frontend |
| `npm run build:back` | Buildea solo el backend |
| `npm run build:front` | Buildea solo el frontend |
| `npm run test:back` | Corre todos los tests del backend (unitarios + E2E) |
| `npm run test:e2e` | Corre solo los tests E2E del backend |
| `npm run test:front` | Corre los tests del frontend |
| `npm run seed` | Carga datos de prueba (10 clientes + 10 profesionales) |
