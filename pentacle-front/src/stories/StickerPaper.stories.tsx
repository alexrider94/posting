import React from 'react';
import { Story, Meta } from '@storybook/react';

import { StickyPaper } from './StickyPaper';

export default {
  title: 'BoardPage/StickyPaper',
  component: StickyPaper,
} as Meta;

const Template: Story = () => <StickyPaper />;

export const stickerPaper= Template.bind({});
