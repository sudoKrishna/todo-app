import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { MdEdit } from 'react-icons/md';

const iconWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
};

export default function TodoTable({
  items,
  editItemId,
  deletingId,
  editableRefs,
  handleEditClick,
  handleKeyDown,
  handleToggleCompleted,
  handleDelete,
}) {
  const columns = [
    {
      field: 'checkbox',
      headerName: '',
      width: 60,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const isCompleted = params.row.isCompleted;
        return (
          <div style={iconWrapperStyle}>
            <img
              src={
                isCompleted
                  ? '/icons/icons8-check.gif'
                  : '/icons/icons8-unchecked-checkbox-100.png'
              }
              alt="check"
              width={24}
              height={24}
              onClick={() => handleToggleCompleted(params.row._id)}
              tabIndex={-1}
              draggable={false}
              style={{
                cursor: 'pointer',
                userSelect: 'none',
              }}
              onMouseDown={(e) => e.preventDefault()}
              title="Toggle complete"
            />
          </div>
        );
      },
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
      renderCell: (params) => {
        const isEditing = editItemId === params.row._id;
        return (
          <div
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            ref={(el) => (editableRefs.current[`title-${params.row._id}`] = el)}
            data-field="title"
            onKeyDown={(e) => handleKeyDown(e, params.row._id)}
            style={{
              borderBottom: isEditing ? '1px solid blue' : 'none',
              outline: 'none',
              cursor: isEditing ? 'text' : 'default',
              minHeight: 24,
              userSelect: isEditing ? 'text' : 'none',
            }}
            title={isEditing ? 'Edit title. Press Enter to save, Esc to cancel.' : undefined}
          >
            {params.value}
          </div>
        );
      },
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      renderCell: (params) => {
        const isEditing = editItemId === params.row._id;
        return (
          <div
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            ref={(el) => (editableRefs.current[`description-${params.row._id}`] = el)}
            data-field="description"
            onKeyDown={(e) => handleKeyDown(e, params.row._id)}
            style={{
              borderBottom: isEditing ? '1px solid blue' : 'none',
              outline: 'none',
              cursor: isEditing ? 'text' : 'default',
              minHeight: 24,
              userSelect: isEditing ? 'text' : 'none',
            }}
            title={isEditing ? 'Edit description. Press Enter to save, Esc to cancel.' : undefined}
          >
            {params.value}
          </div>
        );
      },
    },
    {
      field: 'edit',
      headerName: '',
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div style={iconWrapperStyle}>
          <MdEdit
            size={24}
            style={{ cursor: 'pointer' }}
            onClick={() => handleEditClick(params.row._id)}
            title={editItemId === params.row._id ? 'Save edits' : 'Edit row'}
          />
        </div>
      ),
    },
    {
      field: 'delete',
      headerName: '',
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div style={iconWrapperStyle}>
          <img
            src={
              deletingId === params.row._id
                ? '/icons/icons8-delete.gif'
                : '/icons/icons8-delete-30.png'
            }
            alt="delete"
            width={24}
            height={24}
            onClick={() => {
              if (!deletingId) handleDelete(params.row);
            }}
            tabIndex={-1}
            draggable={false}
            style={{
              cursor: deletingId ? 'default' : 'pointer',
              opacity: deletingId ? 0.7 : 1,
              userSelect: 'none',
            }}
            onMouseDown={(e) => e.preventDefault()}
            title="Delete todo"
          />
        </div>
      ),
    },
  ];

  return (
    <DataGrid
      rows={items}
      columns={columns}
      getRowId={(row) => row._id}
      pageSize={5}
      rowsPerPageOptions={[5]}
      disableColumnMenu
      disableSelectionOnClick
      localeText={{ noRowsLabel: 'No Todos' }}
      sx={{
        '& .MuiDataGrid-row:hover': {
          backgroundColor: 'transparent !important',
        },
        '& .MuiDataGrid-cell:focus': {
          outline: 'none !important',
        },
        '& .MuiDataGrid-columnHeader:focus': {
          outline: 'none !important',
        },
        '& img:focus': {
          outline: 'none !important',
          border: 'none !important',
        },
        '& div[contenteditable="true"]': {
          borderBottom: '1px solid blue',
          paddingBottom: 1,
        },
      }}
    />
  );
}
