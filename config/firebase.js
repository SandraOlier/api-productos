import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;

let dbInstance = null;

// Preferir archivo de cuenta de servicio si existe (más fiable que pasar private_key por .env)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const saPath = path.join(__dirname, '..', 'serviceAccount.json');
if (fs.existsSync(saPath)) {
  const serviceAccount = JSON.parse(fs.readFileSync(saPath, 'utf8'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  dbInstance = admin.firestore();
} else if (projectId && clientEmail && rawPrivateKey) {
  // Some env loaders keep surrounding quotes; remove them if present
  let processedKey = rawPrivateKey;
  if ((processedKey.startsWith('"') && processedKey.endsWith('"')) || (processedKey.startsWith("'") && processedKey.endsWith("'"))) {
    processedKey = processedKey.slice(1, -1);
  }

  const privateKey = processedKey.replace(/\\n/g, '\n');

  admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
  });

  dbInstance = admin.firestore();
} else {
  // Fallback: implementación ligera en memoria para desarrollo
  console.warn('Variables de Firebase no encontradas. Usando almacenamiento en memoria para desarrollo.');

  const memory = {};

  function makeCollection(name) {
    if (!memory[name]) memory[name] = {};

    return {
      async get() {
        const docs = Object.entries(memory[name]).map(([id, data]) => ({ id, data }));
        return { docs: docs.map(d => ({ id: d.id, data: () => d.data })) };
      },
      doc(id) {
        return {
          async get() {
            const exists = !!memory[name][id];
            return {
              exists,
              id,
              data: () => (exists ? memory[name][id] : undefined),
            };
          },
          async delete() {
            delete memory[name][id];
          },
        };
      },
      async add(data) {
        const id = Math.random().toString(36).slice(2, 10);
        memory[name][id] = data;
        return { id };
      },
    };
  }

  dbInstance = {
    collection(name) {
      return makeCollection(name);
    },
  };
}

export const db = dbInstance;
