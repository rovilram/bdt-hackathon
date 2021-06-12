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
  //synchronize: true,
  useUnifiedTopology: true,
  entities: [
    // require("./entity/Post"),
    // require("./entity/Category")
  ],
};

const dbOptionsPosgre = {
  type: 'postgres',
  host: process.env.POSTGRESQL_HOST || 'localhost',
  port: process.env.POSTGRESQL_PORT || 5432,
  username: process.env.POSTGRESQL_USER || '',
  //el 2º 1 es 2
  password: process.env.POSTGRESQL_PASS || '',
  database: process.env.POSTGRESQL_DB || 'test',
  ssl: {
    rejectUnauthorized: false,
  },
  //synchronize: true,
  entities: [
    // require("./entity/Post"),
    // require("./entity/Category")
  ],
};

let dbOptions = {};

if (process.env.DB === 'mongodb') dbOptions = dbOptionsMongo;
else if (process.env.DB === 'postgresql') dbOptions = dbOptionsPosgre;

const dbConnection = typeorm
  .createConnection(dbOptions)
  .then((connection) => {
    console.log(
      `Base de datos ${connection.options.type} conectada en ${connection.options.host}:${connection.options.port}`,
    );
    return connection;
  })
  .catch((error) => console.error('Error al conectar la base de datos', error));

/* mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.info('Connected to DB!');
  })
  .catch((err) => console.error('DB conection error:', err));
 */
//  desconecta la base de datos cuando salimos de node con ctrl+c
process.on('SIGINT', () => {
  dbConnection.close(() => {
    //   // eslint-disable-next-line no-console
    //   console.info('> mongoose succesfully disconnected!');
    //   process.exit(0);
  });
});

module.exports = dbConnection;
