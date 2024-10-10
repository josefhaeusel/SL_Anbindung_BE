import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialDatabase1727204301300 implements MigrationInterface {
  name = 'InitialDatabase1727204301300'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`session\` (\`expiredAt\` bigint NOT NULL, \`id\` varchar(255) NOT NULL, \`json\` text NOT NULL, \`destroyedAt\` datetime(6) NULL, INDEX \`IDX_28c5d1d16da7908c97c9bc2f74\` (\`expiredAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uploadPrefix\` varchar(255) NOT NULL, \`videoFileName\` varchar(255) NOT NULL, \`videoFileSize\` float NOT NULL, \`videoFileMetaData\` text NOT NULL, \`splitVideoFile\` varchar(255) NOT NULL, \`splitAudioFile\` varchar(255) NOT NULL, \`videoFileAnalyze\` text NOT NULL, \`audioFileAnalyze\` text NOT NULL, \`appendAnimation\` tinyint NOT NULL, \`error\` text NULL, \`userAgent\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL, \`finishedAt\` datetime NOT NULL, \`downloadedAt\` datetime NULL, INDEX \`IDX_e99b2f26175e2cda3c42fe038e\` (\`uploadPrefix\`), INDEX \`IDX_8e4eb51a35d81b64dda28eed0a\` (\`createdAt\`), INDEX \`IDX_138fa848d689e4d4fef91e962d\` (\`finishedAt\`), INDEX \`IDX_072e482464d384a34202c0e348\` (\`downloadedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_072e482464d384a34202c0e348\` ON \`log\``,
    )
    await queryRunner.query(
      `DROP INDEX \`IDX_138fa848d689e4d4fef91e962d\` ON \`log\``,
    )
    await queryRunner.query(
      `DROP INDEX \`IDX_8e4eb51a35d81b64dda28eed0a\` ON \`log\``,
    )
    await queryRunner.query(
      `DROP INDEX \`IDX_e99b2f26175e2cda3c42fe038e\` ON \`log\``,
    )
    await queryRunner.query(`DROP TABLE \`log\``)
    await queryRunner.query(
      `DROP INDEX \`IDX_28c5d1d16da7908c97c9bc2f74\` ON \`session\``,
    )
    await queryRunner.query(`DROP TABLE \`session\``)
  }
}
