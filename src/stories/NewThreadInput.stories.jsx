import React from 'react';
import { action } from '@storybook/addon-actions';
import NewThreadInput from '../components/NewThreadInput';

import '../styles/style.css';

const story = {
  title: 'NewThreadInput',
  component: NewThreadInput,
  tags: ['autodocs'],
};

export default story;

const TemplateStory = (args) => <NewThreadInput {...args} />;

const Default = TemplateStory.bind({});
Default.args = {
  createThread: action('createThread'),
};

export { Default };
