import React, { useMemo } from 'react';

const NoteList = ({
  notes,
  folders = [],
  onDelete,
  onEdit,
  onMoveNoteToFolder,
  selectedFolderId,
}) => {
  const filteredNotes = useMemo(() => {
    if (!selectedFolderId) {
      return notes;
    }
    return notes.filter((note) => note.folderId === selectedFolderId);
  }, [notes, selectedFolderId]);

  const folderNames = useMemo(() => {
    const lookup = new Map();
    folders.forEach((folder) => lookup.set(folder.id, folder.name));
    return lookup;
  }, [folders]);

  if (filteredNotes.length === 0) {
    return (
      <div className="empty-state">
        <i className="fas fa-pen-to-square" style={{ fontSize: '2rem', marginBottom: '12px' }}></i>
        <p>Заметок пока нет. Создайте первую, чтобы начать!</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      {filteredNotes.map((note) => {
        const noteFolderName = note.folderId
          ? folderNames.get(note.folderId)
          : null;

        return (
          <article key={note.id} className="note-card">
            <div className="note-card__header">
              <h3 className="note-card__title">{note.title}</h3>
              <div className="note-card__meta">
                <span>
                  <i className="fas fa-clock"></i>{' '}
                  Создано: {new Date(note.createdAt).toLocaleString()}
                </span>
                {note.updatedAt && (
                  <span>
                    <i className="fas fa-rotate"></i>{' '}
                    Обновлено: {new Date(note.updatedAt).toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <div className="note-card__description">{note.description}</div>

            {note.tags && note.tags.length > 0 && (
              <div className="note-card__tags">
                {note.tags.map((tag) => (
                  <span key={tag} className="note-card__tag">
                    <i className="fas fa-hashtag"></i>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="note-card__folder">
              <label className="field-label" htmlFor={`note-folder-${note.id}`}>
                Папка
              </label>
              <select
                id={`note-folder-${note.id}`}
                className="modern-select note-card__folder-select"
                value={note.folderId || ''}
                onChange={(event) =>
                  onMoveNoteToFolder(note.id, event.target.value || null)
                }
              >
                <option value="">Без папки</option>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
              {noteFolderName && (
                <span className="panel-description">
                  Текущая папка: {noteFolderName}
                </span>
              )}
            </div>

            <div className="note-card__actions">
              <button
                type="button"
                className="modern-button secondary"
                onClick={() => onEdit(note)}
              >
                <i className="fas fa-pen"></i>
                Редактировать
              </button>
              <button
                type="button"
                className="modern-button danger"
                onClick={() => onDelete(note.id)}
              >
                <i className="fas fa-trash"></i>
                Удалить
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default NoteList;
