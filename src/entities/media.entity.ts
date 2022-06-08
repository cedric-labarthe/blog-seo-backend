import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
}

registerEnumType(MediaType, {
  name: 'MediaType', // this one is mandatory
  description: 'Type of media', // this one is optional
})

@Entity()
@ObjectType()
export class Media extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number

  @Field(() => MediaType)
  @Column({ type: 'enum', enum: MediaType, default: MediaType.IMAGE })
  type: MediaType

  @Field(() => String)
  @Column()
  path: string

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date
}

@InputType()
export class MediaInput {
  @Field({ nullable: true })
  id?: number

  @Field(() => MediaType)
  type: MediaType

  @Field(() => String)
  path: string
}
