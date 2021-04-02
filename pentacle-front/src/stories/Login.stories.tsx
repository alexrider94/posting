import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Login } from './Login';

export default {
  title: 'LoginPage/Login',
  component: Login,
} as Meta;

const Template: Story = () => <Login />;

export const login = Template.bind({});
