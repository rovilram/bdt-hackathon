// Aquí configuración de conexión a la base de datos
const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env;

const DB_URI = process.env.DB_URI || 'mongodb://localhost/test';

const connectionString = NODE_ENV === 'test' ? `${DB_URI}-test` : DB_URI;

//  conectamos a la base de datos una sola vez y esa misma conexión se reutilizará
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.info('Connected to DB!', DB_URI);
  })
  .catch((err) => console.error('DB conection error:', err));  


//  desconecta la base de datos cuando salimos de node con ctrl+c
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info('> mongoose succesfully disconnected!');
    process.exit(0);
  });
});

module.exports = mongoose;
