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
                },
              ],
              foreignKeys: [
                {
                  columnNames: ["center_cost_id"],
                  referencedColumnNames: ["id"],
                  referencedTableName: "centers_cost",
                  name: "fk_centers_cost",
                  onDelete: "RESTRICT",
                  onUpdate: "CASCADE",
                },
                {
                  columnNames: ["category_id"],
                  referencedColumnNames: ["id"],
                  referencedTableName: "categories",
                  name: "fk_categories",
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

