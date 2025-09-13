module.exports = {
  "type": "postgres",
  "port": 5000,
  "host": process.env['POSTGRES_HOST'],
  "username": process.env['POSTGRES_USER'],
  "password": process.env['POSTGRES_PASSWORD'],
  "database": process.env['POSTGRES_DB'],
  "entities": ["./src/entities/*.ts"],
  "migrations": ["./src/database/migrations/*.ts"],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}

