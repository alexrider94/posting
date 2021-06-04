import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { mariaDB } from './db/MariaDB.database';
import { ApplicationService, GraphQLService } from './application/Application.service';
import { ApolloServer } from 'apollo-server-express';

class Service {
  private readonly _express: express.Application;
  private readonly _appSerivce: Map<string, ApplicationService>;
  private readonly _ApolloServer: ApolloServer;

  get express(): express.Application {
    return this._express;
  }

  get appServices(): Map<string, ApplicationService> {
    return this._appSerivce;
  }

  constructor() {
    this._express = express();
    this._appSerivce = new Map<string, ApplicationService>();
    this._ApolloServer = new GraphQLService().apolloServer;
    this.setUp();
  }

  public setUp(): void {
    this.setApplicationServices();
    this.setMiddleWares();
    this.setGraphqlApollo();
  }

  protected setApplicationServices() {
    this._appSerivce.set('db', new mariaDB().connection());
    this._appSerivce.set('graphql', new GraphQLService());
  }

  public setGraphqlApollo(): void {
    this._ApolloServer.applyMiddleware({ app: this._express, path: '/graphql' });
  }

  private setMiddleWares(): void {
    this._express.use(cors());
    this._express.use(morgan('dev'));
    // this._express.use(helmet());
  }
}

export default new Service();
