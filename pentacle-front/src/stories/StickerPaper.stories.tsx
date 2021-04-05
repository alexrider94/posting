import React from 'react';
import { Story, Meta } from '@storybook/react';
import { StickyPaper, StickyPaperProps } from './StickyPaper';
import { RecoilRoot } from 'recoil';

export default {
  title: 'BoardPage/StickyPaper',
  component: StickyPaper,
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
  argTypes: {
    randNo: {control: {type:'radio', options:[0,1,2,3,4]},defaultValue:0},
    onClick:{action: 'clicked'}
  }
} as Meta;

const Template: Story<StickyPaperProps> = (args) => <StickyPaper {...args}/>;

export const stickerPaper= Template.bind({});

stickerPaper.args = {
  value: {
    no: 1,
    b_content:"TEST",
    title:"TEST",
    createdDate:`${new Date().getTime()}`,
    user:{
      no:1,
      id:"test",
      name:"test",
    }
  },
}