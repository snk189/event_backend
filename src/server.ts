import app from './app';
import { env } from './config/env';
import prisma from './lib/prisma';

const startServer = async () => {
  try {
    // Connect to Database
    await prisma.$connect();
    console.log('Successfully connected to the database');

    const port = env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
