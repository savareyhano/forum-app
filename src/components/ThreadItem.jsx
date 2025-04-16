import React from 'react';
import { Link } from 'react-router';
import { postedAt } from '../utils';
import {
  PiArrowBendUpLeft,
  PiThumbsDown,
  PiThumbsDownFill,
  PiThumbsUp,
  PiThumbsUpFill,
} from 'react-icons/pi';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  owner,
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
    <div className="thread-item">
      <header className="thread-item__header">
        <span className="thread-item__category">#{category}</span>
        <h4 className="thread-item__title">
          <Link to={`/threads/${id}`}>{title}</Link>
        </h4>
      </header>
      <div className="thread-item__body">{parse(body)}</div>
      <footer className="thread-item__footer">
        <button
          type="button"
          className="thread-upvote__button"
          onClick={onClickUpvote}
        >
          {isUpvoted ? <PiThumbsUpFill /> : <PiThumbsUp />}
          <span className="thread-upvote__label">{upVotesBy.length}</span>
        </button>
        <button
          type="button"
          className="thread-downvote__button"
          onClick={onClickDownvote}
        >
          {isDownvoted ? <PiThumbsDownFill /> : <PiThumbsDown />}
          <span className="thread-downvote__label">{downVotesBy.length}</span>
        </button>
        <p className="thread-item__total-comments">
          <PiArrowBendUpLeft />
          {totalComments}
        </p>
        <p>{postedAt(createdAt)}</p>
        <p className="thread-item__owner">
          Dibuat oleh <strong>{owner.name}</strong>
        </p>
      </footer>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  authUser: PropTypes.string.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export { threadItemShape };

export default ThreadItem;
