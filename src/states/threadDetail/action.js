import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  UPVOTE_THREAD_DETAIL: 'UPVOTE_THREAD_DETAIL',
  DOWNVOTE_THREAD_DETAIL: 'DOWNVOTE_THREAD_DETAIL',
  NEUTRALIZE_VOTE_THREAD_DETAIL: 'NEUTRALIZE_VOTE_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  UPVOTE_COMMENT: 'UPVOTE_COMMENT',
  DOWNVOTE_COMMENT: 'DOWNVOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function upvoteThreadDetailActionCreator({ userId }) {
  return {
    type: ActionType.UPVOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function downvoteThreadDetailActionCreator({ userId }) {
  return {
    type: ActionType.DOWNVOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function neutralizeVoteThreadDetailActionCreator({ userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function upvoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UPVOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downvoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWNVOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralizeVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const threadDetail = await api.getThreadDetail(threadId);

      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpvoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const userId = authUser.id;

    if (!threadDetail) {
      alert('Thread not found.');
      return;
    }

    const isDownvotedBefore = threadDetail.downVotesBy.includes(userId);

    dispatch(upvoteThreadDetailActionCreator({ userId }));
    dispatch(showLoading());
    try {
      await api.upvoteThread(threadId);
    } catch (error) {
      alert(error.message);
      if (isDownvotedBefore) {
        dispatch(downvoteThreadDetailActionCreator({ userId }));
      } else {
        dispatch(neutralizeVoteThreadDetailActionCreator({ userId }));
      }
    }

    dispatch(hideLoading());
  };
}

function asyncDownvoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const userId = authUser.id;

    if (!threadDetail) {
      alert('Thread not found.');
      return;
    }

    const isUpvotedBefore = threadDetail.upVotesBy.includes(userId);

    dispatch(downvoteThreadDetailActionCreator({ userId }));
    dispatch(showLoading());
    try {
      await api.downvoteThread(threadId);
    } catch (error) {
      alert(error.message);
      if (isUpvotedBefore) {
        dispatch(upvoteThreadDetailActionCreator({ userId }));
      } else {
        dispatch(neutralizeVoteThreadDetailActionCreator({ userId }));
      }
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const userId = authUser.id;

    if (!threadDetail) {
      alert('Thread not found.');
      return;
    }

    const isUpvotedBefore = threadDetail.upVotesBy.includes(userId);
    const isDownvotedBefore = threadDetail.downVotesBy.includes(userId);

    dispatch(neutralizeVoteThreadDetailActionCreator({ userId }));
    dispatch(showLoading());
    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      if (isUpvotedBefore) {
        dispatch(upvoteThreadDetailActionCreator({ userId }));
      } else if (isDownvotedBefore) {
        dispatch(downvoteThreadDetailActionCreator({ userId }));
      }
    }

    dispatch(hideLoading());
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch, getState) => {
    const { threadDetail } = getState();

    if (!threadDetail) {
      alert('Thread not found.');
      return;
    }

    dispatch(showLoading());

    try {
      const comment = await api.createComment({ threadId, content });

      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpvoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    if (!threadDetail) {
      alert('Thread not found.');
      return;
    }

    const commentExist = threadDetail.comments.find(
      (comment) => comment.id === commentId
    );

    if (!commentExist) {
      alert('Comment not found.');
      return;
    }

    const userId = authUser.id;
    const threadId = threadDetail.id;
    const isDownvotedBefore = commentExist.downVotesBy.includes(userId);

    dispatch(upvoteCommentActionCreator({ commentId, userId }));
    dispatch(showLoading());
    try {
      await api.upvoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      if (isDownvotedBefore) {
        dispatch(downvoteCommentActionCreator({ commentId, userId }));
      } else {
        dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));
      }
    }

    dispatch(hideLoading());
  };
}

function asyncDownvoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    if (!threadDetail) {
      alert('Thread not found.');
      return;
    }

    const commentExist = threadDetail.comments.find(
      (comment) => comment.id === commentId
    );

    if (!commentExist) {
      alert('Comment not found.');
      return;
    }

    const userId = authUser.id;
    const threadId = threadDetail.id;
    const isUpvotedBefore = commentExist.upVotesBy.includes(userId);

    dispatch(downvoteCommentActionCreator({ commentId, userId }));
    dispatch(showLoading());
    try {
      await api.downvoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      if (isUpvotedBefore) {
        dispatch(upvoteCommentActionCreator({ commentId, userId }));
      } else {
        dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));
      }
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    if (!threadDetail) {
      alert('Thread not found.');
      return;
    }

    const commentExist = threadDetail.comments.find(
      (comment) => comment.id === commentId
    );

    if (!commentExist) {
      alert('Comment not found.');
      return;
    }

    const userId = authUser.id;
    const threadId = threadDetail.id;
    const isUpvotedBefore = commentExist.upVotesBy.includes(userId);
    const isDownvotedBefore = commentExist.downVotesBy.includes(userId);

    dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));
    dispatch(showLoading());
    try {
      await api.neutralizeVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      if (isUpvotedBefore) {
        dispatch(upvoteCommentActionCreator({ commentId, userId }));
      } else if (isDownvotedBefore) {
        dispatch(downvoteCommentActionCreator({ commentId, userId }));
      }
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  upvoteThreadDetailActionCreator,
  downvoteThreadDetailActionCreator,
  neutralizeVoteThreadDetailActionCreator,
  upvoteCommentActionCreator,
  downvoteCommentActionCreator,
  neutralizeVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncUpvoteThreadDetail,
  asyncDownvoteThreadDetail,
  asyncNeutralizeVoteThreadDetail,
  asyncAddComment,
  asyncUpvoteComment,
  asyncDownvoteComment,
  asyncNeutralizeVoteComment,
};
