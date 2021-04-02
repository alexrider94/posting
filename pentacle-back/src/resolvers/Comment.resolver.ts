import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Comment } from '../entity/Comment.entity';
import { CreateCommentInput } from '../inputs/CreateComment.input';
import { getManager } from 'typeorm';
import * as queries from '../db/Query.database';

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
}
