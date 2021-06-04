import React, { Suspense } from 'react';
import { Story, Meta } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import SideMenu, { SideMenuProps } from './SideMenu';

export default {
  title: 'BoardPage/SideMenu',
  component: SideMenu,
  decorators: [(storyFn) => <RecoilRoot><Suspense fallback={<div>Loading...</div>}>{storyFn()}</Suspense></RecoilRoot>],
} as Meta;

const Template: Story<SideMenuProps> = () => <SideMenu />;

export const register= Template.bind({});
