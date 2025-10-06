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
    <form className="box" onSubmit={handleSubmit}>
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
        <label className="label">Папка</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select
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
          <button className="button is-primary" type="submit">
            Добавить
          </button>
        </div>
      </div>
    </form>
  );
};

export default NoteForm;
