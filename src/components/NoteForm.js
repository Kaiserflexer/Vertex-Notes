import React, { useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

const NoteForm = ({ addNote }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [editor, setEditor] = useState(null);

  const handleSubmit = () => {
    if (title.trim() !== '' && description.trim() !== '') {
      addNote({
        title,
        description,
        createdAt: Date.now(),
        tags,
      });
      setTitle('');
      setDescription('');
      setTags([]);
      if (editor) {
        editor.codemirror.setValue(''); // Сброс редактора после отправки
      }
    }
  };

  return (
    <div className="box">
      <div className="field">
        <label className="label">Заголовок</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Описание</label>
        <div className="control">
          <SimpleMDE
            value={description}
            onChange={(value) => setDescription(value)}
            getMdeInstance={(simpleMde) => setEditor(simpleMde)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Метки</label>
        <div className="control">
          <TagsInput
            value={tags}
            onChange={(tags) => setTags(tags)}
            addOnBlur={true}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-primary" onClick={handleSubmit}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
