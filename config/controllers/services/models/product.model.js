import { db } from '../config/firebase.js';

const collection = db.collection('products');

export async function getAll() {
  const snapshot = await collection.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getById(id) {
  const doc = await collection.doc(id).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

export async function create(data) {
  const now = new Date().toISOString();
  const product = { ...data, createdAt: now, updatedAt: now };
  const ref = await collection.add(product);
  return { id: ref.id, ...product };
}

export async function remove(id) {
  await collection.doc(id).delete();
}
