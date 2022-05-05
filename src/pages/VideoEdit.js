import { useState, React } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import videos from '../dummy/DummyVideos';

function VideoEdit() {
  const [newTitle, setNewTitle] = useState(' ');
  let { id } = useParams();
  let navigate = useNavigate();
  const videoObj = videos[id - 1];

  const handleSubmit = (e) => {
    e.preventDefault();
    videos[id - 1].title = newTitle;
    navigate(`/video/${id}`);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };
  return (
    <div>
      <h1>Editing : {videoObj.title}</h1>
      <form onSubmit={handleSubmit} action="post">
        <input
          placeholder="Video Title"
          type="text"
          onChange={handleTitleChange}
        />
        <input type="submit" value="save" />
      </form>
    </div>
  );
}

export default VideoEdit;
