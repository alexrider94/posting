import { ObjectType, Field, ID } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, RelationId } from 'typeorm';
import { Board } from './Board.entity';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  no: number;

  @Field()
  @Column('varchar', { unique: true })
  id: string;

  @Column('varchar')
  pw: string;

  @Field({ nullable: true })
  @Column('varchar', { nullable: true })
  name?: string;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  createdDate: string;

  @Field({ nullable: true })
  @Column('datetime', { nullable: true })
  modifiedDate?: string;

  @Field((type) => [Board])
  @OneToMany((type) => Board, (board) => board.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @TypeormLoader((type) => Board, (user: User) => user.boards)
  boards: Board[];

  @RelationId((user: User) => user.boards)
  boardNos: number[];
}
