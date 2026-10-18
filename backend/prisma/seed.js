const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Iniciando carga inicial de datos FarmaPOS ---');

  const med1 = await prisma.medicine.upsert({
    where: { code: 'MED-PARACETAMOL-500' },
    update: {},
    create: {
      code: 'MED-PARACETAMOL-500',
      name: 'Paracetamol 500mg',
      description: 'Analgésico y antipirético',
      batchNumber: 'LOT-2026-X1',
      expirationDate: new Date('2028-12-31T23:59:59Z'),
      stock: 120,
      price: 2.50,
    },
  });

  const med2 = await prisma.medicine.upsert({
    where: { code: 'MED-AMOXICILINA-500' },
    update: {},
    create: {
      code: 'MED-AMOXICILINA-500',
      name: 'Amoxicilina 500mg',
      description: 'Antibiótico bactericida',
      batchNumber: 'LOT-2026-B8',
      expirationDate: new Date('2027-06-30T23:59:59Z'),
      stock: 60,
      price: 5.00,
    },
  });

  const invoice = await prisma.saleInvoice.upsert({
    where: { invoiceNumber: 'FAC-2026-0001' },
    update: {},
    create: {
      invoiceNumber: 'FAC-2026-0001',
      customerName: 'Cliente Regular Mostrador',
      totalAmount: 15.00,
      items: {
        create: [
          {
            quantity: 2,
            unitPrice: 2.50,
            subtotal: 5.00,
            medicineId: med1.id,
          },
          {
            quantity: 2,
            unitPrice: 5.00,
            subtotal: 10.00,
            medicineId: med2.id,
          },
        ],
      },
    },
  });

  console.log('Seed FarmaPOS completado con éxito:');
  console.log(`- Medicamentos: ${med1.name}, ${med2.name}`);
  console.log(`- Factura inicial: ${invoice.invoiceNumber}`);
}

main()
  .catch((e) => {
    console.error('Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
