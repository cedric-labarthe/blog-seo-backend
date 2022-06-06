import { Length, MaxLength } from 'class-validator'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
@ObjectType()
export class Article extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Field(() => String)
  @Column()
  title!: string

  @Field(() => String)
  @Column()
  short_description: string

  @Field(() => String)
  @Column({ type: 'text', width: 1000 })
  text: string

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
export class ArticleInput {
  @Field({ nullable: true })
  id?: number

  @Field({ nullable: true })
  @MaxLength(100)
  title?: string

  @Field({ nullable: true })
  @Length(5, 255)
  short_description?: string

  @Field({ nullable: true })
  @Length(10, 1000)
  text?: string
}
