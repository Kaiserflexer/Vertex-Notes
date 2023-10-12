// FolderForm.js
import React, { useState } from 'react';

const FolderForm = ({ addFolder }) => {
  const [folderName, setFolderName] = useState('');

  const handleSubmit = () => {
    if (folderName.trim() !== '') {
      addFolder(folderName);
      setFolderName('');
    }
  };

  return (
    <div>
      {/* Форма для создания папки */}
    </div>
  );
};

export default FolderForm;
