# Instrucciones del Agente - SysLab FarmaPOS (Arquitectura SysLab 2.0)

## 1. Persistencia y Base de Datos
- Toda comunicación con PostgreSQL debe realizarse exclusivamente a través de Prisma ORM tipado.
- Queda prohibida la ejecución de sentencias SQL directas sin pasar por el cliente tipado de Prisma.
- Las migraciones de base de datos deben versionarse y aplicarse formalmente mediante `prisma migrate`.

## 2. Gobernanza de Inventario y Ventas (FarmaPOS)
- **Bloqueo Estricto de Venta:** Queda terminantemente prohibido autorizar ventas de medicamentos que carezcan de número de lote (`batchNumber`) o cuya fecha de caducidad (`expirationDate`) sea menor o igual a la fecha actual (`NOW()`).
- **Atomicidad Transaccional:** La disminución de unidades en stock y la creación de la factura (`SaleInvoice`) deben ejecutarse conjuntamente dentro de un bloque transaccional atómico (`prisma.$transaction`).
- **Control de Sobregiro:** Ningún medicamento puede quedar con balance de existencias negativo.

## 3. Aislamiento y Redes
- Los servicios de Backend, Frontend y Base de Datos deben operar en contenedores aislados coordinados por Docker Compose.
- Las conexiones entre contenedores deben utilizar exclusivamente los nombres de servicio DNS (`db`, `backend`, `frontend`).
