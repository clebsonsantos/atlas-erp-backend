module.exports = {
  "type": "postgres",
  "port": 5432,
  "host": 'localhost',
  "username": 'postgres',
  "password": "s-cleb96",
  "database": "expense_manager_software",
  "entities": ["./src/entities/*.ts"],
  "migrations": ["./src/database/migrations/*.ts"],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
