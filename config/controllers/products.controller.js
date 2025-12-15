import * as productService from '../services/products.service.js';

export async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getProductById(req, res) {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createProduct(req, res) {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteMultiple(req, res) {
  try {
    const ids = req.body && req.body.ids;
    if (!Array.isArray(ids) || ids.length === 0) return res.status(400).json({ error: 'Se requiere un arreglo `ids` con al menos un id' });

    const result = await productService.deleteMultiple(ids);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
