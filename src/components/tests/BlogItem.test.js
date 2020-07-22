import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogItem from '../BlogItem';

let component;

const blog = {
  author: 'Fake Author Name',
  id: '123',
  like: 0,
  title: 'Fake Blog Title',
  url: 'www.fakeblog.com',
  user: {
    id: '456',
    name: 'Fake Publisher Name',
    username: 'Fake Username',
  },
};

beforeEach(() => {
  component = render(<BlogItem blog={blog} />);
});

test('renders content', () => {
  expect(component.container).toHaveTextContent(
    'Fake Author Name',
    'Fake Blog Title'
  );
});

test('at start the children are not displayed', () => {
  const div = component.container.querySelector('.Blog-Details');

  expect(div).toHaveStyle('display: none');
});

test('Details of Blog shown upon click', () => {
  const button = component.getByText('view');
  fireEvent.click(button);

  const div = component.container.querySelector('.Blog-Details');

  expect(div).not.toHaveStyle('display: "none"');
});

test('Clicking the "LIKE" button twice, calls event handler twice', () => {
  const mockHandler = jest.fn();

  component = render(<BlogItem blog={blog} addLikes={mockHandler} />);

  const button = component.container.querySelector('.like-button');

  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
