import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addColummInExpenses1644152700483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("expenses", new TableColumn({
                name: "created_at",
                type: "timestamp",
                default: "now()"
        }))
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropColumn("expenses","created_at");

    }

}
