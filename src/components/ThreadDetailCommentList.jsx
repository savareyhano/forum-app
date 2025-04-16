import React from 'react';
import ThreadDetailCommentItem from './ThreadDetailCommentItem';
import PropTypes from 'prop-types';
import { commentShape } from './ThreadDetail';

function ThreadDetailCommentList({
  comments,
  authUser,
  upvote,
  downvote,
  neutralizeVote,
}) {
  return (
    <div className="thread-comment__list">
      <h3>Komentar ({comments.length})</h3>
      <div className="comments-list">
        {comments.map((comment) => (
          <ThreadDetailCommentItem
            key={comment.id}
            {...comment}
            authUser={authUser}
            upvote={upvote}
            downvote={downvote}
            neutralizeVote={neutralizeVote}
          />
        ))}
      </div>
    </div>
  );
}

const threadDetailCommentListShape = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
};

ThreadDetailCommentList.propTypes = {
  ...threadDetailCommentListShape,
  authUser: PropTypes.string.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export { threadDetailCommentListShape };

export default ThreadDetailCommentList;
