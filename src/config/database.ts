import { MongoClient, Db } from 'mongodb';
import { env } from './env';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectDatabase(): Promise<Db> {
  if (db) return db;
  client = new MongoClient(env.mongoUri);
  await client.connect();
  db = client.db(env.dbName);
  console.log(`✅ Conectado a MongoDB: ${env.dbName}`);
  return db;
}

export function getDb(): Db {
  if (!db) {
    throw new Error('La base de datos no está inicializada. Llama a connectDatabase() primero.');
  }
  return db;
}

export async function closeDatabase(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
