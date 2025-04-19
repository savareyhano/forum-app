/**
 * skenario test
 *
 * - asyncRegisterUser thunk
 *  - should dispatch loading actions correctly when data fetching success
 *  - should dispatch loading actions and call alert correctly when data fetching failed
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncRegisterUser } from './action';

const fakeRegisterInput = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
};

// The API returns user data on success, but the thunk doesn't use it.
// We just need to know if it resolved or rejected.
const fakeRegisterSuccessResponse = {};
const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api.register = api._register;
    delete api._register;
  });

  it('should dispatch loading actions correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.resolve(fakeRegisterSuccessResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert (should not be called)
    window.alert = vi.fn();

    // action
    await asyncRegisterUser(fakeRegisterInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).not.toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch loading actions and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();

    // action
    await asyncRegisterUser(fakeRegisterInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
