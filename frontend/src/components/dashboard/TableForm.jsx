import React from "react";
import "../../styles/TableForm.css";

const TableForm = ({ columns, data, onRowClick }) => {
  return (
    <div className="table-section">
      <table className="reusable-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} style={col.style || {}}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <div className="table-container">
        <table className="reusable-table">
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                className="row-section"
                key={rowIndex}
                onClick={() => onRowClick && onRowClick(row.projectId)}
                style={{ cursor: onRowClick ? "pointer" : "default" }}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} style={col.style || {}}>
                    {col.render
                      ? col.render(row[col.accessor], row)
                      : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableForm;
