module.exports = {
  "type": "postgres",
  "port": 5432,
  "host": process.env['DATABASE_HOST'],
  "username": process.env['DATABASE_USERNAME'],
  "password": process.env['DATABASE_PASSWORD'],
  "database": "expense_manager_software",
  "entities": ["./src/entities/*.ts"],
  "migrations": ["./src/database/migrations/*.ts"],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}

