import React from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

function ThreadDetailCommentInput({ addComment }) {
  const [content, onContentChange, setContent] = useInput('');

  const onSubmitAddComment = (event) => {
    event.preventDefault();
    addComment({ content });
    setContent('');
  };

  return (
    <div className="thread-comment__input">
      <h3>Beri komentar</h3>
      <form className="comment-input" onSubmit={onSubmitAddComment}>
        <textarea
          className="comment-input__field"
          value={content}
          onChange={onContentChange}
          required
        ></textarea>
        <button type="submit">Kirim</button>
      </form>
    </div>
  );
}

const threadDetailCommentInputShape = {
  addComment: PropTypes.func.isRequired,
};

ThreadDetailCommentInput.propTypes = threadDetailCommentInputShape;

export { threadDetailCommentInputShape };

export default ThreadDetailCommentInput;
