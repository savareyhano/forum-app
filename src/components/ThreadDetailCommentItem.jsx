import React from 'react';
import { postedAt } from '../utils';
import {
  PiThumbsDown,
  PiThumbsDownFill,
  PiThumbsUp,
  PiThumbsUpFill,
} from 'react-icons/pi';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { commentShape } from './ThreadDetail';

function ThreadDetailCommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  upvote,
  downvote,
  neutralizeVote,
}) {
  const isUpvoted = upVotesBy.includes(authUser);
  const isDownvoted = downVotesBy.includes(authUser);

  const onClickUpvote = (event) => {
    event.preventDefault();
    if (isUpvoted) {
      neutralizeVote(id);
    } else {
      upvote(id);
    }
  };

  const onClickDownvote = (event) => {
    event.preventDefault();
    if (isDownvoted) {
      neutralizeVote(id);
    } else {
      downvote(id);
    }
  };

  return (
    <div className="comment-item">
      <header className="comment-item__header">
        <div className="comment-item__owner-info">
          <img src={owner.avatar} alt={owner.name} />
          <p>{owner.name}</p>
        </div>
        <p className="posted-at">{postedAt(createdAt)}</p>
      </header>
      <p>{parse(content)}</p>
      <footer>
        <button
          type="button"
          className="comment-upvote__button"
          onClick={onClickUpvote}
        >
          {isUpvoted ? <PiThumbsUpFill /> : <PiThumbsUp />}
          <span className="comment-upvote__label">{upVotesBy.length}</span>
        </button>
        <button
          type="button"
          className="comment-downvote__button"
          onClick={onClickDownvote}
        >
          {isDownvoted ? <PiThumbsDownFill /> : <PiThumbsDown />}
          <span className="comment-downvote__label">{downVotesBy.length}</span>
        </button>
      </footer>
    </div>
  );
}

ThreadDetailCommentItem.propTypes = {
  ...commentShape,
  authUser: PropTypes.string.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export default ThreadDetailCommentItem;
