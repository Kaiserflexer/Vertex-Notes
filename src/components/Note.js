// src/components/Note.js
import React, { useState } from 'react';
import { format } from 'date-fns';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Note = ({ note, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({ ...note });

  const handleSaveEdit = () => {
    onEdit(editedNote);
    setIsEditing(false);
  };

  const formattedDate = format(new Date(note.createdAt), 'dd.MM.yyyy HH:mm:ss');

  const cardStyle = {
    width: '18rem',
    margin: '10px 0', // Увеличьте вертикальный отступ здесь
  };

  return (
    <Card style={cardStyle}>
      <Card.Body>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editedNote.title}
              onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
            />
            <textarea
              value={editedNote.description}
              onChange={(e) => setEditedNote({ ...editedNote, description: e.target.value })}
            />
            <Button variant="primary" onClick={handleSaveEdit}>Сохранить</Button>{' '}
          </div>
        ) : (
          <div>
            <Card.Title>{note.title}</Card.Title>
            <Card.Text>{note.description}</Card.Text>
            <Card.Text><strong>Дата создания:</strong> {formattedDate}</Card.Text>
            <Button variant="danger" onClick={() => onDelete(note)}>Удалить</Button>{' '}
            <Button variant="info" onClick={() => setIsEditing(true)}>Редактировать</Button>{' '}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Note;
