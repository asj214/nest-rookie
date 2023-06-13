import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1686639888382 implements MigrationInterface {
  name = 'CreateUsersTable1686639888382'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`users\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`email\` varchar(255) NOT NULL,
      \`name\` varchar(255) NOT NULL,
      \`password\` varchar(255) NOT NULL,
      \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      \`deleted_at\` datetime(6) NULL,
      UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`),
      PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
