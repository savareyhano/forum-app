import React from 'react';
import parse from 'html-react-parser';
import {
  PiThumbsDown,
  PiThumbsDownFill,
  PiThumbsUp,
  PiThumbsUpFill,
} from 'react-icons/pi';
import { postedAt } from '../utils';
import PropTypes from 'prop-types';

function ThreadDetail({
  id,
  title,
  body,
  category,
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
    <>
      <header className="thread-header">
        <p className="thread-header__category">#{category}</p>
      </header>
      <div className="thread-content">
        <h2>{title}</h2>
        <div className="thread-content__body">{parse(body)}</div>
      </div>
      <footer className="thread-footer">
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
        <div className="owner-info">
          <span>Dibuat oleh</span>
          <img src={owner.avatar} alt="avatar" />
          <span>{owner.name}</span>
        </div>
        <p>{postedAt(createdAt)}</p>
      </footer>
    </>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const threadDetailShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
};

ThreadDetail.propTypes = {
  ...threadDetailShape,
  authUser: PropTypes.string.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export { threadDetailShape, commentShape };

export default ThreadDetail;
