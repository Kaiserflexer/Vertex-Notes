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
    <form onSubmit={handleSubmit} className="folder-form">
      <div className="form-row">
        <input
          className="modern-input"
          type="text"
          placeholder="Название новой папки"
          value={folderName}
          onChange={(event) => setFolderName(event.target.value)}
        />
        <button type="submit" className="modern-button">
          <i className="fas fa-plus"></i>
          Добавить
        </button>
      </div>
    </form>
  );
};

export default FolderForm;
