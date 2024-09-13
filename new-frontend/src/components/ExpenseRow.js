import React from 'react';
import PropTypes from 'prop-types';

const ExpenseRow = ({
  expense,
  index,
  isEditing,
  editedExpense,
  onEdit,
  onDelete,
  onSave,
  onChange
}) => {
  // Handler for Edit button click
  const handleEditClick = () => {
    onEdit(index); // Pass index to identify which row is being edited
  };

  // Handler for Delete button click
  const handleDeleteClick = () => {
    onDelete(expense._id); // Pass the expense ID to delete
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        {isEditing ? (
          <input
            type="date"
            name="date"
            value={editedExpense.date || ''}
            onChange={onChange}
          />
        ) : (
          new Date(expense.date).toLocaleDateString()
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="category"
            value={editedExpense.category || ''}
            onChange={onChange}
          />
        ) : (
          expense.category
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="number"
            name="amount"
            value={editedExpense.amount || ''}
            onChange={onChange}
          />
        ) : (
          expense.amount
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="description"
            value={editedExpense.description || ''}
            onChange={onChange}
          />
        ) : (
          expense.description
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <button onClick={onSave}>Save</button>
            <button onClick={() => onEdit(null)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
};

// PropTypes to validate the props passed to the component
ExpenseRow.propTypes = {
  expense: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isEditing: PropTypes.bool.isRequired,
  editedExpense: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ExpenseRow;
