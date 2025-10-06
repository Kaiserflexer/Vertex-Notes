import React, { useEffect, useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

const NoteForm = ({ addNote, folders = [], defaultFolderId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [editor, setEditor] = useState(null);
  const [folderId, setFolderId] = useState(defaultFolderId || '');

  useEffect(() => {
    setFolderId(defaultFolderId || '');
  }, [defaultFolderId]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTags([]);
    setFolderId(defaultFolderId || '');
    if (editor) {
      editor.codemirror.setValue('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() !== '' && description.trim() !== '') {
      addNote({
        title: title.trim(),
        description,
        tags,
        folderId: folderId || null,
      });
      resetForm();
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-field">
        <label className="field-label" htmlFor="note-title">
          Заголовок
        </label>
        <input
          id="note-title"
          className="modern-input"
          type="text"
          placeholder="Например, план на неделю"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label className="field-label">Описание</label>
        <SimpleMDE
          value={description}
          onChange={(value) => setDescription(value)}
          getMdeInstance={(simpleMde) => setEditor(simpleMde)}
          options={{ placeholder: 'Добавьте подробности, ссылки или задачи…' }}
        />
      </div>

      <div className="form-field">
        <label className="field-label" htmlFor="note-folder">
          Папка
        </label>
        <select
          id="note-folder"
          className="modern-select"
          value={folderId}
          onChange={(event) => setFolderId(event.target.value)}
        >
          <option value="">Без папки</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label className="field-label">Метки</label>
        <TagsInput
          value={tags}
          onChange={(tags) => setTags(tags)}
          addOnBlur={true}
          className="modern-tagsinput"
          inputProps={{ placeholder: 'Нажмите Enter, чтобы добавить метку' }}
        />
      </div>

      <div className="form-field">
        <button className="modern-button" type="submit">
          <i className="fas fa-plus-circle"></i>
          Добавить заметку
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
