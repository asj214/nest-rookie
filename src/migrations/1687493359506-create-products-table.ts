import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsTable1687493359506 implements MigrationInterface {
    name = 'CreateProductsTable1687493359506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`products\` (
          \`id\` int NOT NULL AUTO_INCREMENT,
          \`user_id\` int NULL,
          \`name\` varchar(255) NOT NULL,
          \`price\` decimal(10,2) NOT NULL,
          \`description\` text NOT NULL,
          \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
          \`deleted_at\` datetime(6) NULL,
          PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories_products\` (\`product_id\` int NOT NULL, \`category_id\` int NOT NULL, INDEX \`IDX_cd4647bd19e92294b58a536798\` (\`product_id\`), INDEX \`IDX_18751735d6d4936849dafa4d75\` (\`category_id\`), PRIMARY KEY (\`product_id\`, \`category_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_88cea2dc9c31951d06437879b40\` FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_2296b7fe012d95646fa41921c8b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_176b502c5ebd6e72cafbd9d6f70\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories_products\` ADD CONSTRAINT \`FK_cd4647bd19e92294b58a536798c\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`categories_products\` ADD CONSTRAINT \`FK_18751735d6d4936849dafa4d751\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories_products\` DROP FOREIGN KEY \`FK_18751735d6d4936849dafa4d751\``);
        await queryRunner.query(`ALTER TABLE \`categories_products\` DROP FOREIGN KEY \`FK_cd4647bd19e92294b58a536798c\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_176b502c5ebd6e72cafbd9d6f70\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_2296b7fe012d95646fa41921c8b\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_88cea2dc9c31951d06437879b40\``);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`user_id\` \`user_id\` int NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_18751735d6d4936849dafa4d75\` ON \`categories_products\``);
        await queryRunner.query(`DROP INDEX \`IDX_cd4647bd19e92294b58a536798\` ON \`categories_products\``);
        await queryRunner.query(`DROP TABLE \`categories_products\``);
        await queryRunner.query(`DROP TABLE \`products\``);
    }

}
