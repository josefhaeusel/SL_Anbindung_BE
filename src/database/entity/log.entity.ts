import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  public id: number

  @Index()
  @Column('varchar')
  public uploadPrefix: string

  @Column('varchar')
  public videoFileName: string

  @Column('float')
  public videoFileSize: number

  @Column('text')
  public videoFileMetaData: string

  @Column('varchar')
  public splitVideoFile: string

  @Column('varchar')
  public splitAudioFile: string

  @Column('text')
  public videoFileAnalyze: string

  @Column('text')
  public audioFileAnalyze: string

  @Column('boolean')
  public appendAnimation: boolean = false

  @Column({ type: 'text', nullable: true })
  public error!: string | null

  @Column('varchar')
  public userAgent: string

  @Column({ type: 'int', nullable: true })
  public feedbackVote!: number | null

  @Column({ type: 'text', nullable: true })
  public feedbackText!: string | null

  @Index()
  @Column({ type: 'datetime' })
  public createdAt: Date

  @Index()
  @Column({ type: 'datetime' })
  public finishedAt: Date

  @Index()
  @Column({ type: 'datetime', nullable: true })
  public downloadedAt: Date
}
