import { sequelize } from '../models/db.js';

const MAX_RETRIES = 10;
const DELAY_MS = 3000;

export async function connectWithRetry(retries = MAX_RETRIES) {
  for (let i = 1; i <= retries; i++) {
    try {
      console.log(`🔁 Intentando conectar a la DB (intento ${i})...`);
      await sequelize.authenticate();
      console.log('✅ Conexión a la base de datos exitosa');
      return;
    } catch (err) {
      console.error(`❌ Falló la conexión a la DB: ${err.message}`);
      if (i === retries) {
        console.error('⛔ Máximo de reintentos alcanzado, abortando.');
        process.exit(1);
      }
      await new Promise((res) => setTimeout(res, DELAY_MS));
    }
  }
}
