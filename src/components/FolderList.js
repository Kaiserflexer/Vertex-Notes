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
    <div className="box">
      <h2 className="title is-5">Папки</h2>
      <FolderForm addFolder={onAddFolder} />
      <div className="menu">
        <ul className="menu-list">
          <li>
            <button
              type="button"
              className={`button is-ghost is-fullwidth has-text-left ${
                selectedFolderId === null ? 'is-link' : ''
              }`}
              onClick={() => onSelectFolder(null)}
            >
              <span className="icon-text">
                <span className="icon">
                  <i className="fas fa-inbox"></i>
                </span>
                <span>Все заметки</span>
              </span>
            </button>
          </li>
          {folders.map((folder) => (
            <li key={folder.id} className="mt-2">
              {folderBeingEdited === folder.id ? (
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <input
                      className="input"
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
                  </div>
                  <div className="control">
                    <button
                      type="button"
                      className="button is-success"
                      onClick={saveEditing}
                    >
                      <i className="fas fa-check"></i>
                    </button>
                  </div>
                  <div className="control">
                    <button
                      type="button"
                      className="button"
                      onClick={cancelEditing}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="folder-item">
                  <button
                    type="button"
                    className={`button is-ghost is-fullwidth has-text-left ${
                      selectedFolderId === folder.id ? 'is-link' : ''
                    }`}
                    onClick={() => onSelectFolder(folder.id)}
                  >
                    <span className="icon-text">
                      <span className="icon">
                        <i className="fas fa-folder"></i>
                      </span>
                      <span>{folder.name}</span>
                    </span>
                  </button>
                  <div className="buttons is-right mt-2">
                    <button
                      type="button"
                      className="button is-warning is-small"
                      onClick={() => startEditing(folder)}
                    >
                      <span className="icon is-small">
                        <i className="fas fa-edit"></i>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="button is-danger is-small"
                      onClick={() => onDeleteFolder(folder.id)}
                    >
                      <span className="icon is-small">
                        <i className="fas fa-trash"></i>
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FolderList;
