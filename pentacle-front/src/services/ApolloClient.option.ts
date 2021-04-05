import { ApolloClient, DefaultOptions, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

/**
 * ApolloClient API options
 */
const PORT: number = 50002;
const apiUrl: string = `http://localhost:${PORT}/graphql`;
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

/**
 * Apollo Client
 */
export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});
