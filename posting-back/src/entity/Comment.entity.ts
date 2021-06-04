import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, RelationId } from 'typeorm';
import { Board } from './Board.entity';
import { User } from './User.entity';

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  no: number;

  @Field()
  @Column('varchar')
  c_content: string;

  @Field()
  @Column('int')
  userNo: number;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  createdDate: string;

  @Field({ nullable: true })
  @Column('datetime', { nullable: true })
  modifiedDate?: string;

  @Field((type) => Board)
  @ManyToOne((type) => Board, (board) => board.no, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  board: Board;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.no, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user: User;

  @RelationId((comment: Comment) => comment.board)
  boardNo: number[];
}
