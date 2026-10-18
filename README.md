# 🚀 Proyecto de Sistemas Paralelos — SysLab FarmaPOS

> **Integrantes del Grupo:**
> * Abigail Quispe Rogellano - E123639
>
> **Docente:** Ing. Elias Cassal Baldiviezo  
> **Materia:** Sistemas Paralelos (TEL420)  
> **Arquitectura Base:** SysLab 2.0  

---

## 📌 1. Descripción del Proyecto

**SysLab FarmaPOS** es una solución distribuida y multi-contenedor orientada al registro rápido de venta de medicamentos de mostrador y control de inventario disponible en tiempo real. Resuelve el riesgo sanitario de despacho indebido mediante el control concurrente y bloqueo estricto en la capa de persistencia de medicamentos vencidos o que carezcan de número de lote asignado.

---

## 🛠️ 2. Arquitectura de Tecnologías (SysLab 2.0)

El proyecto distribuye responsabilidades en tres capas principales orquestadas mediante contenedores Docker:

- **Frontend:** Capa de presentación para el punto de venta en mostrador (Puerto 3000).
- **Backend:** Node.js con API RESTful y procesamiento transaccional atómico (Puerto 4000).
- **Persistencia / Base de Datos:** PostgreSQL 15 con **Prisma ORM** como mapeador objeto-relacional, controlando las entidades `Medicine`, `SaleInvoice` e `InvoiceItem` (Puerto 5432).
- **Agente de IA:** Módulo de gobernanza con directrices (`rules.md`) y habilidades modulares (`skills/`) que prohíben operaciones SQL desprotegidas y transacciones con medicamentos vencidos o sin lote.

---

## 📁 3. Estructura del Repositorio

```text
.
├── agente/                 # Skills e instrucciones del agente de IA
│   ├── skills/
│   │   ├── backend/        # Skill de inventario FarmaPOS
│   │   │   └── farmapos_inventory.json
│   │   └── tasteskill/     # Skill de validación de persistencia
│   │       └── prisma_agent.json
│   └── rules.md            # Reglas de comportamiento y restricciones
├── backend/                # Capa Backend
│   ├── prisma/             # Esquema y migraciones Prisma
│   │   ├── migrations/     # Historial de migraciones SQL
│   │   ├── schema.prisma   # Entidades Medicine, SaleInvoice, InvoiceItem
│   │   └── seed.js         # Script de datos iniciales
│   ├── Dockerfile          # Imagen Docker del Backend
│   ├── package.json
│   └── .env                # Variables de entorno
├── frontend/               # Capa Frontend
│   ├── Dockerfile          # Imagen Docker del Frontend
│   ├── package.json
│   └── .env                # Variables de entorno
├── docker-compose.yml      # Orquestación de servicios (db, backend, frontend)
└── README.md               # Documentación general del proyecto
⚙️ 4. Guía de Ejecución y Despliegue
Clonar el repositorio:

Bash
git clone [https://github.com/MrsAbbys/syslab-farmapos.git](https://github.com/MrsAbbys/syslab-farmapos.git)
cd syslab-farmapos
Levantar el entorno multi-contenedor:

Bash
docker compose up --build -d
Aplicar migraciones y carga inicial de datos:

Bash
docker compose exec backend npx prisma migrate dev --name init_farmapos
docker compose exec backend node prisma/seed.js
Verificar el estado de los servicios:

Bash
docker compose ps
