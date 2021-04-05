import React from 'react';
import { Story, Meta } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import {NotFound, NotPoundProps} from './NotFound';

export default {
  title: 'NotFoundPage/NotFound',
  component: NotFound,
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
} as Meta;

const Template: Story<NotPoundProps> = (args) => <NotFound {...args} />;

export const content = Template.bind({});

content.args = {content:"잘못된 경로입니다."}