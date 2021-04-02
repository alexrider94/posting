import React from 'react';
import { Story, Meta } from '@storybook/react';

import { BoardCreate } from './BoardCreate';

export default {
  title: 'BoardPage/BoardCreate',
  component: BoardCreate,
} as Meta;

const Template: Story = () => <BoardCreate createBack/>;

export const boardCreate = Template.bind({});
