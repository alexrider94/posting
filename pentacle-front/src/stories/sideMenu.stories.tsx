import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Register } from './Register';

export default {
  title: 'LoginPage/Register',
  component: Register,
} as Meta;

const Template: Story = () => <Register />;

export const register= Template.bind({});
