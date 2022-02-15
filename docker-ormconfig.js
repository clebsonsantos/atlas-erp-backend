module.exports = {
  "type": "postgres",
  "port": 5432,
  "host": process.env.POSTGRES,
  "username": process.env.POSTGRES_NAME,
  "password": process.env.POSTGRES_PASSWORD,
  "database": "expense_manager_software",
  "entities": ["./src/entities/*.ts"],
  "migrations": ["./src/database/migrations/*.ts"],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
