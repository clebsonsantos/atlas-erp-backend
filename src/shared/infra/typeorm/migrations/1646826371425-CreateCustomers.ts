import {MigrationInterface, QueryRunner, Table} from "typeorm" 

export class CreateCustomers1646826371425 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "customers",
              columns: [
                { name: "id", isPrimary: true, type: "uuid" },
                {
                  name: "full_name",
                  type: "varchar",
                },
                {
                  name: "cpf_cnpj",
                  type: "varchar",
                },
                {
                    name: "state_registration",
                    type: "numeric",
                },
                {
                    name: "phone",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                },
                {
                    name: "state",
                    type: "varchar",
                },
                {
                    name: "city",
                    type: "varchar",
                },
                {
                    name: "address",
                    type: "varchar",
                },
                {
                    name: "zip_code",
                    type: "varchar",
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  default: "now()"
                },
              ]})
          ) 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
