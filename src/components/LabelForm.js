import React, { useState } from 'react';

const LabelForm = ({ addLabel }) => {
  const [labelText, setLabelText] = useState('');

  const handleAddLabel = () => {
    if (labelText.trim() !== '') {
      addLabel(labelText);
      setLabelText('');
    }
  };

  return (
    <div>
      <div className="field">
        <label className="label">Добавить метку</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Метка"
            value={labelText}
            onChange={(e) => setLabelText(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-primary" onClick={handleAddLabel}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabelForm;
