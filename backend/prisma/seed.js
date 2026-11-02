const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Iniciando carga de 60 medicamentos por categoría en FarmaPOS ---');

  const catalog = [
    // ==========================================
    // 1. ANALGÉSICOS Y ANTIINFLAMATORIOS (10)
    // ==========================================
    {
      code: 'ANA-PARA-500',
      name: 'Paracetamol 500mg',
      description: '[Analgésicos] Alivio de fiebre y dolores de cabeza o dentales leves.',
      batchNumber: 'LOT-ANA-01',
      expirationDate: new Date('2028-12-31T23:59:59Z'),
      stock: 120,
      price: 2.50
    },
    {
      code: 'ANA-IBUP-400',
      name: 'Ibuprofeno 400mg',
      description: '[Analgésicos] Antiinflamatorio y analgésico para molestias musculares.',
      batchNumber: 'LOT-ANA-02',
      expirationDate: new Date('2028-06-30T23:59:59Z'),
      stock: 95,
      price: 3.50
    },
    {
      code: 'ANA-KETO-10',
      name: 'Ketorolaco 10mg',
      description: '[Analgésicos] Analgésico sublingual potente para dolores agudos.',
      batchNumber: 'LOT-ANA-03',
      expirationDate: new Date('2027-11-20T23:59:59Z'),
      stock: 50,
      price: 4.50
    },
    {
      code: 'ANA-DICL-50',
      name: 'Diclofenaco Sódico 50mg',
      description: '[Analgésicos] Indicado para lumbalgia, artritis e inflamaciones articulares.',
      batchNumber: 'LOT-ANA-04',
      expirationDate: new Date('2028-04-15T23:59:59Z'),
      stock: 80,
      price: 3.00
    },
    {
      code: 'ANA-CLON-125',
      name: 'Clonixinato de Lisina 125mg',
      description: '[Analgésicos] Tratamiento de dolores espasmódicos y postraumáticos.',
      batchNumber: 'LOT-ANA-05',
      expirationDate: new Date('2028-02-10T23:59:59Z'),
      stock: 60,
      price: 5.00
    },
    {
      code: 'ANA-NAPR-550',
      name: 'Naproxeno Sódico 550mg',
      description: '[Analgésicos] Alivio prolongado para inflamación osteomuscular y dental.',
      batchNumber: 'LOT-ANA-06',
      expirationDate: new Date('2027-10-25T23:59:59Z'),
      stock: 75,
      price: 4.00
    },
    {
      code: 'ANA-MELE-15',
      name: 'Meloxicam 15mg',
      description: '[Analgésicos] Antiinflamatorio no esteroideo para osteoartritis crónica.',
      batchNumber: 'LOT-ANA-07',
      expirationDate: new Date('2028-08-30T23:59:59Z'),
      stock: 65,
      price: 6.50
    },
    {
      code: 'ANA-TRAM-50',
      name: 'Tramadol 50mg',
      description: '[Analgésicos] Analgésico opioide para dolor moderado a severo bajo prescripción.',
      batchNumber: 'LOT-ANA-08',
      expirationDate: new Date('2027-09-18T23:59:59Z'),
      stock: 40,
      price: 8.00
    },
    {
      code: 'ANA-CELE-200',
      name: 'Celecoxib 200mg',
      description: '[Analgésicos] Inhibidor selectivo COX-2 protector de mucosa gástrica.',
      batchNumber: 'LOT-ANA-09',
      expirationDate: new Date('2028-05-22T23:59:59Z'),
      stock: 55,
      price: 9.00
    },
    {
      code: 'ANA-DIPY-500',
      name: 'Dipirona / Metamizol 500mg',
      description: '[Analgésicos] Antipirético y espasmolítico de acción rápida.',
      batchNumber: 'LOT-ANA-10',
      expirationDate: new Date('2028-01-14T23:59:59Z'),
      stock: 110,
      price: 2.00
    },

    // ==========================================
    // 2. ANTIBIÓTICOS (10)
    // ==========================================
    {
      code: 'ANT-AMOX-500',
      name: 'Amoxicilina 500mg',
      description: '[Antibióticos] Antibiótico bactericida para infecciones de vías respiratorias.',
      batchNumber: 'LOT-ANT-01',
      expirationDate: new Date('2027-06-30T23:59:59Z'),
      stock: 70,
      price: 5.00
    },
    {
      code: 'ANT-AZIT-500',
      name: 'Azitromicina 500mg',
      description: '[Antibióticos] Macrólido en monodosis diaria para faringitis y neumonía.',
      batchNumber: 'LOT-ANT-02',
      expirationDate: new Date('2027-09-30T23:59:59Z'),
      stock: 45,
      price: 12.00
    },
    {
      code: 'ANT-CIPR-500',
      name: 'Ciprofloxacino 500mg',
      description: '[Antibióticos] Quinolona para infecciones urinarias, renales y digestivas.',
      batchNumber: 'LOT-ANT-03',
      expirationDate: new Date('2028-03-15T23:59:59Z'),
      stock: 60,
      price: 7.50
    },
    {
      code: 'ANT-CEFA-500',
      name: 'Cefalexina 500mg',
      description: '[Antibióticos] Cefalosporina oral para infecciones cutáneas y óseas.',
      batchNumber: 'LOT-ANT-04',
      expirationDate: new Date('2027-12-10T23:59:59Z'),
      stock: 55,
      price: 6.00
    },
    {
      code: 'ANT-AMOX-CLAV',
      name: 'Amoxicilina + Ác. Clavulánico 875/125mg',
      description: '[Antibióticos] Tratamiento de cepas bacterianas resistentes a betalactámicos.',
      batchNumber: 'LOT-ANT-05',
      expirationDate: new Date('2027-08-20T23:59:59Z'),
      stock: 40,
      price: 16.00
    },
    {
      code: 'ANT-CLAR-500',
      name: 'Claritromicina 500mg',
      description: '[Antibióticos] Indicada para erradicación de H. pylori y sinusitis aguda.',
      batchNumber: 'LOT-ANT-06',
      expirationDate: new Date('2028-02-18T23:59:59Z'),
      stock: 35,
      price: 14.00
    },
    {
      code: 'ANT-LEVO-500',
      name: 'Levofloxacino 500mg',
      description: '[Antibióticos] Fluoroquinolona respiratoria para infecciones broncopulmonares.',
      batchNumber: 'LOT-ANT-07',
      expirationDate: new Date('2027-11-05T23:59:59Z'),
      stock: 50,
      price: 15.00
    },
    {
      code: 'ANT-METR-500',
      name: 'Metronidazol 500mg',
      description: '[Antibióticos] Antiparasitario y antibiótico contra bacterias anaerobias.',
      batchNumber: 'LOT-ANT-08',
      expirationDate: new Date('2028-07-12T23:59:59Z'),
      stock: 85,
      price: 3.50
    },
    {
      code: 'ANT-DOXI-100',
      name: 'Doxiciclina 100mg',
      description: '[Antibióticos] Tetraciclina para acné severo, cólera e infecciones atípicas.',
      batchNumber: 'LOT-ANT-09',
      expirationDate: new Date('2028-04-08T23:59:59Z'),
      stock: 65,
      price: 4.50
    },
    {
      code: 'ANT-COTR-800',
      name: 'Cotrimoxazol Fuerte (Sulfametoxazol + Trimetoprima)',
      description: '[Antibióticos] Antibacteriano combinado para infecciones entéricas y cistitis.',
      batchNumber: 'LOT-ANT-10',
      expirationDate: new Date('2027-10-14T23:59:59Z'),
      stock: 70,
      price: 5.50
    },

    // ==========================================
    // 3. DIGESTIVOS Y GASTROINTESTINALES (10)
    // ==========================================
    {
      code: 'DIG-OMEP-20',
      name: 'Omeprazol 20mg',
      description: '[Digestivos] Protector gástrico diario para reflujo gastroesofágico y gastritis.',
      batchNumber: 'LOT-DIG-01',
      expirationDate: new Date('2027-11-20T23:59:59Z'),
      stock: 110,
      price: 4.00
    },
    {
      code: 'DIG-DOMP-10',
      name: 'Domperidona 10mg',
      description: '[Digestivos] Antiemético y procinético para sensación de pesadez y náuseas.',
      batchNumber: 'LOT-DIG-02',
      expirationDate: new Date('2028-02-28T23:59:59Z'),
      stock: 65,
      price: 3.50
    },
    {
      code: 'DIG-ANTI-GEL',
      name: 'Gel Antiácido (Magnesio + Aluminio) 200ml',
      description: '[Digestivos] Neutralizador oral de pH gástrico y alivio de acidez inmediata.',
      batchNumber: 'LOT-DIG-03',
      expirationDate: new Date('2027-08-14T23:59:59Z'),
      stock: 35,
      price: 18.00
    },
    {
      code: 'DIG-LANT-30',
      name: 'Lansoprazol 30mg',
      description: '[Digestivos] Cicatrizante de úlceras duodenales y esofagitis erosiva.',
      batchNumber: 'LOT-DIG-04',
      expirationDate: new Date('2028-05-19T23:59:59Z'),
      stock: 55,
      price: 7.00
    },
    {
      code: 'DIG-ESOM-40',
      name: 'Esomeprazol 40mg',
      description: '[Digestivos] Inhibidor de ácido de alta potencia para úlcera activa.',
      batchNumber: 'LOT-DIG-05',
      expirationDate: new Date('2028-09-12T23:59:59Z'),
      stock: 60,
      price: 11.00
    },
    {
      code: 'DIG-SIME-80',
      name: 'Simeticona 80mg Masticable',
      description: '[Digestivos] Antiflatulento para reducir la distensión y gases abdominales.',
      batchNumber: 'LOT-DIG-06',
      expirationDate: new Date('2028-07-25T23:59:59Z'),
      stock: 90,
      price: 3.00
    },
    {
      code: 'DIG-LOPE-2',
      name: 'Loperamida Clorhidrato 2mg',
      description: '[Digestivos] Antidiarreico para cuadros agudos sin fiebre.',
      batchNumber: 'LOT-DIG-07',
      expirationDate: new Date('2027-12-05T23:59:59Z'),
      stock: 100,
      price: 2.00
    },
    {
      code: 'DIG-PLUR-COMP',
      name: 'Procinético Digestivo Compuesto',
      description: '[Digestivos] Alivio de cólicos biliares y digestión lenta.',
      batchNumber: 'LOT-DIG-08',
      expirationDate: new Date('2028-01-30T23:59:59Z'),
      stock: 75,
      price: 6.00
    },
    {
      code: 'DIG-SUCR-1000',
      name: 'Sucralfato 1g Masticable',
      description: '[Digestivos] Protector de la barrera mucosa contra la pepsina y el ácido.',
      batchNumber: 'LOT-DIG-09',
      expirationDate: new Date('2027-10-15T23:59:59Z'),
      stock: 40,
      price: 8.50
    },
    {
      code: 'DIG-PROB-CAPS',
      name: 'Probióticos Multicepa en Cápsulas',
      description: '[Digestivos] Regenerador de flora intestinal tras terapia con antibióticos.',
      batchNumber: 'LOT-DIG-10',
      expirationDate: new Date('2028-06-18T23:59:59Z'),
      stock: 50,
      price: 22.00
    },

    // ==========================================
    // 4. RESPIRATORIOS (10)
    // ==========================================
    {
      code: 'RES-AMBR-JAR',
      name: 'Ambroxol Jarabe Adulto 120ml',
      description: '[Respiratorios] Mucolítico que fluidifica secreciones bronquiales densas.',
      batchNumber: 'LOT-RES-01',
      expirationDate: new Date('2027-12-15T23:59:59Z'),
      stock: 50,
      price: 14.50
    },
    {
      code: 'RES-SALB-AER',
      name: 'Salbutamol Inhalador 100mcg (200 dosis)',
      description: '[Respiratorios] Broncodilatador de rescate para asma y broncoespasmo.',
      batchNumber: 'LOT-RES-02',
      expirationDate: new Date('2028-04-10T23:59:59Z'),
      stock: 45,
      price: 25.00
    },
    {
      code: 'RES-ACET-600',
      name: 'Acetilcisteína 600mg Sobres',
      description: '[Respiratorios] Antioxidante pulmonar y fluidificante de esputo.',
      batchNumber: 'LOT-RES-03',
      expirationDate: new Date('2028-03-20T23:59:59Z'),
      stock: 80,
      price: 5.00
    },
    {
      code: 'RES-DEXT-JAR',
      name: 'Dextrometorfano Jarabe 120ml',
      description: '[Respiratorios] Antitusivo no narcótico para inhibición de tos seca e irritativa.',
      batchNumber: 'LOT-RES-04',
      expirationDate: new Date('2027-09-05T23:59:59Z'),
      stock: 60,
      price: 13.00
    },
    {
      code: 'RES-BUDE-AER',
      name: 'Budesonida Inhalador 200mcg',
      description: '[Respiratorios] Corticoide inhalado antiinflamatorio de mantenimiento respiratorio.',
      batchNumber: 'LOT-RES-05',
      expirationDate: new Date('2028-07-14T23:59:59Z'),
      stock: 30,
      price: 45.00
    },
    {
      code: 'RES-IPRA-AER',
      name: 'Bromuro de Ipratropio Inhalador',
      description: '[Respiratorios] Anticolinérgico broncodilatador para EPOC y bronquitis crónica.',
      batchNumber: 'LOT-RES-06',
      expirationDate: new Date('2027-11-28T23:59:59Z'),
      stock: 35,
      price: 32.00
    },
    {
      code: 'RES-OXIM-NAS',
      name: 'Oximetazolina Spray Nasal 15ml',
      description: '[Respiratorios] Descongestionante tópico para alivio nasal rápido.',
      batchNumber: 'LOT-RES-07',
      expirationDate: new Date('2028-01-10T23:59:59Z'),
      stock: 70,
      price: 12.00
    },
    {
      code: 'RES-FLUT-NAS',
      name: 'Fluticasona Spray Nasal 120 dosis',
      description: '[Respiratorios] Corticoide nasal para control de rinitis vasomotora y pólipos.',
      batchNumber: 'LOT-RES-08',
      expirationDate: new Date('2028-08-01T23:59:59Z'),
      stock: 40,
      price: 38.00
    },
    {
      code: 'RES-ANTIG-TAB',
      name: 'Antigripal Compuesto (Paracetamol + Fenilefrina)',
      description: '[Respiratorios] Alivio integral de congestión nasal, estornudos y dolor de garganta.',
      batchNumber: 'LOT-RES-09',
      expirationDate: new Date('2028-10-15T23:59:59Z'),
      stock: 150,
      price: 3.00
    },
    {
      code: 'RES-MENT-VAP',
      name: 'Ungüento Mentolado Balsámico 50g',
      description: '[Respiratorios] Fricción descongestionante para pecho y cuello.',
      batchNumber: 'LOT-RES-10',
      expirationDate: new Date('2028-05-12T23:59:59Z'),
      stock: 85,
      price: 9.50
    },

    // ==========================================
    // 5. ANTIALÉRGICOS (10)
    // ==========================================
    {
      code: 'ALE-LORA-10',
      name: 'Loratadina 10mg',
      description: '[Antialérgicos] Antihistamínico para alergias oculares, prurito y rinitis.',
      batchNumber: 'LOT-ALE-01',
      expirationDate: new Date('2028-08-10T23:59:59Z'),
      stock: 90,
      price: 2.00
    },
    {
      code: 'ALE-CETI-10',
      name: 'Cetirizina 10mg',
      description: '[Antialérgicos] Bloqueador H1 selectivo para urticaria aguda y alergias estacionales.',
      batchNumber: 'LOT-ALE-02',
      expirationDate: new Date('2027-10-05T23:59:59Z'),
      stock: 80,
      price: 3.00
    },
    {
      code: 'ALE-LEVO-5',
      name: 'Levocetirizina 5mg',
      description: '[Antialérgicos] Enantiómero activo de alta biodisponibilidad y potencia antihistamínica.',
      batchNumber: 'LOT-ALE-03',
      expirationDate: new Date('2028-06-25T23:59:59Z'),
      stock: 65,
      price: 5.50
    },
    {
      code: 'ALE-FEXO-120',
      name: 'Fexofenadina 120mg',
      description: '[Antialérgicos] No sedante de segunda generación; ideal para jornadas laborales.',
      batchNumber: 'LOT-ALE-04',
      expirationDate: new Date('2028-02-14T23:59:59Z'),
      stock: 50,
      price: 7.00
    },
    {
      code: 'ALE-DESL-5',
      name: 'Desloratadina 5mg',
      description: '[Antialérgicos] Metabolito activo de liberación prolongada por 24 horas.',
      batchNumber: 'LOT-ALE-05',
      expirationDate: new Date('2028-09-08T23:59:59Z'),
      stock: 60,
      price: 6.00
    },
    {
      code: 'ALE-CLOR-4',
      name: 'Clorfenamina Maleato 4mg',
      description: '[Antialérgicos] Antihistamínico clásico de primera generación para picaduras y erupciones.',
      batchNumber: 'LOT-ALE-06',
      expirationDate: new Date('2027-11-19T23:59:59Z'),
      stock: 120,
      price: 1.50
    },
    {
      code: 'ALE-DEXA-4',
      name: 'Dexametasona 4mg Comprimidos',
      description: '[Antialérgicos] Corticoide sistémico antiinflamatorio para crisis alérgicas.',
      batchNumber: 'LOT-ALE-07',
      expirationDate: new Date('2028-03-30T23:59:59Z'),
      stock: 45,
      price: 4.00
    },
    {
      code: 'ALE-PRED-20',
      name: 'Prednisona 20mg Comprimidos',
      description: '[Antialérgicos] Inmunosupresor y antialérgico de uso intermedio.',
      batchNumber: 'LOT-ALE-08',
      expirationDate: new Date('2028-01-22T23:59:59Z'),
      stock: 55,
      price: 5.00
    },
    {
      code: 'ALE-HIDR-CREM',
      name: 'Hidrocortisona Crema 1% 20g',
      description: '[Antialérgicos] Tratamiento dérmico para dermatitis de contacto y eccema.',
      batchNumber: 'LOT-ALE-09',
      expirationDate: new Date('2027-12-10T23:59:59Z'),
      stock: 40,
      price: 11.00
    },
    {
      code: 'ALE-CALA-LOC',
      name: 'Loción de Calamina Antipruriginosa 100ml',
      description: '[Antialérgicos] Calmante dérmico para varicela, quemaduras solares y picaduras.',
      batchNumber: 'LOT-ALE-10',
      expirationDate: new Date('2028-04-18T23:59:59Z'),
      stock: 50,
      price: 13.50
    },

    // ==========================================
    // 6. ENFERMEDADES CRÓNICAS Y CARDIOVASCULARES (10)
    // ==========================================
    {
      code: 'CRO-LOSA-50',
      name: 'Losartán Potásico 50mg',
      description: '[Crónicos] Antagonista ARA-II para hipertensión arterial esencial.',
      batchNumber: 'LOT-CRO-01',
      expirationDate: new Date('2028-03-25T23:59:59Z'),
      stock: 130,
      price: 4.50
    },
    {
      code: 'CRO-METF-850',
      name: 'Metformina 850mg',
      description: '[Crónicos] Biguanida oral de control de glicemia en diabetes tipo 2.',
      batchNumber: 'LOT-CRO-02',
      expirationDate: new Date('2028-01-18T23:59:59Z'),
      stock: 120,
      price: 3.00
    },
    {
      code: 'CRO-ENAL-10',
      name: 'Enalapril Maleato 10mg',
      description: '[Crónicos] Inhibidor de la ECA para insuficiencia cardíaca y presión arterial.',
      batchNumber: 'LOT-CRO-03',
      expirationDate: new Date('2027-11-12T23:59:59Z'),
      stock: 90,
      price: 2.50
    },
    {
      code: 'CRO-AMLO-5',
      name: 'Amlodipino Besilato 5mg',
      description: '[Crónicos] Calcioantagonista vasodilatador para angina e hipertensión.',
      batchNumber: 'LOT-CRO-04',
      expirationDate: new Date('2028-07-04T23:59:59Z'),
      stock: 85,
      price: 4.00
    },
    {
      code: 'CRO-ATOR-20',
      name: 'Atorvastatina 20mg',
      description: '[Crónicos] Reductor de colesterol LDL y prevención de eventos vasculares.',
      batchNumber: 'LOT-CRO-05',
      expirationDate: new Date('2028-05-16T23:59:59Z'),
      stock: 75,
      price: 6.50
    },
    {
      code: 'CRO-GLIB-5',
      name: 'Glibenclamida 5mg',
      description: '[Crónicos] Sulfonilurea estimulante de secreción de insulina pancreática.',
      batchNumber: 'LOT-CRO-06',
      expirationDate: new Date('2027-10-29T23:59:59Z'),
      stock: 70,
      price: 2.00
    },
    {
      code: 'CRO-ASPI-100',
      name: 'Ácido Acetilsalicílico 100mg Cardio',
      description: '[Crónicos] Antiagregante plaquetario profiláctico de trombosis arterial.',
      batchNumber: 'LOT-CRO-07',
      expirationDate: new Date('2028-10-10T23:59:59Z'),
      stock: 140,
      price: 2.00
    },
    {
      code: 'CRO-LEVOT-100',
      name: 'Levotiroxina Sódica 100mcg',
      description: '[Crónicos] Terapia de reemplazo hormonal tiroideo en hipotiroidismo.',
      batchNumber: 'LOT-CRO-08',
      expirationDate: new Date('2028-04-05T23:59:59Z'),
      stock: 65,
      price: 9.00
    },
    {
      code: 'CRO-HIDR-25',
      name: 'Hidroclorotiazida 25mg',
      description: '[Crónicos] Diurético tiazídico reductor de retención hídrica y volumen vascular.',
      batchNumber: 'LOT-CRO-09',
      expirationDate: new Date('2027-12-22T23:59:59Z'),
      stock: 80,
      price: 2.50
    },
    {
      code: 'CRO-CARV-125',
      name: 'Carvedilol 12.5mg',
      description: '[Crónicos] Betabloqueador vasodilatador para protección miocárdica post-infarto.',
      batchNumber: 'LOT-CRO-10',
      expirationDate: new Date('2028-06-11T23:59:59Z'),
      stock: 60,
      price: 8.00
    }
  ];

  for (const item of catalog) {
    await prisma.medicine.upsert({
      where: { code: item.code },
      update: {
        name: item.name,
        description: item.description,
        batchNumber: item.batchNumber,
        expirationDate: item.expirationDate,
        stock: item.stock,
        price: item.price
      },
      create: item
    });
  }

  console.log(`Catálogo completo de FarmaPOS registrado: ${catalog.length} medicamentos cargados.`);
}

main()
  .catch((e) => {
    console.error('Error durante la carga:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
