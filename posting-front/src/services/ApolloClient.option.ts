import { ApolloClient, DefaultOptions, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import fetch from 'cross-fetch';
/**
 * ApolloClient API options
 */
const PORT: number = 50002;
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
  link: new HttpLink({ uri: `http://localhost:${PORT}/graphql`, fetch }),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});
