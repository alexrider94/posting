import React from 'react';
import { Story, Meta } from '@storybook/react';
import { BoardDetail,BoardDetailProps } from './BoardDetail';
import { RecoilRoot } from 'recoil';

export default {
  title: 'BoardPage/BoardDetail',
  component: BoardDetail,
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
} as Meta;

const Template: Story<BoardDetailProps> = () => <BoardDetail />;

export const boardDetail= Template.bind({});
