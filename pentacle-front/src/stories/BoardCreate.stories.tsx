import React, { Suspense } from 'react';
import { Story, Meta } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import { BoardCreate, BoardCreateProps} from './BoardCreate';
import { gql } from '@apollo/client';

export default {
  title: 'BoardPage/BoardCreate',
  component: BoardCreate,
  decorators: [(storyFn) => <RecoilRoot><Suspense fallback={<div>Loading...</div>}>{storyFn()}</Suspense></RecoilRoot>],
} as Meta;

const Template: Story<BoardCreateProps> = () => <BoardCreate />;
export const boardCreate= Template.bind({});

boardCreate.parameters = {
  apolloClient: {
    // do not put MockedProvider here, you can, but its preferred to do it in preview.js
    mocks: [
      {
        request: {
          query: gql`query test{}`,
        },
        result: {
          data: {
            viewer: null,
          },
        },
      },
    ],
  },
};

// boardCreate.parameters = {
//   apolloCilent: {
//     mocks: [
//       {
//         request: {
//           variables: {
//             no: 53
//           },
//           query: gql`
//             query getBoardInfo($no: Float!) {
//               getBoardInfo(no: $no) {
//                 title
//                 b_content
//                 createdDate
//                 modifiedDate
//                 user {
//                   no
//                   id
//                   name
//                 }
//                 comments {
//                   c_content
//                   no
//                   userNo
//                   createdDate
//                   user {
//                     name
//                   }
//                 }
//               }
//             }
//           `,
//         },
//         result: {
//           data: {
//             getBoardInfo: {
//               title:"1234",
//               b_content:"12333",
//               comments:[
//                 {
//                   c_content:"123",
//                   no:"22",
//                   userNo:8,
//                   createdDate:"1617428578000"
//                 }
//               ],
//               createdDate:'1617428575000',
//               user:{
//                 no:"8",
//                 id:"test1234"
//               }
//             },
//           }
//         }
//       }
//     ]
//   }
// }