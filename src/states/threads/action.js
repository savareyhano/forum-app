import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  UPVOTE_THREAD: 'UPVOTE_THREAD',
  DOWNVOTE_THREAD: 'DOWNVOTE_THREAD',
  NEUTRALIZE_VOTE_THREAD: 'NEUTRALIZE_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function upvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralizeVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncCreateThread({ title, category, body }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.createThread({ title, body, category });
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    const userId = authUser.id;

    const threadExist = threads.find((thread) => thread.id === threadId);

    if (!threadExist) {
      alert('Thread not found.');
      return;
    }

    const isDownvotedBefore = threadExist.downVotesBy.includes(userId);

    dispatch(upvoteThreadActionCreator({ threadId, userId }));
    dispatch(showLoading());

    try {
      await api.upvoteThread(threadId);
    } catch (error) {
      alert(error.message);
      if (isDownvotedBefore) {
        dispatch(downvoteThreadActionCreator({ threadId, userId }));
      } else {
        dispatch(neutralizeVoteThreadActionCreator({ threadId, userId }));
      }
    }

    dispatch(hideLoading());
  };
}

function asyncDownvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    const userId = authUser.id;

    const threadExist = threads.find((thread) => thread.id === threadId);

    if (!threadExist) {
      alert('Thread not found.');
      return;
    }

    const isUpvotedBefore = threadExist.upVotesBy.includes(userId);

    dispatch(downvoteThreadActionCreator({ threadId, userId }));
    dispatch(showLoading());

    try {
      await api.downvoteThread(threadId);
    } catch (error) {
      alert(error.message);
      if (isUpvotedBefore) {
        dispatch(upvoteThreadActionCreator({ threadId, userId }));
      } else {
        dispatch(neutralizeVoteThreadActionCreator({ threadId, userId }));
      }
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    const userId = authUser.id;

    const threadExist = threads.find((thread) => thread.id === threadId);

    if (!threadExist) {
      alert('Thread not found.');
      return;
    }

    const isUpvotedBefore = threadExist.upVotesBy.includes(userId);
    const isDownvotedBefore = threadExist.downVotesBy.includes(userId);

    dispatch(neutralizeVoteThreadActionCreator({ threadId, userId }));
    dispatch(showLoading());

    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      if (isUpvotedBefore) {
        dispatch(upvoteThreadActionCreator({ threadId, userId }));
      } else if (isDownvotedBefore) {
        dispatch(downvoteThreadActionCreator({ threadId, userId }));
      }
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  upvoteThreadActionCreator,
  downvoteThreadActionCreator,
  neutralizeVoteThreadActionCreator,
  asyncCreateThread,
  asyncUpvoteThread,
  asyncDownvoteThread,
  asyncNeutralizeVoteThread,
};
