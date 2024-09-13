import React from 'react';
import './ExpenseTable.css';

const ExpenseTable = ({ expenses, onEdit, onDelete, onSave, editIndex, editedExpense, onChange, setEditIndex }) => {
  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Sno</th>
          <th>Date</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={expense._id}>
            <td>{index + 1}</td>
            <td>
              {editIndex === index ? (
                <input
                  type="date"
                  name="date"
                  value={editedExpense.date}
                  onChange={onChange}
                />
              ) : (
                new Date(expense.date).toLocaleDateString()
              )}
            </td>
            <td>
              {editIndex === index ? (
                <input
                  type="text"
                  name="category"
                  value={editedExpense.category}
                  onChange={onChange}
                />
              ) : (
                expense.category
              )}
            </td>
            <td>
              {editIndex === index ? (
                <input
                  type="number"
                  name="amount"
                  value={editedExpense.amount}
                  onChange={onChange}
                />
              ) : (
                expense.amount
              )}
            </td>
            <td>
              {editIndex === index ? (
                <input
                  type="text"
                  name="description"
                  value={editedExpense.description}
                  onChange={onChange}
                />
              ) : (
                expense.description
              )}
            </td>
            <td className="actions-cell">
              {editIndex === index ? (
                <>
                  <button className="save-btn" onClick={onSave}>Save</button>
                  <button className="cancel-btn" onClick={() => setEditIndex(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="edit-btn" onClick={() => onEdit(index)}>Edit</button>
                  <button className="delete-btn" onClick={() => onDelete(expense._id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;
