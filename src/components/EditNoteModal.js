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
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Редактировать заметку</h3>
          <button className="close-button" onClick={onClose} aria-label="Закрыть окно">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body">
          <div className="form-field">
            <label className="field-label" htmlFor="edit-note-title">
              Заголовок
            </label>
            <input
              id="edit-note-title"
              className="modern-input"
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label className="field-label" htmlFor="edit-note-description">
              Описание
            </label>
            <textarea
              id="edit-note-description"
              className="modern-input"
              rows="4"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label className="field-label" htmlFor="edit-note-folder">
              Папка
            </label>
            <select
              id="edit-note-folder"
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
              onChange={(newTags) => setTags(newTags)}
              className="modern-tagsinput"
              inputProps={{ placeholder: 'Добавьте метку' }}
            />
          </div>
        </div>

        <div className="modal-actions">
          <button className="modern-button" onClick={handleSave}>
            <i className="fas fa-save"></i>
            Сохранить изменения
          </button>
          <button className="modern-button secondary" onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;
