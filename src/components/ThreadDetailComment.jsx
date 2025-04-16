import React from 'react';
import ThreadDetailCommentInput, {
  threadDetailCommentInputShape,
} from './ThreadDetailCommentInput';
import ThreadDetailCommentList, {
  threadDetailCommentListShape,
} from './ThreadDetailCommentList';
import PropTypes from 'prop-types';

function ThreadDetailComment({
  addComment,
  comments,
  authUser,
  upvote,
  downvote,
  neutralizeVote,
}) {
  return (
    <div className="thread-comment">
      <ThreadDetailCommentInput addComment={addComment} />
      <ThreadDetailCommentList
        comments={comments}
        authUser={authUser}
        upvote={upvote}
        downvote={downvote}
        neutralizeVote={neutralizeVote}
      />
    </div>
  );
}

ThreadDetailComment.propTypes = {
  addComment: threadDetailCommentInputShape.addComment,
  comments: threadDetailCommentListShape.comments,
  authUser: PropTypes.string.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export default ThreadDetailComment;
