import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSales1646877326314 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "sales",
              columns: [
                { name: "id", isPrimary: true, type: "uuid" },
                {
                    name: "date",
                    type: "timestamp",
                },
                {
                    name: "customer_id",
                    type: "uuid",
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  default: "now()"
                },
                {
                  name: "sale_number",
                  type: "numeric",
                  isGenerated: true
                },
              ],
              foreignKeys: [
                {
                  name: "fk_customer_sales",
                  columnNames: ["customer_id"],
                  referencedTableName: "customers",
                  referencedColumnNames: ["id"],
                  onUpdate: "CASCADE",
                }
            ]
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sales");

    }

}
