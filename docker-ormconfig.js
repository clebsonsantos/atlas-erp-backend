module.exports = {
  "type": "postgres",
  "port": 5432,
  "host": process.env.POSTGRES,
  "username": process.env.POSTGRES_NAME,
  "password": process.env.POSTGRES_PASSWORD,
  "database": "expense_manager_software",
  "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
  "entities": [
    `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/database/entities/index.{js,ts}`
  ],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}
