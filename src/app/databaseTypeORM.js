// Aquí configuración de conexión a la base de datos
const typeorm = require('typeorm');
require('dotenv').config();

//  conectamos a la base de datos una sola vez y esa misma conexión se reutilizará

const dbOptionsMongo = {
  type: 'mongodb',
  host: process.env.MONGO_HOST || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  username: process.env.MONGO_USER || '',
  password: process.env.MONGO_PASS || '',
  database: process.env.MONGO_DB || 'test',
  useUnifiedTopology: true,
  entities: [
    require('../api/user/entity'),
    // require("./entity/Category")
  ],
};

const dbOptionsPosgre = {
  type: 'postgres',
  host: process.env.POSTGRESQL_HOST || 'localhost',
  port: process.env.POSTGRESQL_PORT || 5432,
  username: process.env.POSTGRESQL_USER || '',
  password: process.env.POSTGRESQL_PASS || '',
  database: process.env.POSTGRESQL_DB || 'test',
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [
    require('../api/user/entity'),
    // require("./entity/Category")
  ],
};

const dbSelector = {
  mongodb: dbOptionsMongo,
  postgresql: dbOptionsPosgre,
};

const dbOptions = dbSelector[process.env.DB] || {};

const dbConnection = typeorm
  .createConnection(dbOptions)
  .then((connection) => {
    console.log(
      `Base de datos ${connection.options.type} conectada en ${connection.options.host}:${connection.options.port}`,
    );
    return connection;
  })
  .catch((error) => console.error('Error al conectar la base de datos', error));

//  desconecta la base de datos cuando salimos de node con ctrl+c
const connection = typeorm.getConnection();
process.on('SIGINT', async () => {
  await connection.close();
  console.log('cerrando servidores');
  !connection.isConnected && process.exit(0);
});

module.exports = connection;
