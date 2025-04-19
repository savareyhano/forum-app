import React from 'react';
import { action } from '@storybook/addon-actions';
import LoginInput from '../components/LoginInput';

import '../styles/style.css';

const story = {
  title: 'LoginInput',
  component: LoginInput,
  tags: ['autodocs'],
};

export default story;

const TemplateStory = (args) => <LoginInput {...args} />;

const Default = TemplateStory.bind({});
Default.args = {
  login: action('login'),
};

export { Default };
