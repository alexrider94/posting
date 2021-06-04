import { GraphQLSchema } from 'graphql';
import { buildSchemaSync } from 'type-graphql';
import { UserResolver } from '../resolvers/User.resolver';
import { BoardResolver } from '../resolvers/Board.resolver';
import { CommentResolver } from '../resolvers/Comment.resolver';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerLoaderPlugin } from 'type-graphql-dataloader';
import { getConnection } from 'typeorm';

export interface ApplicationService {}

export class GraphQLService implements ApplicationService {
  protected schema: GraphQLSchema;
  private readonly _ApolloServer: ApolloServer;

  public constructor() {
    const schema = buildSchemaSync({
      resolvers: [UserResolver, BoardResolver, CommentResolver],
      validate: false,
    });

    this._ApolloServer = new ApolloServer({
      schema,
      plugins: [
        ApolloServerLoaderPlugin({
          typeormGetConnection: getConnection,
        }),
      ],
    });
  }

  static getSchema(): GraphQLSchema {
    return buildSchemaSync({
      resolvers: [UserResolver],
    });
  }

  static getType(): string {
    return 'UserService';
  }

  get apolloServer(): ApolloServer {
    return this._ApolloServer;
  }
}
