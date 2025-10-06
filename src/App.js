import React, { useState, useEffect } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import EditNoteModal from './components/EditNoteModal';
import FolderList from './components/FolderList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  useEffect(() => {
    try {
      const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
      if (Array.isArray(savedNotes)) {
        setNotes(savedNotes);
      }
    } catch (error) {
      console.error('Не удалось загрузить заметки из LocalStorage', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    try {
      const savedFolders = JSON.parse(localStorage.getItem('folders') || '[]');
      if (Array.isArray(savedFolders)) {
        setFolders(savedFolders);
      }
    } catch (error) {
      console.error('Не удалось загрузить папки из LocalStorage', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('folders', JSON.stringify(folders));
  }, [folders]);

  const generateId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const addNote = (noteData) => {
    const timestamp = new Date().toISOString();
    const newNote = {
      id: generateId(),
      createdAt: timestamp,
      updatedAt: null,
      ...noteData,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    toast.success('Заметка успешно добавлена!', { position: 'bottom-right' });
  };

  const deleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    toast.error('Заметка успешно удалена!', { position: 'bottom-right' });
  };

  const editNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id
          ? { ...note, ...updatedNote, updatedAt: new Date().toISOString() }
          : note
      )
    );
    setSelectedNote(null);
    toast.success('Заметка успешно отредактирована!', { position: 'bottom-right' });
  };

  const addFolder = (folderName) => {
    const trimmedName = folderName.trim();
    if (!trimmedName) {
      toast.warn('Название папки не может быть пустым', { position: 'bottom-right' });
      return;
    }

    if (
      folders.some(
        (folder) => folder.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      toast.warn('Папка с таким названием уже существует', {
        position: 'bottom-right',
      });
      return;
    }

    const newFolder = { id: generateId(), name: trimmedName };
    setFolders((prevFolders) => [...prevFolders, newFolder]);
    toast.success('Папка успешно добавлена!', { position: 'bottom-right' });
  };

  const deleteFolder = (folderId) => {
    setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== folderId));
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.folderId === folderId ? { ...note, folderId: null } : note
      )
    );
    if (selectedFolderId === folderId) {
      setSelectedFolderId(null);
    }
    toast.error('Папка успешно удалена!', { position: 'bottom-right' });
  };

  const editFolder = (folderId, newName) => {
    const trimmedName = newName.trim();
    if (!trimmedName) {
      toast.warn('Название папки не может быть пустым', { position: 'bottom-right' });
      return;
    }

    if (
      folders.some(
        (folder) =>
          folder.id !== folderId &&
          folder.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      toast.warn('Папка с таким названием уже существует', {
        position: 'bottom-right',
      });
      return;
    }

    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === folderId ? { ...folder, name: trimmedName } : folder
      )
    );
    toast.success('Папка успешно отредактирована!', { position: 'bottom-right' });
  };

  const moveNoteToFolder = (noteId, targetFolderId) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, folderId: targetFolderId } : note
      )
    );
    toast.info('Заметка перемещена в папку!', { position: 'bottom-right' });
  };

  return (
    <div className="App">
      <center>
        <img className="app-logo" src="https://cdn-icons-png.flaticon.com/128/4165/4165911.png" alt="Логотип" />
      </center>
      <Container>
        <Row>
          <Col xs={12} md={3}>
            <FolderList
              folders={folders}
              onAddFolder={addFolder}
              onDeleteFolder={deleteFolder}
              onEditFolder={editFolder}
              selectedFolderId={selectedFolderId}
              onSelectFolder={setSelectedFolderId}
            />
          </Col>
          <Col xs={12} md={9}>
            <NoteForm
              addNote={addNote}
              folders={folders}
              defaultFolderId={selectedFolderId}
            />
            <NoteList
              notes={notes}
              onDelete={deleteNote}
              onEdit={(note) => setSelectedNote(note)}
              folders={folders}
              onMoveNoteToFolder={moveNoteToFolder}
              selectedFolderId={selectedFolderId}
            />
          </Col>
        </Row>
      </Container>
      {selectedNote && (
        <EditNoteModal
          editedNote={selectedNote}
          onSave={editNote}
          onClose={() => setSelectedNote(null)}
          folders={folders}
        />
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
