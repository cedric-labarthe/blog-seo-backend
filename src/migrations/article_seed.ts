import { MigrationInterface, QueryRunner } from 'typeorm'

export class PostRefactoringTIMESTAMP implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO article VALUES (1, "he", "lo")`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(``)
  }
}
