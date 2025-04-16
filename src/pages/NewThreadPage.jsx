import React from 'react';
import NewThreadInput from '../components/NewThreadInput';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { asyncCreateThread } from '../states/threads/action';

function NewThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onCreateThread = ({ title, category, body }) => {
    dispatch(asyncCreateThread({ title, category, body }));

    navigate('/');
  };

  return (
    <div className="new-thread-page">
      <h2>Buat Diskusi Baru</h2>
      <NewThreadInput createThread={onCreateThread} />
    </div>
  );
}

export default NewThreadPage;
