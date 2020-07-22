import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from '../BlogForm';

let component;

beforeEach(() => {
  component = render(<BlogForm />);
});

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const mockHandler = jest.fn();

  component = render(<BlogForm createNewBlogPost={mockHandler} />);

  const author = component.container.querySelector('#author');
  const form = component.container.querySelector('.Blog-Form');

  fireEvent.change(author, {
    target: { value: 'Ronald Authorson' },
  });
  fireEvent.submit(form);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].author).toBe('Ronald Authorson');
});
