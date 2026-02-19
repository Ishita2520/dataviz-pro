import React from 'react';

const Statistics = ({ analysis }) => {
  if (!analysis) return null;

  const { rowCount, columnCount, columns, statistics } = analysis;

  return (
    <div className="section">
      <h2 className="section-title">📊 Data Summary</h2>

      {/* Overview Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Rows</div>
          <div className="stat-value">{rowCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Columns</div>
          <div className="stat-value">{columnCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Numeric Columns</div>
          <div className="stat-value">
            {Object.values(statistics).filter(s => s.type === 'numeric').length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Categorical Columns</div>
          <div className="stat-value">
            {Object.values(statistics).filter(s => s.type === 'categorical').length}
          </div>
        </div>
      </div>

      {/* Column Statistics */}
      <div style={{ marginTop: '32px' }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#11998e',
          marginBottom: '20px'
        }}>
          Column Statistics
        </h3>

        <div style={{ 
          display: 'grid', 
          gap: '16px'
        }}>
          {columns.map((column, index) => {
            const stats = statistics[column];
            return (
              <div 
                key={index}
                style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '12px',
                  borderLeft: `4px solid ${stats.type === 'numeric' ? '#11998e' : '#38ef7d'}`
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <h4 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600',
                    color: '#11998e'
                  }}>
                    {column}
                  </h4>
                  <span style={{
                    padding: '4px 12px',
                    background: stats.type === 'numeric' ? '#11998e' : '#38ef7d',
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {stats.type}
                  </span>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '12px',
                  fontSize: '14px'
                }}>
                  <div>
                    <span style={{ color: '#6c757d' }}>Total Values:</span>{' '}
                    <span style={{ fontWeight: '600' }}>{stats.totalValues}</span>
                  </div>
                  <div>
                    <span style={{ color: '#6c757d' }}>Unique Values:</span>{' '}
                    <span style={{ fontWeight: '600' }}>{stats.uniqueValues}</span>
                  </div>
                  {stats.nullCount > 0 && (
                    <div>
                      <span style={{ color: '#6c757d' }}>Null Count:</span>{' '}
                      <span style={{ fontWeight: '600', color: '#dc3545' }}>{stats.nullCount}</span>
                    </div>
                  )}

                  {/* Numeric Statistics */}
                  {stats.type === 'numeric' && (
                    <>
                      <div>
                        <span style={{ color: '#6c757d' }}>Min:</span>{' '}
                        <span style={{ fontWeight: '600' }}>{stats.min}</span>
                      </div>
                      <div>
                        <span style={{ color: '#6c757d' }}>Max:</span>{' '}
                        <span style={{ fontWeight: '600' }}>{stats.max}</span>
                      </div>
                      <div>
                        <span style={{ color: '#6c757d' }}>Mean:</span>{' '}
                        <span style={{ fontWeight: '600' }}>{stats.mean}</span>
                      </div>
                      <div>
                        <span style={{ color: '#6c757d' }}>Median:</span>{' '}
                        <span style={{ fontWeight: '600' }}>{stats.median}</span>
                      </div>
                      <div>
                        <span style={{ color: '#6c757d' }}>Sum:</span>{' '}
                        <span style={{ fontWeight: '600' }}>{stats.sum}</span>
                      </div>
                    </>
                  )}

                  {/* Categorical Statistics */}
                  {stats.type === 'categorical' && stats.mostCommon && (
                    <div style={{ gridColumn: '1 / -1' }}>
                      <span style={{ color: '#6c757d' }}>Most Common:</span>{' '}
                      <span style={{ fontWeight: '600' }}>
                        {stats.mostCommon[0]} ({stats.mostCommon[1]} times)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Statistics;