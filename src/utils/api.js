const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  async function _fetchWithAuth(url, options = {}) {
    const token = getAccessToken();

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
  }

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;
    return user;
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { token },
    } = responseJson;
    return token;
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      if (response.status === 401) {
        putAccessToken('');
      }
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;
    return user;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { users },
    } = responseJson;
    return users;
  }

  async function createThread({ title, body, category = '' }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        ...(category && { category }),
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { thread },
    } = responseJson;
    return thread;
  }

  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { threads },
    } = responseJson;
    return threads;
  }

  async function getThreadDetail(threadId) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`);

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { detailThread },
    } = responseJson;
    return detailThread;
  }

  async function createComment({ threadId, content }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
        }),
      }
    );

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { comment },
    } = responseJson;
    return comment;
  }

  async function _vote({ endpoint }) {
    const response = await _fetchWithAuth(endpoint, {
      method: 'POST',
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { vote },
    } = responseJson;
    return vote;
  }

  async function upvoteThread(threadId) {
    return _vote({ endpoint: `${BASE_URL}/threads/${threadId}/up-vote` });
  }

  async function downvoteThread(threadId) {
    return _vote({ endpoint: `${BASE_URL}/threads/${threadId}/down-vote` });
  }

  async function neutralizeVoteThread(threadId) {
    return _vote({ endpoint: `${BASE_URL}/threads/${threadId}/neutral-vote` });
  }

  async function upvoteComment(threadId, commentId) {
    return _vote({
      endpoint: `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
    });
  }

  async function downvoteComment(threadId, commentId) {
    return _vote({
      endpoint: `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
    });
  }

  async function neutralizeVoteComment(threadId, commentId) {
    return _vote({
      endpoint: `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
    });
  }

  async function getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { leaderboards },
    } = responseJson;
    return leaderboards;
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    createThread,
    getAllThreads,
    getThreadDetail,
    createComment,
    upvoteThread,
    downvoteThread,
    neutralizeVoteThread,
    upvoteComment,
    downvoteComment,
    neutralizeVoteComment,
    getLeaderboards,
  };
})();

export default api;
