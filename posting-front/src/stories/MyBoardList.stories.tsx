import React from 'react';
import { Story, Meta } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import { MyBoardList } from './MyBoardList';

export default {
  title: 'BoardPage/MyBoardList',
  component: MyBoardList,
   decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
} as Meta;

const Template: Story = (args) => <MyBoardList {...args} />;

export const myboardList = Template.bind({});