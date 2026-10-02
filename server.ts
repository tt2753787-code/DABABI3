import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const SUPPLIERS_FILE = path.join(DATA_DIR, 'suppliers.json');

// Default initial products
const DEFAULT_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'سماعات لاسلكية ستيريو برو',
    category: 'electronics',
    categoryLabel: 'أجهزة وإلكترونيات',
    price: 290,
    originalPrice: 380,
    supplierName: 'سفيان ستور',
    supplierCity: 'الدار البيضاء',
    whatsappNumber: '+212 661-849201',
    description: 'بطارية تدوم 36 ساعة، عزل صوت محيطي وتقنية الشحن السريع Type-C. تسليم سريع لجميع المدن المغربية والدفع عند الاستلام.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUSZQz3nCUvkSCFuEzT6wV020mIADZzqZ0pum9kJ0bI0Q-WPR2OEba1dAngq0YQWh-0gOyk0Gda-YXUMhlX-VO1eSMs3jym6pYiNIgr5oSTXvdma7ZgIQVqbfV-c5o8QspZvrqpXb1dMSrbLwnnoxqSRVRFrT74Dbg0Izt1ttD_J8x68VjvxujcluT34stMfhLyDpwkXKjPQUtyV_ZuSomi1Q8GqIzcB53rO0aS4t65ggCWIrCBoVO',
    verified: true,
    featured: true,
    createdAt: '2025-05-10T12:00:00.000Z',
    stockStatus: 'available',
    unit: 'قطعة واحدة',
  },
  {
    id: 'prod-2',
    name: 'زيت زيتون بكر ممتاز (5 لتر)',
    category: 'food',
    categoryLabel: 'مواد غذائية',
    price: 180,
    originalPrice: 220,
    supplierName: 'معصرة الأطلس',
    supplierCity: 'قلعة السراغنة',
    whatsappNumber: '+212 663-120944',
    description: 'عصرة أولى باردة، إنتاج الموسم الجديد بجودة عالية ونسبة حموضة أقل من 0.4٪ طبيعي 100٪ بدون أية إضافات.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIbH70tNkkLHA8rqrI15ZAv3NNMbnVDPgR2jps4c8PNqiqmun9m0eHgUzb2PYifgZ1nyrxc2cTIhhg3cz-kw-cnl_2jO8dUJWO_qC-jBut5KZTrF9xpPf7K_DTuMOquxtM7CJJ5cXLVMQPAVMZKrz87Sn7B-XFeG3BNIFddOs0SWfz_xA4GC0C7v2ETpDTXchmmTEi6KWjRDi3NiMd1AnWyBWr8H6sednhus7EuXr2XQ6dRhU6Moyj',
    verified: true,
    featured: true,
    createdAt: '2025-05-12T12:00:00.000Z',
    stockStatus: 'available',
    unit: 'بيدون 5 لتر',
  },
  {
    id: 'prod-3',
    name: 'حقيبة سفر يدوية جلد طبيعي',
    category: 'fashion',
    categoryLabel: 'ملابس وأزياء',
    price: 340,
    originalPrice: 450,
    supplierName: 'دار الجلد العتيق',
    supplierCity: 'فاس',
    whatsappNumber: '+212 654-771120',
    description: 'صناعة يدوية تقليدية من فاس بجلد بقر طبيعي مدبوغ نباتياً، خياطة متينة ومقاومة للاستعمال المكثف.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf4ocqSm9f8SaxD2EFLF0AoWuMxUZoKPmGZKdYkQF58sYurTjH-OMczyG9IcvM2UwMnyJsp6I_puPfa8NEOo3e5IN5ozy0zg_gq-ZfYBNzvcdRf26VFhHMtvigHTCjKP5FFygyZiu38E5FM1-Oxi7MT1YBMTG7LTuzbGCf2ZwO5XPrUPBlBxZ5RMAmNp9H6s-oSyU7cLSEJ1rDdwWZ6-6QAPimKIjqTTnJOgTNFzK5I3XS6NJ7fjEt',
    verified: true,
    featured: true,
    createdAt: '2025-05-14T12:00:00.000Z',
    stockStatus: 'available',
    unit: 'حقيبة مع حزام كتف',
  },
  {
    id: 'prod-4',
    name: 'شاي أخضر ممتاز كرتونة جملة (24 علبة)',
    category: 'wholesale',
    categoryLabel: 'سلع بالجملة',
    price: 1200,
    originalPrice: 1350,
    supplierName: 'شركة النور للاستيراد',
    supplierCity: 'طنجة',
    whatsappNumber: '+212 610-449832',
    description: 'شاي صيني بارود حبة ممتازة مخصص للمقاهي والمحلات التجارية، أسعار تفضيلية للموزعين.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2j-mN0F8xJVis5LSQTDJMFvEuCqXzRnUGoXoQxkw7WeFeYuQ7-ebz6Rz8plEpthwivKE54i-mJT_A2krQZy8fhEaDm631l9khiWclhR42D45c-DmSULKOfUx4QRbbF-FFVmJDW3uMs2rDJeIoiTtgSCHlVWwBj9n9HfANOfhxf4OJxduJtPxhr8MwRo41gGlXd-gvm6zWvWOTFhXWIfpbOrc1aBElor55HcN1kyIccckhIUt_XQQw',
    verified: true,
    featured: false,
    createdAt: '2025-05-15T12:00:00.000Z',
    stockStatus: 'available',
    unit: 'كرتونة (24 علبة)',
  },
  {
    id: 'prod-5',
    name: 'ساعة ذكية فيتنس ألترا مقاومة للماء',
    category: 'electronics',
    categoryLabel: 'أجهزة وإلكترونيات',
    price: 250,
    originalPrice: 320,
    supplierName: 'تك زون المغرب',
    supplierCity: 'الرباط',
    whatsappNumber: '+212 678-903211',
    description: 'شاشة AMOLED ساطعة، مراقبة نبضات القلب والأنشطة الرياضية، بطارية تدوم حتى 10 أيام.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRq2W0WHwL7s1R14gZir6I_41-v_MZL8EwhHQvgWG5CTZja33kBDDSDXXNw_aEXFvjSew_kX5tFkqa7hWgHQGWLA-i9MzQr4alNjs6Y20LZ-TXuV6bqRSdT7vjYCc5XsVTYBwW1Im2odStjURP2OM2EdQh_y0h29hiyurLJLOzd7XJsbMyLubpQwYqT76tGWc-Or7DAIy9KhhXZXwNXdcsCrjLn0qGfYrPs9xbgkV2mdycNj06isTQ',
    verified: true,
    featured: false,
    createdAt: '2025-05-16T12:00:00.000Z',
    stockStatus: 'available',
    unit: 'ساعة + سوارين + شاحن',
  },
  {
    id: 'prod-6',
    name: 'عسل الدغموس الطبيعي الأصلي (1 كلغ)',
    category: 'food',
    categoryLabel: 'مواد غذائية',
    price: 210,
    originalPrice: 260,
    supplierName: 'مناحل سوس الطبيعية',
    supplierCity: 'أكادير',
    whatsappNumber: '+212 662-550981',
    description: 'عسل بري نقي ومختبر مخبرياً، غني بالفوائد العلاجية، معبأ مباشرة من خلايا النحل بدون سكر مضاف.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUx0aZAejue4DLZNipaTTl13I59xfSoQU36-5xffx1Abg0VPJ91NguBKDuBsE2pA52Vn7uhqPQymRASru5OzfO3ibFBhbS3_P348DsyTZuNaX8Kayc4sx_HyjFo-NZYXMerl02vwGbKbS_m56TTMGHTnleyGHmWEgRx3sIeVwVvM5-EA2-QurWljRbF-NKFu6JnQ_ssk2p5yakpybJiUb8pTg49Xl8fv2dJwKSvLrDR86gfQ97DsNX',
    verified: true,
    featured: true,
    createdAt: '2025-05-18T12:00:00.000Z',
    stockStatus: 'available',
    unit: 'قارورة زجاجية 1 كلغ',
  },
  {
    id: 'prod-7',
    name: 'حقيبة جلدية أصلية مخدومة يدوياً (سفر وخروج)',
    category: 'crafts',
    categoryLabel: 'صناعة تقليدية وجلد',
    price: 450,
    originalPrice: 590,
    supplierName: 'ورشة الأطلس للصناعات',
    supplierCity: 'فاس',
    whatsappNumber: '+212 667-889900',
    description: 'جلد طبيعي مدبوغ بالطريقة الفاسية التقليدية، متانة استثنائية وجيوب مريحة للتنقل اليومي والسفر.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMyOymILKVCZrCRteazYCpS7gU92di06hadzboigfHeNL_67WCNYmRhi8Xc9wXDGrkNuhfEm5bwp1PS13MPFfme0RMGkn8zco8lgViaP1wSqyNlL4-ZZw55fL8ll3DqylPUQsVOPyOIOM7anEV7s9lW5mo9ngFM3SHAmyGnNpltLRtg9_UN4XmmmVd1XvZSTn8R4uyzPB9FyFR_3fSwYhB6G9p2rDJivV_EtCPOBhriniCOKbYfKbt',
    verified: true,
    featured: true,
    createdAt: '2025-05-20T12:00:00.000Z',
    stockStatus: 'available',
    unit: 'حقيبة يد وسفر',
  },
];

