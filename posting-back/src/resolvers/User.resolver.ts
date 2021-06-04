import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from 'type-graphql';
import { User } from '../entity/User.entity';
import { CreateUserInput } from '../inputs/CreateUser.input';
import { getManager, getRepository, In } from 'typeorm';
import * as queries from '../db/Query.database';
import * as jwt from '../application/Jsonwebtoken.service';
import { Loader } from 'type-graphql-dataloader';
import { groupBy } from 'lodash';
import { Board } from '../entity/Board.entity';
import Dataloader from 'dataloader';

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users() {
    return await User.find();
  }

  @Query(() => User)
  async decodeUser(@Arg('token') token: string) {
    console.log(token);
    const res = await jwt.decodeToken(token);
    console.log(res);
    return res;
  }

  @Mutation(() => Boolean)
  async createUser(@Arg('data') data: CreateUserInput): Promise<Boolean> {
    const res = await getManager()
      .query(queries.Q_CREATE_USER, [data.id, data.pw, data.name])
      .catch((error) => {
        console.log(`deleteUser error : ${error}`);
        return false;
      });
    if (res.affectedRows > 0) return true;
    else return false;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('no') no: number) {
    try {
      const res = await getManager().query(queries.Q_DELETE_USER, [no]);
      if (res.affectedRows > 0) return true;
      else return false;
    } catch (error) {
      console.log(`deleteUser error : ${error}`);
      return false;
    }
  }

  @Mutation(() => String)
  async login(@Arg('id') id: string, @Arg('pw') pw: string) {
    const res = await getManager().query(queries.Q_LOGIN, [id, pw]);
    console.log(`login executed`);
    if (typeof res[0] == 'undefined') {
      return 'N_USER';
    } else {
      const user: String = JSON.stringify(res[0]);
      const token = jwt.getToken(user);
      return token;
    }
  }

  @FieldResolver()
  @Loader<number, Board[]>(async (NOs, { context }) => {
    const boards = await getRepository(Board).find({
      where: { user: { no: In([...NOs]) } },
    });

    const boardByNo = groupBy(boards, 'userNo');
    return NOs.map((no) => boardByNo[no] ?? []);
  })
  boards(@Root() user: User) {
    return async (dataloader: Dataloader<number, Board[]>) => {
      let res = await dataloader.load(user.no);
      return res;
    };
  }
}
