import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCompliments1624549015272 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "compliments",
        columns:[
          {
            name: "id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "user_sender",
            type: "uuid"
          },
          {
            name: "user_receiver",
            type: "uuid"
          },
          {
            name: "tag_id",
            type: "uuid"
          },
          {
            name: "message",
            type: "varchar"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          }
        ],
        // PODEMOS INCLUIR A CHAVE EXTRANGEIRA DESTA FORMA
        foreignKeys:[
          {
            name: "FK_User_Compliments",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_sender"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL"
          },
          {
            name: "FK_User_Compliments",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_receiver"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL"
          },
          {
            name: "FK_Tags_Compliments",
            referencedTableName: "tags",
            referencedColumnNames: ["id"],
            columnNames: ["tag_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL"
          }
        ]
      })
    )

    // PODEMOS INCLUIR A CHAVE EXTRANGEIRA DESTA OUTRA FORMA E SERÁ NECESSÁRIO FAZER O DROPTABLE PARA REVERSÃO
    // await queryRunner.createForeignKey(
    //   "compliments", new TableForeignKey(
    //     {
    //       name: "FK_User_SenderCompliments",
    //       referencedTableName: "users",
    //       referencedColumnNames: ["id"],
    //       columnNames: ["user_sender"],
    //       onDelete: "SET NULL",
    //       onUpdate: "SET NULL"
    //     }
    //   )
    // )  
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("compliments");
  }

}
