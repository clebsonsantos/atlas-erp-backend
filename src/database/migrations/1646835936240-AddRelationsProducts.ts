import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddRelationsProducts1646835936240 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey("products", new TableForeignKey({
                  name: "fk_products_centers_cost",
                  columnNames: ["center_cost_id"],
                  referencedTableName: "centers_cost",
                  referencedColumnNames: ["id"],
                  onUpdate: "CASCADE",
    }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropForeignKey("products","fk_products_centers_cost");

    }

}
