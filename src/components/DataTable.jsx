import React, { useState } from 'react';

const DataTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  if (!data || data.length === 0) return null;

  const columns = Object.keys(data[0]);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h3 className="section-title" style={{ marginBottom: 0, border: 'none' }}>
          Data Preview ({data.length} rows)
        </h3>
        <div style={{ color: '#6c757d', fontSize: '14px' }}>
          Page {currentPage} of {totalPages}
        </div>
      </div>

      <div style={{ 
        overflowX: 'auto',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          fontSize: '14px'
        }}>
          <thead>
            <tr style={{ 
              background: 'linear-gradient(90deg, #11998e 0%, #38ef7d 100%)',
              color: 'white'
            }}>
              {columns.map((column, index) => (
                <th key={index} style={{ 
                  padding: '14px 16px', 
                  textAlign: 'left',
                  fontWeight: '600',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                style={{
                  borderBottom: '1px solid #e9ecef',
                  background: rowIndex % 2 === 0 ? 'white' : '#f8f9fa',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#e9f7f5'}
                onMouseLeave={(e) => e.currentTarget.style.background = rowIndex % 2 === 0 ? 'white' : '#f8f9fa'}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} style={{ 
                    padding: '12px 16px',
                    color: '#333'
                  }}>
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '8px',
          marginTop: '20px',
          alignItems: 'center'
        }}>
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{
              padding: '8px 16px',
              background: currentPage === 1 ? '#e9ecef' : 'linear-gradient(90deg, #11998e 0%, #38ef7d 100%)',
              color: currentPage === 1 ? '#6c757d' : 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            ← Previous
          </button>

          <span style={{ 
            padding: '8px 16px',
            color: '#11998e',
            fontWeight: '600'
          }}>
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 16px',
              background: currentPage === totalPages ? '#e9ecef' : 'linear-gradient(90deg, #11998e 0%, #38ef7d 100%)',
              color: currentPage === totalPages ? '#6c757d' : 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;