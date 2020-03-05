import {ExpressServer} from './server';
import {NoteApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {ExpressServer, NoteApplication};

export async function main(options: ApplicationConfig = {}) {
  const server = new ExpressServer(options);
  await server.boot();
  await server.start();
  console.log('Server is running at http://127.0.0.1:3000');
}

// export async function main(options: ApplicationConfig = {}) {
//   const app = new NoteApplication(options);
//   await app.boot();
//   await app.start();

//   const url = app.restServer.url;
//   console.log(`Server is running at ${url}`);
//   console.log(`Try ${url}/ping`);

//   return app;
// }
