import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateExpenses1643318232567 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "expenses",
              columns: [
                { name: "id", isPrimary: true, type: "uuid" },
                {
                  name: "description",
                  type: "varchar",
                },
                {
                  name: "amount",
                  type: "numeric",
                },
                {
                    name: "quantity",
                    type: "numeric",
                },
                {
                    name: "frequency",
                    type: "varchar",
                },
                {
                    name: "type",
                    type: "varchar",
                },
                {
                    name: "center_cost_id",
                    type: "uuid",
                },
                {
                    name: "category_id",
                    type: "uuid",
                },
                {
                  name: "date",
                  type: "timestamp",
                  default: "now()"
                },
              ],
              foreignKeys: [
                {
                  name: "fk_centers_cost",
                  referencedTableName: "centers_cost",
                  referencedColumnNames: ["id"],
                  columnNames: ["center_cost_id"],
                  onDelete: "RESTRICT",
                  onUpdate: "CASCADE",
                },
                {
                  name: "fk_categories",
                  referencedTableName: "categories",
                  referencedColumnNames: ["id"],
                  columnNames: ["category_id"],
                  onDelete: "RESTRICT",
                  onUpdate: "CASCADE",
                },
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropTable("expenses");

    }

}

