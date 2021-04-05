import React, { Suspense } from 'react';
import { Story, Meta } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import { UserInfo ,UserInfoProps} from './UserInfo';

export default {
  title: 'BoardPage/UserInfo',
  component: UserInfo,
  decorators: [(storyFn) => <RecoilRoot><Suspense fallback={<div>Loading...</div>}>{storyFn()}</Suspense></RecoilRoot>],
} as Meta;

const Template: Story<UserInfoProps> = () => <UserInfo />;

export const userInfo= Template.bind({});
