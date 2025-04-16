import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;
  case ActionType.UPVOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return {
          ...thread,
          // Add user to the upVotesBy list in the threads state
          upVotesBy: thread.upVotesBy.includes(action.payload.userId)
            ? thread.upVotesBy
            : thread.upVotesBy.concat(action.payload.userId),
          // Remove user from the downVotesBy list in the threads state
          downVotesBy: thread.downVotesBy.filter(
            (id) => id !== action.payload.userId
          ),
        };
      }
      return thread;
    });
  case ActionType.DOWNVOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return {
          ...thread,
          // Remove user from the upVotesBy list in the threads state
          upVotesBy: thread.upVotesBy.filter(
            (id) => id !== action.payload.userId
          ),
          // Add user to the downVotesBy list in the threads state
          downVotesBy: thread.downVotesBy.includes(action.payload.userId)
            ? thread.downVotesBy
            : thread.downVotesBy.concat(action.payload.userId),
        };
      }
      return thread;
    });
  case ActionType.NEUTRALIZE_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return {
          ...thread,
          // Remove user from the upVotesBy list in the threads state
          upVotesBy: thread.upVotesBy.filter(
            (id) => id !== action.payload.userId
          ),
          // Remove user from the downVotesBy list in the threads state
          downVotesBy: thread.downVotesBy.filter(
            (id) => id !== action.payload.userId
          ),
        };
      }
      return thread;
    });
  default:
    return threads;
  }
}

export default threadsReducer;
