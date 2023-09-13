import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1694576604592 implements MigrationInterface {
    name = 'InitialMigration1694576604592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`phoneNumber\` bigint NOT NULL, \`email\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`birthDate\` datetime NOT NULL, \`dni\` int NOT NULL, \`userName\` varchar(255) NOT NULL, \`role\` enum ('Admin', 'Client', 'Professional') NOT NULL DEFAULT 'Client', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admins\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`phoneNumber\` bigint NOT NULL, \`email\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`birthDate\` datetime NOT NULL, \`dni\` int NOT NULL, \`userName\` varchar(255) NOT NULL, \`role\` enum ('Admin', 'Client', 'Professional') NOT NULL DEFAULT 'Client', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`clients\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`phoneNumber\` bigint NOT NULL, \`email\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`birthDate\` datetime NOT NULL, \`dni\` int NOT NULL, \`userName\` varchar(255) NOT NULL, \`role\` enum ('Admin', 'Client', 'Professional') NOT NULL DEFAULT 'Client', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`professionals\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`phoneNumber\` bigint NOT NULL, \`email\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`birthDate\` datetime NOT NULL, \`dni\` int NOT NULL, \`userName\` varchar(255) NOT NULL, \`role\` enum ('Admin', 'Client', 'Professional') NOT NULL DEFAULT 'Client', \`registrationNumber\` int NOT NULL, \`specialty\` varchar(255) NOT NULL, \`yearsOfExperience\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`professionals\``);
        await queryRunner.query(`DROP TABLE \`clients\``);
        await queryRunner.query(`DROP TABLE \`admins\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
