import React, { Suspense } from 'react';
import { Story, Meta } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import { Register } from './Register';

export default {
  title: 'LoginPage/Register',
  component: Register,
   decorators: [(storyFn) => <RecoilRoot><Suspense fallback={<div>Loading...</div>}>{storyFn()}</Suspense></RecoilRoot>],
} as Meta;

const Template: Story = () => <Register />;

export const register= Template.bind({});
