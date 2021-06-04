import React from 'react';
import { Story, Meta } from '@storybook/react';
import { BoardList,BoardListProps } from './BoardList';
import { RecoilRoot } from 'recoil';

export default {
  title: 'BoardPage/BoardList',
  component: BoardList,
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
} as Meta;

const Template: Story<BoardListProps> = (args) => <BoardList {...args}/>;

export const boardList= Template.bind({});
