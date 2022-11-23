module.exports = {
  "type": "postgres",
  "port": 5432,
  "host": 'localhost',
  "username": 'postgres',
  "password": "docker",
  "database": "expense_manager_software",
  "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
  "entities": [
    `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/database/entities/index.{js,ts}`
  ],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}

