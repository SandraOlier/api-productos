import * as productModel from '../models/product.model.js';

export async function getAllProducts() {
  return await productModel.getAll();
}

export async function getProductById(id) {
  return await productModel.getById(id);
}

export async function createProduct(data) {
  if (!data.name || !data.price) throw new Error('Datos incompletos');
  return await productModel.create(data);
}

export async function deleteProduct(id) {
  return await productModel.remove(id);
}

export async function deleteMultiple(ids) {
  const results = [];
  for (const id of ids) {
    try {
      const existing = await productModel.getById(id);
      if (!existing) {
        results.push({ id, deleted: false, reason: 'not_found' });
        continue;
      }
      await productModel.remove(id);
      results.push({ id, deleted: true });
    } catch (err) {
      results.push({ id, deleted: false, reason: err.message });
    }
  }
  const deletedCount = results.filter(r => r.deleted).length;
  return { deleted: deletedCount, results };
}
