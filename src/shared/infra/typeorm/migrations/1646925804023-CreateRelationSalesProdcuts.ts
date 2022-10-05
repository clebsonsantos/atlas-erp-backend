import {MigrationInterface, QueryRunner, Table} from "typeorm" 

export class CreateRelationSalesProdcuts1646925804023 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "relation_sales_products",
              columns: [
                { name: "sale_id", type: "uuid" },
                { name: "products_sold_id", type: "uuid" },
              ],
              foreignKeys: [
                {
                  columnNames: ["sale_id"],
                  referencedColumnNames: ["id"],
                  referencedTableName: "sales",
                  name: "fk_sale_products",
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE",
                },
                {
                  columnNames: ["products_sold_id"],
                  referencedColumnNames: ["id"],
                  referencedTableName: "products_solds",
                  name: "fk_products_sale",
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE",
                },
              ],
            })
          ) 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("relation_sales_products")
    }

}
