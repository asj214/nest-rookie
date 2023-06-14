import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex
} from "typeorm";

export class CreateCategoriesTable1686717845752 implements MigrationInterface {
  name = 'CreateCategoriesTable1686717845752'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "categories",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true
          },
          {
            name: "parent_id",
            type: "int",
            default: null
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "depth",
            type: "int",
            default: 0
          },
          {
            name: "order",
            type: "int",
            default: 0
          },
          {
            name: "path",
            type: "json"
          },
          {
            name: "created_at",
            type: "datetime(6)",
            default: "CURRENT_TIMESTAMP(6)",
          },
          {
            name: "updated_at",
            type: "datetime(6)",
            default: 'CURRENT_TIMESTAMP(6)',
            onUpdate: 'CURRENT_TIMESTAMP(6)'
          },
          {
            name: "deleted_at",
            type: "datetime(6)",
            isNullable: true
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      "categories",
      new TableIndex({
        name: "parentIdx",
        columnNames: ["parent_id"],
      })
    );

    await queryRunner.createIndex(
      "categories",
      new TableIndex({
        name: "userIdx",
        columnNames: ["user_id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("categories", "parentIdx");
    await queryRunner.dropIndex("categories", "userIdx");
    await queryRunner.dropTable("categories");
  }

  // public async up(queryRunner: QueryRunner): Promise<void> {
  //   await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`parent_id\` int NULL, \`name\` varchar(255) NOT NULL, \`depth\` int NOT NULL DEFAULT '0', \`order\` int NOT NULL DEFAULT '0', \`path\` json NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
  //   await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_88cea2dc9c31951d06437879b40\` FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
  //   await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_2296b7fe012d95646fa41921c8b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
  // }

  // public async down(queryRunner: QueryRunner): Promise<void> {
  //   await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_2296b7fe012d95646fa41921c8b\``);
  //   await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_88cea2dc9c31951d06437879b40\``);
  //   await queryRunner.query(`DROP TABLE \`categories\``);
  // }
}
