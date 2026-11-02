const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Endpoint de estado
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'FarmaPOS API', timestamp: new Date() });
});

// Listar catálogo de medicamentos
app.get('/api/medicines', async (req, res) => {
  try {
    const medicines = await prisma.medicine.findMany({
      orderBy: { name: 'asc' }
    });

    const now = new Date();
    const result = medicines.map(med => {
      const isExpired = new Date(med.expirationDate) <= now;
      const hasBatch = Boolean(med.batchNumber && med.batchNumber.trim() !== '');
      return {
        ...med,
        isExpired,
        isSellable: !isExpired && hasBatch && med.stock > 0
      };
    });

    res.json(result);
  } catch (error) {
    console.error('Error al consultar inventario:', error);
    res.status(500).json({ error: 'Error al consultar inventario de medicamentos.' });
  }
});

// Registrar venta atómica con factura
app.post('/api/sales', async (req, res) => {
  const { customerName, items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Debe incluir al menos un producto en el pedido.' });
  }

  try {
    const newInvoice = await prisma.$transaction(async (tx) => {
      let calculatedTotal = 0;
      const invoiceItemsData = [];
      const now = new Date();

      for (const item of items) {
        const medicine = await tx.medicine.findUnique({
          where: { id: item.medicineId }
        });

        if (!medicine) {
          throw new Error(`El medicamento con ID ${item.medicineId} no existe.`);
        }

        if (!medicine.batchNumber || medicine.batchNumber.trim() === '') {
          throw new Error(`Control sanitario: El medicamento '${medicine.name}' no tiene lote asignado.`);
        }

        if (new Date(medicine.expirationDate) <= now) {
          throw new Error(`Control sanitario: El producto '${medicine.name}' se encuentra vencido.`);
        }

        if (medicine.stock < item.quantity) {
          throw new Error(`Stock insuficiente para '${medicine.name}'. Existencias actuales: ${medicine.stock}.`);
        }

        const subtotal = medicine.price * item.quantity;
        calculatedTotal += subtotal;

        await tx.medicine.update({
          where: { id: medicine.id },
          data: { stock: medicine.stock - item.quantity }
        });

        invoiceItemsData.push({
          medicineId: medicine.id,
          quantity: item.quantity,
          unitPrice: medicine.price,
          subtotal
        });
      }

      const invoiceCount = await tx.saleInvoice.count();
      const invoiceNumber = `FAC-2026-${String(invoiceCount + 1).padStart(4, '0')}`;

      const createdInvoice = await tx.saleInvoice.create({
        data: {
          invoiceNumber,
          customerName: customerName ? customerName.trim() : 'Cliente Mostrador',
          totalAmount: calculatedTotal,
          items: {
            create: invoiceItemsData
          }
        },
        include: {
          items: {
            include: { medicine: true }
          }
        }
      });

      return createdInvoice;
    });

    res.status(201).json({
      message: 'Venta completada con éxito',
      invoice: newInvoice
    });

  } catch (error) {
    console.error('Error al procesar venta:', error.message);
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 FarmaPOS Backend activo en http://0.0.0.0:${PORT}`);
});
