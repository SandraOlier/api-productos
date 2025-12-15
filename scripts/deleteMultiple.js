#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();

import * as productService from '../config/services/products.service.js';

const ids = ['30Z2EjTGvExoMZJfbhic', '3wIEaN9MFsOYATHOfLGE'];

async function main() {
  try {
    console.log('Deleting ids:', ids);
    const result = await productService.deleteMultiple(ids);
    console.log('Result:', JSON.stringify(result, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error deleting multiple:', err);
    process.exit(1);
  }
}

main();
