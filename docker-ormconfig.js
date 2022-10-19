module.exports = {
  "type": "postgres",
  "port": 5432,
  "host": process.env.POSTGRES,
  "username": process.env.POSTGRES_NAME,
  "password": process.env.POSTGRES_PASSWORD,
  "database": "expense_manager_software",
  "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
  "entities": ["./src/modules/**/entities/*.ts"],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}
