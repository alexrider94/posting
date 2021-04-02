import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, RelationId } from 'typeorm';
import { TypeormLoader } from 'type-graphql-dataloader';
import { Comment } from './Comment.entity';
import { User } from './User.entity';

@ObjectType()
@Entity()
export class Board extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  no: number;

  @Field()
  @Column('varchar')
  title: string;

  @Field()
  @Column('varchar')
  b_content: string;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  createdDate: string;

  @Field({ nullable: true })
  @Column('datetime', { nullable: true })
  modifiedDate?: string;

  @Field((type) => [Comment])
  @OneToMany((type) => Comment, (comment) => comment.board)
  @TypeormLoader((type) => Comment, (board: Board) => board.comments)
  comments!: Comment[];

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.no, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @TypeormLoader((type) => User, (board: Board) => board.user)
  user: User;

  @RelationId((board: Board) => board.user)
  userNo: number;
}
