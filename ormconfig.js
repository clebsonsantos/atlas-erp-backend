module.exports = {
  "type": "postgres",
  "port": 5432,
  "host": 'localhost',
  "username": 'postgres',
  "password": "docker",
  "database": "expense_manager_software",
  "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
  "entities": ["./src/modules/**/entities/*.ts"],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}

