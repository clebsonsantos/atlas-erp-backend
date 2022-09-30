module.exports = {
  "type": "postgres",
  "port": 5432,
  "host": process.env.POSTGRES,
  "username": process.env.POSTGRES_NAME,
  "password": process.env.POSTGRES_PASSWORD,
  "database": "expense_manager_software",
  "entities": ["./dist/modules/**/infra/typeorm/entities/*.js"],
  "migrations": ["./dist/shared/infra/typeorm/migrations/*.js"],
  "cli": {
    "migrationsDir": "./dist/shared/infra/typeorm/migrations"
  }
}
