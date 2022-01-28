import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCategories1643316646773 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
            name: "categories",
            columns: [
              { name: "id", isPrimary: true, type: "uuid" },
              {
                name: "name",
                type: "varchar",
                isUnique: true
              },
              {
                name: "created_at",
                type: "timestamp",
                default: 'now()'
              },
            ]
          })
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("categories");
    }

}
