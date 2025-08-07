import React from 'react';

const TodoForm = ({ input, setInput, description, setDescription, handleAdd, handleInputKeyDown, deletingId, titleInputRef }) => (
  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
    <input
      ref={titleInputRef}
      name="title"
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Enter title"
      onKeyDown={handleInputKeyDown}
      style={inputStyle}
    />
    <input
      id="description-input"
      name="description"
      type="text"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Enter description"
      onKeyDown={handleInputKeyDown}
      style={inputStyle}
    />
    <button
      onClick={handleAdd}
      disabled={deletingId !== null}
      style={buttonStyle(deletingId)}
    >
      Add Todo
    </button>
  </div>
);

const inputStyle = {
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '300px',
};

const buttonStyle = (disabled) => ({
  padding: '8px 16px',
  backgroundColor: 'black',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: disabled ? 'not-allowed' : 'pointer',
});

export default TodoForm;
