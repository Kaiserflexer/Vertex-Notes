import React from 'react';
import EditNoteModal from './EditNoteModal';

const NoteList = ({ notes, onDelete, onEdit }) => {
  return (
    <div>
      {notes.map((note) => (
        <div key={note.createdAt} className="card mb-3">
          <div className="card-content">
            <p className="title">{note.title}</p>
            <p className="subtitle">
              {new Date(note.createdAt).toLocaleString()}
              {note.updated && ' (изменено)'}
            </p>
            <div className="content">{note.description}</div>
            <div className="tags">
              {note.tags && note.tags.length > 0 && (
                <span className="tag is-primary is-light">
                  <i className="fas fa-tags"></i> Метки: {note.tags.join(', ')}
                </span>
              )}
            </div>
          </div>
          <footer className="card-footer">
            <button
              className="button is-warning card-footer-item"
              onClick={() => onEdit(note)}
            >
              <i className="fas fa-edit"></i> Редактировать
            </button>
            <button
              className="button is-danger card-footer-item"
              onClick={() => onDelete(note)}
            >
              <i className="fas fa-trash"></i> Удалить
            </button>
          </footer>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
