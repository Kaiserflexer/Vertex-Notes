import React, { useEffect, useState } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

const EditNoteModal = ({ editedNote, onSave, onClose, folders = [] }) => {
  const [editedTitle, setEditedTitle] = useState(editedNote.title);
  const [editedDescription, setEditedDescription] = useState(
    editedNote.description
  );
  const [tags, setTags] = useState(editedNote.tags || []);
  const [folderId, setFolderId] = useState(editedNote.folderId || '');

  useEffect(() => {
    setEditedTitle(editedNote.title);
    setEditedDescription(editedNote.description);
    setTags(editedNote.tags || []);
    setFolderId(editedNote.folderId || '');
  }, [editedNote]);

  const handleSave = () => {
    onSave({
      ...editedNote,
      title: editedTitle,
      description: editedDescription,
      tags,
      folderId: folderId || null,
    });
    onClose();
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Редактировать Записку</p>
          <button className="delete" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Заголовок</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Описание</label>
            <div className="control">
              <textarea
                className="textarea"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
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
                onChange={(newTags) => setTags(newTags)}
                inputProps={{ placeholder: 'Добавьте метку' }}
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={handleSave}>
            Сохранить изменения
          </button>
          <button className="button" onClick={onClose}>
            Отмена
          </button>
        </footer>
      </div>
    </div>
  );
};

export default EditNoteModal;
