import express from 'express';
import { sequelize } from '../models/db.js';
import healthRouter from '../routes/health.js';
import { connectWithRetry } from '../utils/dbRetry.js';

const app = express();

app.use(express.json());
app.use('/health', healthRouter);

const PORT = 4000;

app.listen(PORT, async () => {
  try {
    await connectWithRetry();

    console.log('✅ DB connected');
    await sequelize.sync(); // en dev: sincroniza modelos
  } catch (err) {
    console.error('❌ DB connection error:', err);
  }
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
