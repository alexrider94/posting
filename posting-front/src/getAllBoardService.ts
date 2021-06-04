import { setupApi } from './setup';
import { gql } from '@apollo/client';

const client = setupApi();

export const getAllBoard = gql`
  query getAllBoard {
    getAllBoard: getAllBoard {
      no
      title
      b_content
      user {
        no
        id
        name
      }
      createdDate
    }
  }
`;

export const getAllBoardService = async () => {
  return await client.query({
    query: getAllBoard,
  });
};
