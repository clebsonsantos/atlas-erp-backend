import { MigrationInterface, QueryRunner, Table } from "typeorm" 

export class CreateUsers1627508510952 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "username",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "full_name",
            type: "varchar",
          },
          {
            name: "phone",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()", 
            //TODO => CAMPOS ADICIONAIS [ PERMISSÕES, FUNÇÃO, EMAIL, NOVA SENHA]
            //TODO => REPENSAR O TODO ACIMA
  
          },
        ],
      })
    ) 
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users") 
  }
}
