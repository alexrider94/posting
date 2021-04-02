import React from 'react';
import { Story, Meta } from '@storybook/react';

import { UserInfo } from './UserInfo';

export default {
  title: 'BoardPage/UserInfo',
  component: UserInfo,
} as Meta;

const Template: Story = () => <UserInfo />;

export const userInfo= Template.bind({});
