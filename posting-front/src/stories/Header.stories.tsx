import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Header } from './Header';

export default {
  title: 'Common/Header',
  component: Header,
} as Meta;

const Template: Story = () => <Header />;

export const header = Template.bind({});
