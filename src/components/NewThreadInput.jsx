import React from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

function NewThreadInput({ createThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const onSubmitCreateThread = (event) => {
    event.preventDefault();
    createThread({ title, category, body });
  };

  return (
    <form className="new-thread-input" onSubmit={onSubmitCreateThread}>
      <input
        type="text"
        value={title}
        onChange={onTitleChange}
        placeholder="Judul"
        required
      />
      <input
        type="text"
        value={category}
        onChange={onCategoryChange}
        placeholder="Kategori"
      />
      <textarea
        className="input-body"
        value={body}
        onChange={onBodyChange}
        required
      ></textarea>
      <button type="submit">Buat</button>
    </form>
  );
}

NewThreadInput.propTypes = {
  createThread: PropTypes.func.isRequired,
};

export default NewThreadInput;
