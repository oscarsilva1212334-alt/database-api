import app from './app';
import { closeDatabase, connectDatabase } from './config/database';
import { env } from './config/env';

async function bootstrap() {
  try {
    await connectDatabase();
    const server = app.listen(env.port, () => {
      console.log(`🚀 Servidor en http://localhost:${env.port}`);
    });

    const shutdown = async () => {
      server.close();
      await closeDatabase();
      process.exit(0);
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error('❌ No se pudo iniciar el servidor:', error);
    process.exit(1);
  }
}

bootstrap();
