/**
 * skenario testing
 *
 * - NewThreadInput component
 * - should handle title typing correctly
 * - should handle category typing correctly
 * - should handle body typing correctly
 * - should call createThread function when button is clicked
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import NewThreadInput from './NewThreadInput';

expect.extend(matchers);

describe('NewThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // Arrange
    render(<NewThreadInput createThread={() => {}} />);
    const titleInput = await screen.getByPlaceholderText('Judul');

    // Action
    await userEvent.type(titleInput, 'Test Title');

    // Assert
    expect(titleInput).toHaveValue('Test Title');
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    render(<NewThreadInput createThread={() => {}} />);
    const categoryInput = await screen.getByPlaceholderText('Kategori');

    // Action
    await userEvent.type(categoryInput, 'Test Category');

    // Assert
    expect(categoryInput).toHaveValue('Test Category');
  });

  it('should handle body typing correctly', async () => {
    // Arrange
    const { container } = render(<NewThreadInput createThread={() => {}} />);
    const bodyInput = container.querySelector('.input-body');

    // Action
    await userEvent.type(bodyInput, 'Test Body Content');

    // Assert
    expect(bodyInput).toBeInTheDocument();
    expect(bodyInput).toHaveValue('Test Body Content');
  });

  it('should call createThread function when button is clicked', async () => {
    // Arrange
    const mockCreateThread = vi.fn();
    const { container } = render(
      <NewThreadInput createThread={mockCreateThread} />
    );
    const titleInput = await screen.getByPlaceholderText('Judul');
    await userEvent.type(titleInput, 'Test Title');
    const categoryInput = await screen.getByPlaceholderText('Kategori');
    await userEvent.type(categoryInput, 'Test Category');
    const bodyInput = container.querySelector('.input-body');
    await userEvent.type(bodyInput, 'Test Body Content');
    const createButton = await screen.getByRole('button', { name: 'Buat' });

    // Action
    await userEvent.click(createButton);

    // Assert
    expect(bodyInput).toBeInTheDocument();
    expect(mockCreateThread).toBeCalledWith({
      title: 'Test Title',
      category: 'Test Category',
      body: 'Test Body Content',
    });
  });
});
