import React, { Suspense } from 'react';
import { Story, Meta } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import { Login } from './Login';

export default {
  title: 'LoginPage/Login',
  component: Login,
  decorators: [(storyFn) => <RecoilRoot><Suspense fallback={<div>Loading...</div>}>{storyFn()}</Suspense></RecoilRoot>],
} as Meta;

const Template: Story = () => <Login />;

export const login = Template.bind({});
