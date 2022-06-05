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
  @Column({ nullable: false })
  title!: string

  @Field(() => String)
  @Column({ nullable: false })
  short_description: string

  @Field(() => String)
  @Column({ nullable: false })
  text: string

  @Field(() => Date)
  @CreateDateColumn({ nullable: false })
  createdAt: Date

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date
}

@InputType()
export class ArticleInput
  implements Pick<Article, 'title' | 'short_description' | 'text'>
{
  @Field()
  title: string

  @Field()
  short_description: string

  @Field()
  text: string
}
