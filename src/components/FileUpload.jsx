import React, { useRef } from 'react';

const FileUpload = ({ onFileUpload, loading }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      onFileUpload(file);
    } else {
      alert('Please upload a valid CSV file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.style.borderColor = '#38ef7d';
    e.currentTarget.style.background = 'rgba(56, 239, 125, 0.05)';
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.style.borderColor = '#11998e';
    e.currentTarget.style.background = 'transparent';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.style.borderColor = '#11998e';
    e.currentTarget.style.background = 'transparent';
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      onFileUpload(file);
    } else {
      alert('Please upload a valid CSV file');
    }
  };

  return (
    <div style={{ marginBottom: '40px' }}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
        style={{
          border: '3px dashed #11998e',
          borderRadius: '16px',
          padding: '60px 40px',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          background: 'transparent'
        }}
      >
        <div style={{ marginBottom: '20px' }}>
            <svg 
                width="80" 
                height="80" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#11998e" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
        </div>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: '600', 
          color: '#11998e',
          marginBottom: '12px'
        }}>
          {loading ? 'Processing...' : 'Upload CSV File'}
        </h3>
        <p style={{ 
          color: '#6c757d', 
          fontSize: '16px',
          marginBottom: '20px'
        }}>
          Drag and drop your CSV file here, or click to browse
        </p>
        <button
          type="button"
          style={{
            padding: '12px 32px',
            background: 'linear-gradient(90deg, #11998e 0%, #38ef7d 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            boxShadow: '0 4px 12px rgba(17, 153, 142, 0.3)'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          disabled={loading}
        >
          {loading ? '⏳ Processing...' : '📁 Choose File'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
      
      {loading && (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '20px',
          color: '#11998e',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          <div style={{ 
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid #e9ecef',
            borderTop: '4px solid #11998e',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '12px'
          }}></div>
          <p>Analyzing your data...</p>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FileUpload;