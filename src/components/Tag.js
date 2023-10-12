import React from 'react';

const Tag = ({ tag, onDelete }) => {
  return (
    <span className="tag is-primary is-medium mr-2">
      {tag}
      <button className="delete is-small" onClick={() => onDelete(tag)}></button>
    </span>
  );
};

export default Tag;
