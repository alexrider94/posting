import { gql } from '@apollo/client';
import { client } from './ApolloClient.option';

const LOGIN = async (userInfo: any) => {
  const res = await client.mutate({
    variables: { id: userInfo.id, pw: userInfo.pw },
    mutation: gql`
      mutation login($id: String!, $pw: String!) {
        login(id: $id, pw: $pw)
      }
    `,
  });

  if (res.data.login === 'N_USER') {
    return 'LOGIN FAIL';
  } else {
    localStorage.setItem('user', JSON.stringify(res.data.login));
    return res.data.login;
  }
};

const CREATE_USER = async (formInfo: any) => {
  const res = await client.mutate({
    variables: { id: formInfo.id, pw: formInfo.pw, name: formInfo.name },
    mutation: gql`
      mutation createUser($id: String!, $pw: String!, $name: String!) {
        createUser(data: { id: $id, pw: $pw, name: $name })
      }
    `,
  });
  if (res.data.createUser === false) {
    return 'ERROR_OCCURED';
  } else if (res.data.createUser === 'true') {
    return 'SUCCESS';
  }
};

const LOGOUT = () => {
  localStorage.removeItem('user');
};

const GET_USER_INFO = async () => {
  const token = localStorage.getItem('user') || {};
  if (Object.keys(token).length === 0) return false;
  const userInfo = await DECODE_TOKEN(token);
  return userInfo.decodeUser;
};

const GET_ALL_BOARD = async () => {
  const res = await client.query({
    query: gql`
      query getAllBoard {
        getAllBoard {
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
    `,
  });
  return res.data.getAllBoard;
};

const GET_BOARD_INFO = async (no: any) => {
  const num = parseInt(no.currentBoardNo);
  if (num === -1) return 'error';
  const res = await client.query({
    variables: { no: num },
    query: gql`
      query getBoardInfo($no: Float!) {
        getBoardInfo(no: $no) {
          title
          b_content
          createdDate
          modifiedDate
          user {
            no
            id
            name
          }
          comments {
            c_content
            no
            userNo
            createdDate
            user {
              name
            }
          }
        }
      }
    `,
  });
  console.log(res);
  return res.data.getBoardInfo;
};

const CREATE_BOARD = async (boardInfo: any) => {
  const userNo = parseInt(boardInfo.no);
  const res = await client.mutate({
    variables: { title: boardInfo.title, b_content: boardInfo.content, userNo: userNo },
    mutation: gql`
      mutation createBoard($title: String!, $b_content: String!, $userNo: Float!) {
        createBoard(data: { title: $title, b_content: $b_content, userNo: $userNo })
      }
    `,
  });
  return res.data.createBoard;
};

const DELETE_BOARD = async (boardInfo: any) => {
  const boardNo = parseInt(boardInfo.boardNo);
  await client.mutate({
    variables: { no: boardNo },
    mutation: gql`
      mutation deleteBoard($no: Float!) {
        deleteBoard(no: $no)
      }
    `,
  });
};

const DECODE_TOKEN = async (token: any) => {
  let tokenData = token;
  const res = await client.query({
    variables: { token: tokenData },
    query: gql`
      query decodeUser($token: String!) {
        decodeUser(token: $token) {
          no
          name
          id
          createdDate
          modifiedDate
        }
      }
    `,
  });
  return res.data;
};

const DELETE_USER = async (data: any) => {
  const userNo = parseInt(data.userNo);
  const res = await client.mutate({
    variables: { no: userNo },
    mutation: gql`
      mutation deleteUser($no: Float!) {
        deleteUser(no: $no)
      }
    `,
  });
  return res.data.deleteUser;
};

const GET_MYBOARD = async (data: any) => {
  console.log(data);
  const userNo = parseInt(data.userNo);
  const res = await client.query({
    variables: { userNo: userNo },
    query: gql`
      query getMyBoard($userNo: Float!) {
        getMyBoard(userNo: $userNo) {
          no
          title
          b_content
          createdDate
        }
      }
    `,
  });
  return res.data.getMyBoard;
};

const CREATE_COMMENT = async (data: any) => {
  const boardNo = parseInt(data.boardNo);
  const userNo = parseInt(data.userNo);
  const res = await client.mutate({
    variables: { content: data.content, boardNo: boardNo, userNo: userNo },
    mutation: gql`
      mutation createComment($content: String!, $boardNo: Float!, $userNo: Float!) {
        createComment(data: { content: $content, boardNo: $boardNo, userNo: $userNo })
      }
    `,
  });
  return res.data.createComment;
};

export {
  LOGIN,
  LOGOUT,
  GET_USER_INFO,
  GET_ALL_BOARD,
  GET_BOARD_INFO,
  CREATE_BOARD,
  DELETE_BOARD,
  DECODE_TOKEN,
  CREATE_USER,
  DELETE_USER,
  GET_MYBOARD,
  CREATE_COMMENT,
};
