


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
    console.log('created connection')

    const app = CreateServer();

    app.listen(3000, (error) => {
      if (error) {
        console.log('error', 'failed to start server', error);
        return;
      }

      console.log('info',`server started on port 3000`);
    });

  }).catch((error) => console.log(error));







// import express, { json, NextFunction, Request, Response } from "express";
// import "reflect-metadata";
// import { createConnection } from "typeorm";
// import { User } from "./entity/User";

// createConnection()
//   .then(async (connection) => {
//     const app = express();

//     app.use(json());

//     app.post(
//       "/user",
//       async (
//         req: Request,
//         res: Response,
//         next: NextFunction
//       ): Promise<void> => {
//         const user = new User();
//         user.firstName = req.body.firstName;
//         user.lastName = req.body.lastName;
//         user.age = req.body.age;

//         console.log("Inserting a new user into the database...");
//         await connection.manager.save(user);
//         console.log("Saved a new user with id: " + user.id);

//         res.status(200).json({ userId: user.id });

//         next();
//       }
//     );

//     app.get(
//       "/user",
//       async (
//         req: Request,
//         res: Response,
//         next: NextFunction
//       ): Promise<void> => {
//         console.log("Loading users from the database...");
//         const users = await connection.manager.find(User);
//         console.log("Loaded users: ", users);

//         res.json(users);

//         next();
//       }
//     );

//     app.listen(3000, () => {
//       console.log("API is running on http://localhost:3000");
//     });
//   })
//   .catch((error) => console.log(error));
