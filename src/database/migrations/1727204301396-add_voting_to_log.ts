import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddVotingToLog1727204301396 implements MigrationInterface {
  name = 'AddVotingToLog1727204301396'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`log\` ADD \`feedbackVote\` int NULL AFTER \`userAgent\``)
    await queryRunner.query(
      `ALTER TABLE \`log\` ADD \`feedbackText\` text NULL AFTER \`feedbackVote\``,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`log\` DROP COLUMN \`feedbackText\``)
    await queryRunner.query(`ALTER TABLE \`log\` DROP COLUMN \`feedbackVote\``)
  }
}
