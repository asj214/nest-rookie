import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostsTable1686644681932 implements MigrationInterface {
    name = 'CreatePostsTable1686644681932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`posts\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`user_id\` int NULL,
            \`title\` varchar(255) NOT NULL,
            \`body\` text NOT NULL,
            \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            \`deleted_at\` datetime(6) NULL,
            PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_c4f9a7bd77b489e711277ee5986\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_c4f9a7bd77b489e711277ee5986\``);
        await queryRunner.query(`DROP TABLE \`posts\``);
    }

}
