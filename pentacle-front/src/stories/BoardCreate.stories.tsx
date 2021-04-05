import React, { Suspense } from 'react';
import { Story, Meta } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import { BoardCreate, BoardCreateProps} from './BoardCreate';

export default {
  title: 'BoardPage/BoardCreate',
  component: BoardCreate,
  decorators: [(storyFn) => <RecoilRoot><Suspense fallback={<div>Loading...</div>}>{storyFn()}</Suspense></RecoilRoot>],
} as Meta;

const Template: Story<BoardCreateProps> = () => <BoardCreate />;

export const boardCreate = Template.bind({});
