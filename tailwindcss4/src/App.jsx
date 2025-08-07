import React from 'react';
import TodoForm from './TodoForm';
import TodoTable from './TodoTable';
import useTodoHooks from './useTodoHooks';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const TodoApp = () => {
  const {
    showAlert,
    setShowAlert,
    showSuccess,
    setShowSuccess,
    ...todoProps
  } = useTodoHooks();

  const handleCloseAlert = () => setShowAlert(false);
  const handleCloseSuccess = () => setShowSuccess(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: 20 }}>
      <h1 style={{ fontSize: '2.986rem' }}>Todo List</h1>
      <div style={{ flex: 1 }} />
      <TodoForm {...todoProps} />
      <TodoTable {...todoProps} />

      {/* ❌ Error Alert */}
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
          Please fill in both input fields!
        </Alert>
      </Snackbar>

      {/* ✅ Success Alert */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          Task completed and removed!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TodoApp;
