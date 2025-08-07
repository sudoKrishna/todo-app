import { useState, useEffect, useRef } from 'react';


const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/todos';


export default function useTodoHooks() {
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);


  const editableRefs = useRef({});
  const titleInputRef = useRef(null);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        const updated = data.map((item) => ({
          ...item,
          isCompleted: item.isCompleted || false,
        }));
        setItems(updated);
      })
      .catch(console.error);
  }, []);

const handleAdd = () => {
  if (!input.trim() || !description.trim()) {
    setShowAlert(true); // Show alert if either input is empty
    return;
  }

    fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: input, description, isCompleted: false }),
  })
    .then((res) => res.json())
    .then((newItem) => {
      setItems((prev) => [...prev, { ...newItem, isCompleted: false }]);
      setInput('');
      setDescription('');
      titleInputRef.current?.focus();
    })
    .catch(console.error);
};

  const handleDelete = (row) => {
    setDeletingId(row._id);

    setTimeout(() => {
      setItems((prev) => prev.filter((item) => item._id !== row._id));
      setDeletingId(null);
    }, 700);

    fetch(`${API}/${row._id}`, { method: 'DELETE' }).catch(console.error);
  };

  const handleEditClick = (id) => {
    if (editItemId === id) {
      saveEdits(id);
      setEditItemId(null);
    } else {
      setEditItemId(id);
    }
  };

  const saveEdits = (id) => {
    const title = editableRefs.current[`title-${id}`]?.innerText.trim();
    const description = editableRefs.current[`description-${id}`]?.innerText.trim();

    setItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, title, description } : item
      )
    );

    fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    }).catch(console.error);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdits(id);
      setEditItemId(null);
      e.target.blur();
    }
    if (e.key === 'Escape') {
      const item = items.find((i) => i._id === id);
      if (e.target.dataset.field === 'title') {
        e.target.innerText = item.title;
      } else if (e.target.dataset.field === 'description') {
        e.target.innerText = item.description;
      }
      e.target.blur();
      setEditItemId(null);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.name === 'title'
        ? document.getElementById('description-input').focus()
        : handleAdd();
    }
  };

  const handleToggleCompleted = (id) => {
  const item = items.find(i => i._id === id);
  if (!item) return;

  // Show check gif
  setItems(prev =>
    prev.map(i => i._id === id ? { ...i, isCompleted: true } : i)
  );

  // ✅ Show success alert
  setShowSuccess(true);

  // Delete after half gif time
  setTimeout(() => {
    setItems(prev => prev.filter(i => i._id !== id));
    fetch(`${API}/${id}`, { method: 'DELETE' }).catch(console.error);
  }, 500);
};

 return {
  input,
  description,
  items,
  deletingId,
  editItemId,
  editableRefs,
  titleInputRef,
  setInput,
  setDescription,
  handleAdd,
  handleDelete,
  handleEditClick,
  handleKeyDown,
  handleInputKeyDown,
  handleToggleCompleted,
  showAlert,
  setShowAlert, 
    showAlert,
  setShowAlert,
  showSuccess,
  setShowSuccess, 
};

}
