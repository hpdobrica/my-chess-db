
import "reflect-metadata";

import { createConnection } from "typeorm";
import { CreateServer } from './server';


process.on('unhandledRejection', (error) => {
  console.log('error', 'unhandledRejection', {
    error,
  });
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.log('error', 'uncaughtException', {
    error,
  });
  process.exit(1);
});

console.log('creating connection')
createConnection()
  .then(async (connection) => {
    console.log('running migrations')

    await connection.runMigrations();

    console.log('completed migrations')

    const app = CreateServer();

    app.listen(3000, (error) => {
      if (error) {
        console.log('error', 'failed to start server', error);
        return;
      }

      console.log('info',`server started on port 3000`);
    });

  }).catch((error) => console.log(error));



