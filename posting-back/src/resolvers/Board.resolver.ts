import { Resolver, Query, Mutation, Arg, Int, FieldResolver, Root } from 'type-graphql';
import { CreateBoardInput } from '../inputs/CreateBoard.input';
import { getManager, getRepository, In } from 'typeorm';
import * as queries from '../db/Query.database';
import { Board } from '../entity/Board.entity';
import { User } from '../entity/User.entity';
import { Comment } from '../entity/Comment.entity';
import { Loader } from 'type-graphql-dataloader';
import Dataloader from 'dataloader';
import { groupBy } from 'lodash';

@Resolver(Board)
export class BoardResolver {
  @Query(() => [Board])
  async getAllBoard() {
    return await Board.find();
  }

  @Query(() => Board)
  async getBoardInfo(@Arg('no') no: number) {
    const res = await getManager().query(queries.Q_GET_BOARD_INFO, [no]);
    if (typeof res[0] == 'undefined') {
      return 'N_BOARD';
    }
    return res[0];
  }

  @Mutation(() => Int)
  async createBoard(@Arg('data') data: CreateBoardInput): Promise<Board> {
    const res = await getManager().query(queries.Q_CREATE_BOARD, [data.title, data.b_content, data.userNo]);

    return res.affectedRows;
  }

  @Mutation(() => Boolean)
  async deleteBoard(@Arg('no') no: number) {
    const res = await getManager().query(queries.Q_DELETE_BOARD, [no]);
    if (res.affectedRows > 0) return true;
    else return false;
  }

  @Query(() => [Board])
  async getMyBoard(@Arg('userNo') userNo: number) {
    const res = await getManager().query(queries.Q_GET_MYBOARD, [userNo]);
    return res;
  }

  @FieldResolver()
  @Loader<number, User>(async (NOs, { context }) => {
    const user = await getRepository(User).find({
      where: { no: In([...NOs]) },
    });

    const userByNo = groupBy(user, 'no');
    return NOs.map((no) => userByNo[no] ?? []);
  })
  user(@Root() board: Board) {
    return async (dataloader: Dataloader<number, User>) => {
      let res = await dataloader.load(board.userNo);
      return res[0];
    };
  }

  @FieldResolver()
  @Loader<number, Comment[]>(async (NOs, { context }) => {
    const comments = await getRepository(Comment).find({
      where: { board: { no: In([...NOs]) } },
    });

    const commentByNo = groupBy(comments, 'boardNo');
    return NOs.map((no) => commentByNo[no] ?? []);
  })
  comments(@Root() board: Board) {
    return async (dataloader: Dataloader<number, Comment[]>) => {
      let res = await dataloader.load(board.no);
      return res;
    };
  }
}
