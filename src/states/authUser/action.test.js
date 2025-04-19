/**
 * skenario test
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed (login)
 *  - should dispatch action and call alert correctly when data fetching failed (getOwnProfile)
 *
 * - asyncUnsetAuthUser thunk
 *  - should dispatch action correctly and clear access token
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action';

const fakeTokenResponse = 'fake-token';
const fakeAuthUserResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};
const fakeErrorResponse = new Error('Ups, something went wrong');
const fakeLoginInput = { email: 'john@example.com', password: 'password123' };

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
    api._putAccessToken = api.putAccessToken;
  });

  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;
    api.putAccessToken = api._putAccessToken;

    delete api._login;
    delete api._getOwnProfile;
    delete api._putAccessToken;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.resolve(fakeTokenResponse);
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);
    api.putAccessToken = vi.fn();
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser(fakeLoginInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeTokenResponse);
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeAuthUserResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed (login)', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.reject(fakeErrorResponse);
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);
    api.putAccessToken = vi.fn();
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();

    // action
    await asyncSetAuthUser(fakeLoginInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).not.toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeAuthUserResponse)
    );
    expect(api.putAccessToken).not.toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed (getOwnProfile)', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.resolve(fakeTokenResponse);
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
    api.putAccessToken = vi.fn();
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();

    // action
    await asyncSetAuthUser(fakeLoginInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeTokenResponse);
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).not.toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeAuthUserResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  beforeEach(() => {
    api._putAccessToken = api.putAccessToken;
  });

  afterEach(() => {
    api.putAccessToken = api._putAccessToken;
    delete api._putAccessToken;
  });

  it('should dispatch action correctly and clear access token', () => {
    // arrange
    // mock dispatch
    const dispatch = vi.fn();
    // mock putAccessToken
    api.putAccessToken = vi.fn();

    // action
    asyncUnsetAuthUser()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(api.putAccessToken).toHaveBeenCalledWith('');
  });
});
