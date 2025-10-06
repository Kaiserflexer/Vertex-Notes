import React, { useState } from 'react';
import FolderForm from './FolderForm';

const FolderList = ({
  folders = [],
  onAddFolder,
  onDeleteFolder,
  onEditFolder,
  selectedFolderId,
  onSelectFolder,
}) => {
  const [folderBeingEdited, setFolderBeingEdited] = useState(null);
  const [editedName, setEditedName] = useState('');

  const startEditing = (folder) => {
    setFolderBeingEdited(folder.id);
    setEditedName(folder.name);
  };

  const cancelEditing = () => {
    setFolderBeingEdited(null);
    setEditedName('');
  };

  const saveEditing = () => {
    if (!editedName.trim()) {
      return;
    }
    onEditFolder(folderBeingEdited, editedName);
    cancelEditing();
  };

  return (
    <div className="gradient-surface panel-card">
      <div className="panel-heading">
        <div>
          <h2 className="panel-title">Папки</h2>
          <p className="panel-description">
            Быстро переключайтесь между коллекциями заметок и управляйте структурой.
          </p>
        </div>
      </div>

      <FolderForm addFolder={onAddFolder} />

      <div className="folder-list">
        <div className={`folder-chip ${selectedFolderId === null ? 'active' : ''}`}>
          <button
            type="button"
            className="folder-chip__label-button"
            onClick={() => onSelectFolder(null)}
          >
            <span className="folder-chip__label">
              <i className="fas fa-inbox"></i>
              Все заметки
            </span>
          </button>
        </div>

        {folders.map((folder) => (
          <div key={folder.id}>
            {folderBeingEdited === folder.id ? (
              <div className="folder-edit-row">
                <input
                  className="modern-input"
                  type="text"
                  value={editedName}
                  onChange={(event) => setEditedName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      saveEditing();
                    }
                    if (event.key === 'Escape') {
                      event.preventDefault();
                      cancelEditing();
                    }
                  }}
                />
                <button type="button" className="modern-button" onClick={saveEditing}>
                  <i className="fas fa-check"></i>
                  Сохранить
                </button>
                <button
                  type="button"
                  className="modern-button secondary"
                  onClick={cancelEditing}
                >
                  Отмена
                </button>
              </div>
            ) : (
              <div className={`folder-chip ${selectedFolderId === folder.id ? 'active' : ''}`}>
                <button
                  type="button"
                  className="folder-chip__label-button"
                  onClick={() => onSelectFolder(folder.id)}
                >
                  <span className="folder-chip__label">
                    <i className="fas fa-folder"></i>
                    {folder.name}
                  </span>
                </button>
                <div className="folder-chip__actions">
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => startEditing(folder)}
                    aria-label="Редактировать папку"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => onDeleteFolder(folder.id)}
                    aria-label="Удалить папку"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderList;
