import React from 'react';
import ThreadItem, { threadItemShape } from './ThreadItem';
import PropTypes from 'prop-types';

function ThreadsList({ threads, upvote, downvote, neutralizeVote }) {
  return (
    <div className="threads-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          upvote={upvote}
          downvote={downvote}
          neutralizeVote={neutralizeVote}
        />
      ))}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export default ThreadsList;
