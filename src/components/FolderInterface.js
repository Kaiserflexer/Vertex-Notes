// FolderInterface.js
import React, { useState } from 'react';
import FolderList from './FolderList';
import FolderForm from './FolderForm';

const FolderInterface = () => {
  const [folders, setFolders] = useState([]);

  const addFolder = (folderName) => {
    // Добавьте новую папку в состояние
  };

  // Добавьте другие функции для редактирования и удаления папок

  return (
    <div>
      <FolderForm addFolder={addFolder} />
      <FolderList folders={folders} />
    </div>
  );
};

export default FolderInterface;
