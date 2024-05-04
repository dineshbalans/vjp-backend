import './src/config/index.js'
import connectDatabase from './database.js';
import app from './app.js';
import globalResponseController from './src/utils/response-handlers/global-response-controller.js';
 
const DB_URL =process.env.Database_URI;

connectDatabase(DB_URL);

console.log(process.env.PORT, "env in server");


console.log(DB_URL)

const port = process.env.PORT || 3004;
const server = app.listen(port, () => {
  console.log(
    'CRUD API ' +
      process.env.NODE_ENV +
      ' mode on PORT ' +
      process.env.PORT +
      ' ' +
      new Date()
  );
});
 
app.use(globalResponseController);


process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection', err);
  server.close(() => {
    process.exit(1);
  });
});
