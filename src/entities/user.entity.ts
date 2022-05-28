import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Field, ID, InputType, ObjectType } from 'type-graphql'

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number

  @Field(() => String)
  @Column()
  name: string

  @Field(() => String)
  @Column()
  email: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @DeleteDateColumn()
  deletedDate: Date
}

@InputType()
export class UserInput implements Pick<User, 'name' | 'email'> {
  @Field()
  name!: string

  @Field()
  email!: string
}
