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
    return <p className="has-text-grey">Заметок пока нет.</p>;
  }

  return (
    <div>
      {filteredNotes.map((note) => {
        const noteFolderName = note.folderId
          ? folderNames.get(note.folderId)
          : null;

        return (
          <div key={note.id} className="card mb-3">
            <div className="card-content">
              <p className="title">{note.title}</p>
              <p className="subtitle">
                {new Date(note.createdAt).toLocaleString()}
                {note.updatedAt && (
                  <span className="ml-2 has-text-grey">
                    (изменено {new Date(note.updatedAt).toLocaleString()})
                  </span>
                )}
              </p>
              <div className="content">{note.description}</div>
              <div className="tags">
                {note.tags && note.tags.length > 0 && (
                  <span className="tag is-primary is-light">
                    <i className="fas fa-tags"></i> Метки: {note.tags.join(', ')}
                  </span>
                )}
              </div>
              <div className="field mt-3">
                <label className="label is-size-6">Папка</label>
                <div className="control">
                  <div className="select is-small">
                    <select
                      value={note.folderId || ''}
                      onChange={(event) =>
                        onMoveNoteToFolder(
                          note.id,
                          event.target.value || null
                        )
                      }
                    >
                      <option value="">Без папки</option>
                      {folders.map((folder) => (
                        <option key={folder.id} value={folder.id}>
                          {folder.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {noteFolderName && (
                    <p className="help">Текущая папка: {noteFolderName}</p>
                  )}
                </div>
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
                onClick={() => onDelete(note.id)}
              >
                <i className="fas fa-trash"></i> Удалить
              </button>
            </footer>
          </div>
        );
      })}
    </div>
  );
};

export default NoteList;
