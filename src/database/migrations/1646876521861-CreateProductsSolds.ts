import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProductsSolds1646876521861 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "products_solds",
              columns: [
                { name: "id", isPrimary: true, type: "uuid" },
                {
                    name: "quantity",
                    type: "numeric",
                },
                {
                    name: "price_unit",
                    type: "numeric",
                },
                {
                    name: "total_price",
                    type: "numeric",
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  default: "now()"
                },
                { 
                    name: "id_product", 
                    type: "uuid" 
                },
              ],
              foreignKeys: [
                {
                  name: "fk_products_solds",
                  columnNames: ["id_product"],
                  referencedTableName: "products",
                  referencedColumnNames: ["id"],
                  onUpdate: "CASCADE",
                }
            ]
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products_solds");
    }

}
