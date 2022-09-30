import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAdministrator1644689648894 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "administrator",
              columns: [
                { name: "id", isPrimary: true, type: "uuid" },
                {
                  name: "razao",
                  type: "varchar",
                },
                {
                  name: "fantasia",
                  type: "varchar",
                },
                {
                    name: "cpf_cnpj",
                    type: "numeric",
                },
                {
                    name: "insc_estadual",
                    type: "numeric",
                },
                {
                    name: "endereco",
                    type: "varchar",
                },
                {
                    name: "bairro",
                    type: "varchar",
                },
                {
                    name: "numero",
                    type: "varchar",
                },
                {
                    name: "complemento",
                    type: "varchar",
                },
                {
                    name: "cidade",
                    type: "varchar",
                },
                {
                    name: "uf",
                    type: "varchar",
                },
                {
                    name: "cep",
                    type: "varchar",
                },
                {
                    name: "telefone",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                },
                {
                    name: "url_image",
                    type: "varchar",
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  default: "now()"
                },
              ]})
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropTable("administrator");

    }

}

