import { client } from './services/ApolloClient.option';

export const setupApi = (): any => {
  return client;
};
// export const setupApi = (): any => {};
