import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.CLEAR_THREAD_DETAIL:
    return null;
  case ActionType.UPVOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      // Add user to the upVotesBy list in the threadDetail state
      upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
        ? threadDetail.upVotesBy
        : threadDetail.upVotesBy.concat(action.payload.userId),
      // Remove user from the downVotesBy list in the threadDetail state
      downVotesBy: threadDetail.downVotesBy.filter(
        (id) => id !== action.payload.userId
      ),
    };
  case ActionType.DOWNVOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      // Remove user from the upVotesBy list in the threadDetail state
      upVotesBy: threadDetail.upVotesBy.filter(
        (id) => id !== action.payload.userId
      ),
      // Add user to the downVotesBy list in the threadDetail state
      downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
        ? threadDetail.downVotesBy
        : threadDetail.downVotesBy.concat(action.payload.userId),
    };
  case ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      // Remove user from the upVotesBy list in the threadDetail state
      upVotesBy: threadDetail.upVotesBy.filter(
        (id) => id !== action.payload.userId
      ),
      // Remove user from the downVotesBy list in the threadDetail state
      downVotesBy: threadDetail.downVotesBy.filter(
        (id) => id !== action.payload.userId
      ),
    };
  case ActionType.ADD_COMMENT:
    return {
      ...threadDetail,
      comments: [action.payload.comment, ...threadDetail.comments],
    };
  case ActionType.UPVOTE_COMMENT:
    return {
      ...threadDetail,
      // Find the comment in the comments array in threadDetail
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            // Add user to the upVotesBy list in the threadDetail comments state
            upVotesBy: comment.upVotesBy.includes(action.payload.userId)
              ? comment.upVotesBy
              : comment.upVotesBy.concat(action.payload.userId),
            // Remove user from the downVotesBy list in the threadDetail comments state
            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }
        return comment;
      }),
    };
  case ActionType.DOWNVOTE_COMMENT:
    return {
      ...threadDetail,
      // Find the comment in the comments array in threadDetail
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            // Remove user from the upVotesBy list in the threadDetail comments state
            upVotesBy: comment.upVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
            // Add user to the downVotesBy list in the threadDetail comments state
            downVotesBy: comment.downVotesBy.includes(action.payload.userId)
              ? comment.downVotesBy
              : comment.downVotesBy.concat(action.payload.userId),
          };
        }
        return comment;
      }),
    };
  case ActionType.NEUTRALIZE_VOTE_COMMENT:
    return {
      ...threadDetail,
      // Find the comment in the comments array in threadDetail
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            // Remove user from the upVotesBy list in the threadDetail comments state
            upVotesBy: comment.upVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
            // Remove user from the downVotesBy list in the threadDetail comments state
            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }
        return comment;
      }),
    };
  default:
    return threadDetail;
  }
}

export default threadDetailReducer;
