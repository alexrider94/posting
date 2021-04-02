import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:50002/graphql',
  cache: new InMemoryCache(),
});

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

const GET_USER_INFO = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
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
        }
      }
    `,
  });
  return res.data.getAllBoard;
};

const GET_BOARD_INFO = async (no: any) => {
  const res = await client.query({
    variables: { no: no },
    query: gql`
      query getBoardInfo($no: Number!) {
        getBoardInfo(no: $no) {
          title
          b_content
          createdDate
          modifiedDate
          user {
            id
            boards {
              no
              title
            }
          }
          comments {
            c_content
            no
            userNo
            createdDate
          }
        }
      }
    `,
  });
  return res.data;
};

const CREATE_BOARD = async (boardInfo: any) => {
  const res = await client.mutate({
    variables: { title: boardInfo.title, b_content: boardInfo.cotent, userNo: boardInfo.no },
    mutation: gql`
      mutation createBoard($title: String!, $b_content: String!, $userNo: Number!) {
        createBoard(data: { title: $title, b_content: $b_content, userNo: $userNo })
      }
    `,
  });
  return res.data.createBoard;
};

const DELETE_BOARD = async (boardInfo: any) => {
  const res = await client.mutate({
    variables: { no: boardInfo.boardNo },
    mutation: gql`
      mutation deleteBoard($no: Number!) {
        deleteBoard(no: $no)
      }
    `,
  });
};

const DECODE_TOKEN = async (token: any) => {
  let tokenData = token.token.slice(1, token.token.length - 1);
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
  console.log(data);
  const res = await client.mutate({
    variables: { no: data.userNo },
    mutation: gql`
      mutation deleteUser($no: Number!) {
        deleteUser(no: $no)
      }
    `,
  });
  return res.data.deleteUser;
};

const GET_MYBOARD = async (data: any) => {
  const res = await client.query({
    variables: { userNo: data.userNo },
    query: gql`
      query getMyBoard($userNo: Number!) {
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
  const res = await client.mutate({
    variables: { content: data.content, boardNo: data.boardNo, userNo: data.userNo },
    mutation: gql`
      mutation createComment($content: String!, $boardNo: Number!, $userNo: Number!) {
        createComment(data: { content: $content, boardNo: $boardNo, userNo: $userNo })
      }
    `,
  });
  return res.data;
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
