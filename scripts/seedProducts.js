#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();

import { create } from '../config/models/product.model.js';

const products = [
  { name: 'Pelota', price: 12.5 },
  { name: 'Camisa', price: 25.0 },
  { name: 'Taza', price: 7.99 },
  { name: 'Gorra', price: 15.5 },
  { name: 'Mochila', price: 45.0 },
  { name: 'Libro', price: 18.75 },
  { name: 'Auriculares', price: 59.9 },
  { name: 'Lampara', price: 22.0 },
  { name: 'Zapatillas', price: 75.0 },
  { name: 'Reloj', price: 120.0 }
];

async function main() {
  try {
    for (const p of products) {
      const created = await create(p);
      console.log('Creado:', created.id, '-', created.name);
    }
    console.log('Seed completado.');
    process.exit(0);
  } catch (err) {
    console.error('Error al seedear productos:', err);
    process.exit(1);
  }
}

main();
