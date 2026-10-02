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

// Default initial products (wiped as requested)
const DEFAULT_PRODUCTS: any[] = [];

// Helper functions for file storage
function readProducts(): any[] {
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
      const list = JSON.parse(data);
      if (Array.isArray(list)) {
        return list;
      }
    }
  } catch (err) {
    console.error('Error reading products file:', err);
  }
  return [];
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
