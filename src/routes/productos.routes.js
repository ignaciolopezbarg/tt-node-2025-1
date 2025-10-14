
import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const URL_MOCK = 'https://6814d2a7225ff1af162a3ac3.mockapi.io/ecommerce';
const FILE_PATH = path.resolve('src/data/productos.json');

// Funciones FS
const leerProductos = () => {
  if (!fs.existsSync(FILE_PATH)) return [];
  const data = fs.readFileSync(FILE_PATH, 'utf-8');
  return JSON.parse(data);
};

const guardarProductos = (productos) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(productos, null, 2));
};

// GET todos los productos
router.get('/', async (req, res) => {
  const modo = req.app.locals.modo;
  try {
    if (modo === 'fs') return res.json(leerProductos());
    if (modo === 'mock') {
      const response = await fetch(URL_MOCK);
      const data = await response.json();
      return res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// GET producto por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const modo = req.app.locals.modo;

  try {
    if (modo === 'fs') {
      const productos = leerProductos();
      const producto = productos.find(p => p.id === id);
      if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
      return res.json(producto);
    }
    if (modo === 'mock') {
      const response = await fetch(`${URL_MOCK}/${id}`);
      if (response.status === 404) return res.status(404).json({ error: 'Producto no encontrado' });
      const producto = await response.json();
      return res.json(producto);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// POST agregar producto
router.post('/', async (req, res) => {
  const { product, description, price, stock, img, category } = req.body;
  const modo = req.app.locals.modo;

  if (!product || !description || !price || !stock || !img || !category) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  if (isNaN(price) || price <= 0) return res.status(400).json({ error: 'Precio inválido' });
  if (isNaN(stock) || stock < 0) return res.status(400).json({ error: 'Stock inválido' });

  try {
    if (modo === 'fs') {
      const productos = leerProductos();
      const id = productos.length ? (Math.max(...productos.map(p => Number(p.id))) + 1).toString() : '1';
      const nuevoProducto = { id, product, description, price, stock, img, category };
      productos.push(nuevoProducto);
      guardarProductos(productos);
      return res.status(201).json(nuevoProducto);
    }
    if (modo === 'mock') {
      const response = await fetch(URL_MOCK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, description, price, stock, img, category })
      });
      const producto = await response.json();
      return res.status(201).json(producto);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

// PUT actualizar producto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { product, description, price, stock, img, category } = req.body;
  const modo = req.app.locals.modo;

  try {
    if (modo === 'fs') {
      const productos = leerProductos();
      const index = productos.findIndex(p => p.id === id);
      if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });

      productos[index] = { ...productos[index], product, description, price, stock, img, category };
      guardarProductos(productos);
      return res.json(productos[index]);
    }
    if (modo === 'mock') {
      const response = await fetch(`${URL_MOCK}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, description, price, stock, img, category })
      });
      const producto = await response.json();
      return res.json(producto);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// DELETE producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const modo = req.app.locals.modo;

  try {
    if (modo === 'fs') {
      const productos = leerProductos();
      const index = productos.findIndex(p => p.id === id);
      if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });

      const [eliminado] = productos.splice(index, 1);
      guardarProductos(productos);
      return res.json({ message: 'Producto eliminado', eliminado });
    }
    if (modo === 'mock') {
      const response = await fetch(`${URL_MOCK}/${id}`, { method: 'DELETE' });
      if (response.status === 404) return res.status(404).json({ error: 'Producto no encontrado' });
      return res.json({ message: 'Producto eliminado en MockAPI' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

export default router;
