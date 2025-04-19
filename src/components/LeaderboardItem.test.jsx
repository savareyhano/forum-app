/**
 * skenario testing
 *
 * - LeaderboardItem component
 *   - should render user name and score correctly
 *   - should render user avatar correctly
 *   - should display "(Anda)" when authUser matches user.id
 *   - should not display "(Anda)" when authUser does not match user.id
 */

import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import LeaderboardItem from './LeaderboardItem';

expect.extend(matchers);

describe('LeaderboardItem component', () => {
  afterEach(() => {
    cleanup();
  });

  const mockUser = {
    id: 'user-123',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://example.com/avatar.jpg',
  };
  const mockScore = 100;

  it('should render user name and score correctly', async () => {
    // Arrange
    render(
      <LeaderboardItem user={mockUser} score={mockScore} authUser="user-abc" />
    );

    // Action
    const userNameElement = await screen.getByText('John Doe');
    const scoreElement = await screen.getByText('100');

    // Assert
    expect(userNameElement).toBeInTheDocument();
    expect(scoreElement).toBeInTheDocument();
  });

  it('should render user avatar correctly', async () => {
    // Arrange
    render(
      <LeaderboardItem user={mockUser} score={mockScore} authUser="user-abc" />
    );

    // Action
    const userAvatarElement = await screen.getByAltText('John Doe');

    // Assert
    expect(userAvatarElement).toBeInTheDocument();
    expect(userAvatarElement).toHaveAttribute(
      'src',
      'https://example.com/avatar.jpg'
    );
  });

  it('should display "(Anda)" when authUser matches user.id', async () => {
    // Arrange
    render(
      <LeaderboardItem user={mockUser} score={mockScore} authUser="user-123" />
    );

    // Action
    const currentUserIndicator = await screen.getByText('(Anda)');

    // Assert
    expect(currentUserIndicator).toBeInTheDocument();
  });

  it('should not display "(Anda)" when authUser does not match user.id', () => {
    // Arrange
    render(
      <LeaderboardItem user={mockUser} score={mockScore} authUser="user-abc" />
    );

    // Action
    const currentUserIndicator = screen.queryByText('(Anda)'); // Use queryByText as it might not be in the document

    // Assert
    expect(currentUserIndicator).not.toBeInTheDocument();
  });
});
