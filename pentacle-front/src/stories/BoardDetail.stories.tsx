import React from 'react';
import { Story, Meta } from '@storybook/react';

import { BoardDetail } from './BoardDetail';

export default {
  title: 'BoardPage/BoardDetail',
  component: BoardDetail,
} as Meta;

const Template: Story = () => <BoardDetail />;

export const boardDetail= Template.bind({});