// Helper functions for file storage
function readProducts(): any[] {
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
      const list = JSON.parse(data);
      if (Array.isArray(list) && list.length > 0) {
        return list;
      }
    }
  } catch (err) {
    console.error('Error reading products file:', err);
  }
  // Initialize with defaults if empty or not existing
  writeProducts(DEFAULT_PRODUCTS);
  return DEFAULT_PRODUCTS;
}

function writeProducts(products: any[]) {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing products file:', err);
  }
}

function readSuppliers(): Record<string, any> {
  try {
    if (fs.existsSync(SUPPLIERS_FILE)) {
      const data = fs.readFileSync(SUPPLIERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading suppliers file:', err);
  }
  return {};
}

function writeSuppliers(suppliers: Record<string, any>) {
  try {
    fs.writeFileSync(SUPPLIERS_FILE, JSON.stringify(suppliers, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing suppliers file:', err);
  }
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// 1. Get all products (shared across all users on the link)
app.get('/api/products', (req, res) => {
  const products = readProducts();
  res.json(products);
});

// 2. Add product (immediately saved on server, visible to everyone)
app.post('/api/products', (req, res) => {
  try {
    const product = req.body;
    if (!product || !product.name) {
      return res.status(400).json({ error: 'بيانات المنتج غير كاملة' });
    }

    const currentList = readProducts();
    // Prepend so new items appear first
    const updatedList = [product, ...currentList];
    writeProducts(updatedList);

    // Also remember supplier profile from this product
    if (product.whatsappNumber && product.supplierName) {
      const suppliers = readSuppliers();
      suppliers[product.whatsappNumber] = {
        storeName: product.supplierName,
        city: product.supplierCity || 'فاس',
        phone: product.whatsappNumber,
        lastActive: new Date().toISOString(),
      };
      writeSuppliers(suppliers);
    }

    res.status(201).json({ success: true, product });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Save or update supplier profile
app.post('/api/suppliers', (req, res) => {
  try {
    const { storeName, city, phone } = req.body;
    if (!phone) {
      return res.status(400).json({ error: 'رقم الهاتف مطلوب' });
    }

    const suppliers = readSuppliers();
    suppliers[phone] = {
      storeName: storeName || 'متجر المورد',
      city: city || 'فاس',
      phone,
      updatedAt: new Date().toISOString(),
    };
    writeSuppliers(suppliers);

    res.json({ success: true, supplier: suppliers[phone] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get supplier profile by phone
app.get('/api/suppliers/:phone', (req, res) => {
  const suppliers = readSuppliers();
  const found = suppliers[req.params.phone];
  if (found) {
    res.json(found);
  } else {
    res.status(404).json({ error: 'لم يتم العثور على المورد' });
  }
});

// 5. Update product
app.put('/api/products/:id', (req, res) => {
  try {
    const id = req.params.id;
    const updated = req.body;
    const currentList = readProducts();
    const index = currentList.findIndex((p: any) => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'المنتج غير موجود' });
    }
    currentList[index] = { ...currentList[index], ...updated };
    writeProducts(currentList);
    res.json({ success: true, product: currentList[index] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Delete product
app.delete('/api/products/:id', (req, res) => {
  try {
    const id = req.params.id;
    const currentList = readProducts();
    const filtered = currentList.filter((p: any) => p.id !== id);
    writeProducts(filtered);
    res.json({ success: true, id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// Vite middleware in dev or static files in production
// -------------------------------------------------------------
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DABABI3 server running on port ${PORT}`);
  });
}

startServer();
