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
  const [selectedFolder, setSelectedFolder] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
    toast.success('Заметка успешно добавлена!', { position: 'bottom-right' });
  };

  const deleteNote = (noteToDelete) => {
    const updatedNotes = notes.filter((note) => note !== noteToDelete);
    setNotes(updatedNotes);
    toast.error('Заметка успешно удалена!', { position: 'bottom-right' });
  };

  const editNote = (editedNote) => {
    const updatedNotes = notes.map((note) =>
      note === selectedNote ? editedNote : note
    );
    setNotes(updatedNotes);
    setSelectedNote(null);
    toast.success('Заметка успешно отредактирована!', { position: 'bottom-right' });
  };

  const addFolder = (newFolder) => {
    setFolders([...folders, newFolder]);
    toast.success('Папка успешно добавлена!', { position: 'bottom-right' });
  };

  const deleteFolder = (folderToDelete) => {
    const updatedFolders = folders.filter((folder) => folder !== folderToDelete);
    setFolders(updatedFolders);
    toast.error('Папка успешно удалена!', { position: 'bottom-right' });
  };

  const editFolder = (editedFolder) => {
    const updatedFolders = folders.map((folder) =>
      folder === selectedFolder ? editedFolder : folder
    );
    setFolders(updatedFolders);
    setSelectedFolder(null);
    toast.success('Папка успешно отредактирована!', { position: 'bottom-right' });
  };

  const moveNoteToFolder = (noteToMove, targetFolder) => {
    const updatedNotes = notes.map((note) => {
      if (note === noteToMove) {
        return { ...note, folderId: targetFolder.id };
      }
      return note;
    });
    setNotes(updatedNotes);
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
              onMoveNoteToFolder={moveNoteToFolder}
              selectedFolder={selectedFolder}
              setSelectedFolder={setSelectedFolder}
            />
          </Col>
          <Col xs={12} md={9}>
            <NoteForm addNote={addNote} folders={folders} />
            <NoteList
              notes={notes}
              onDelete={deleteNote}
              onEdit={(note) => setSelectedNote(note)}
              selectedFolder={selectedFolder}
            />
          </Col>
        </Row>
      </Container>
      {selectedNote && (
        <EditNoteModal
          editedNote={selectedNote}
          onSave={editNote}
          onClose={() => setSelectedNote(null)}
        />
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
