import React, { useState } from 'react';

const EditableTable = ({ data, columns }) => {
  const [tableData, setTableData] = useState(data);

  const handleCellEdit = (rowIndex, colIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

  const handleSave = () => {
    // do something with the updated tableData, e.g. send to server
  };

  const handleCancel = () => {
    // reset tableData to original data
    setTableData(data);
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, colIndex) => (
            <th key={colIndex}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={`${rowIndex}-${colIndex}`}>
                <input
                  type="text"
                  value={cell}
                  onChange={(e) => handleCellEdit(rowIndex, colIndex, e.target.value)}
                  onFocus={(e) => e.target.select()}
                />
              </td>
            ))}
            <td>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditableTable;