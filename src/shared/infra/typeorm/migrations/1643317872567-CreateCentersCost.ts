import {MigrationInterface, QueryRunner, Table} from "typeorm" 

export class CreateCentersCost1643317872567 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
            name: "centers_cost",
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
    )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("centers_cost") 

    }

}
