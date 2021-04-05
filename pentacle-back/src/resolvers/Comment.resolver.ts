import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from 'type-graphql';
import { Comment } from '../entity/Comment.entity';
import { CreateCommentInput } from '../inputs/CreateComment.input';
import { getManager, getRepository, In } from 'typeorm';
import * as queries from '../db/Query.database';
import { Loader } from 'type-graphql-dataloader';
import { User } from '../entity/User.entity';
import Dataloader from 'dataloader';
import { groupBy } from 'lodash';

@Resolver(Comment)
export class CommentResolver {
  @Query(() => [Comment])
  async getComment(@Arg('no') no: number) {
    return await getManager().query(queries.Q_GET_COMMENT, [no]);
  }

  @Mutation(() => Boolean)
  async createComment(@Arg('data') data: CreateCommentInput): Promise<Comment> {
    const res = await getManager().query(queries.Q_CREATE_COMMENT, [data.content, data.boardNo, data.userNo]);

    return res.affectedRows;
  }

  @FieldResolver()
  @Loader<number, User>(async (NOs, { context }) => {
    const user = await getRepository(User).find({
      where: { no: In([...NOs]) },
    });

    const userByNo = groupBy(user, 'no');
    return NOs.map((no) => userByNo[no] ?? []);
  })
  user(@Root() comment: Comment) {
    return async (dataloader: Dataloader<number, User>) => {
      let res = await dataloader.load(comment.userNo);
      return res[0];
    };
  }
}
