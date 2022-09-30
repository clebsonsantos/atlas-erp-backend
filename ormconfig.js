module.exports = {
  "type": "postgres",
  "port": 5432,
  "host": 'localhost',
  "username": 'postgres',
  "password": "docker",
  "database": "expense_manager_software",
  "entities": ["./src/modules/**/infra/typeorm/entities/*.ts"],
  "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}

