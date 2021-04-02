import React from 'react';
import { Story, Meta } from '@storybook/react';

import { BoardList } from './BoardList';

export default {
  title: 'BoardPage/BoardList',
  component: BoardList,
} as Meta;

const Template: Story = () => <BoardList />;

export const boardList= Template.bind({});
