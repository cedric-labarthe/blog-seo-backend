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
  text: string

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date

  @Field(() => Date)
  @DeleteDateColumn()
  deletedAt: Date
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
