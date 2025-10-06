import React, { useState } from 'react';

const FolderForm = ({ addFolder }) => {
  const [folderName, setFolderName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = folderName.trim();
    if (!trimmedName) {
      return;
    }
    addFolder(trimmedName);
    setFolderName('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Название новой папки"
            value={folderName}
            onChange={(event) => setFolderName(event.target.value)}
          />
        </div>
        <div className="control">
          <button type="submit" className="button is-link">
            Добавить
          </button>
        </div>
      </div>
    </form>
  );
};

export default FolderForm;
