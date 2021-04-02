import React from 'react';
import { Story, Meta } from '@storybook/react';

import { MyBoardList } from './MyBoardList';

export default {
  title: 'BoardPage/MyBoardList',
  component: MyBoardList,
} as Meta;

const Template: Story = (args) => <MyBoardList {...args} />;

export const myboardList = Template.bind({});