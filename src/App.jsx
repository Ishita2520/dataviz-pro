import React, { useState } from 'react';
import Papa from 'papaparse';
import FileUpload from './components/FileUpload';
import DataTable from './components/DataTable';
import Statistics from './components/Statistics';
import ChartDisplay from './components/ChartDisplay';
import { analyzeData } from './utils/dataAnalysis';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (file) => {
    setLoading(true);
    setFileName(file.name);

    Papa.parse(file, {
      complete: (result) => {
        const parsedData = result.data.filter(row => {
          return Object.values(row).some(val => val !== null && val !== undefined && val !== '');
        });

        setData(parsedData);
        const dataAnalysis = analyzeData(parsedData);
        setAnalysis(dataAnalysis);
        setLoading(false);
      },
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      error: (error) => {
        console.error('Error parsing CSV:', error);
        alert('Error parsing CSV file. Please check the file format.');
        setLoading(false);
      }
    });
  };

  const handleReset = () => {
    setData(null);
    setAnalysis(null);
    setFileName('');
  };

  const handleDownloadSample = () => {
    const sampleCSV = `Product,Category,Sales,Price,Quantity
Laptop,Electronics,45000,1500,30
Mouse,Electronics,1200,40,30
Keyboard,Electronics,2400,80,30
Monitor,Electronics,18000,600,30
Desk,Furniture,15000,500,30
Chair,Furniture,9000,300,30
Notebook,Stationery,600,20,30
Pen,Stationery,300,10,30
Backpack,Accessories,4500,150,30
Headphones,Electronics,6000,200,30`;

    const blob = new Blob([sampleCSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
  <svg 
    width="60" 
    height="60" 
    viewBox="0 0 200 200" 
    fill="none"
  >
    {/* Atomic orbits */}
    <ellipse cx="100" cy="100" rx="80" ry="30" stroke="white" strokeWidth="4" fill="none" opacity="0.8"/>
    <ellipse cx="100" cy="100" rx="80" ry="30" stroke="white" strokeWidth="4" fill="none" opacity="0.8" transform="rotate(60 100 100)"/>
    <ellipse cx="100" cy="100" rx="80" ry="30" stroke="white" strokeWidth="4" fill="none" opacity="0.8" transform="rotate(120 100 100)"/>
    
    {/* Center database icon */}
    <g transform="translate(100, 100)">
      {/* Database cylinder */}
      <ellipse cx="0" cy="-15" rx="20" ry="7" fill="white"/>
      <rect x="-20" y="-15" width="40" height="30" fill="white"/>
      <ellipse cx="0" cy="15" rx="20" ry="7" fill="white"/>
      
      {/* Database lines */}
      <line x1="-20" y1="-5" x2="20" y2="-5" stroke="#11998e" strokeWidth="2"/>
      <line x1="-20" y1="5" x2="20" y2="5" stroke="#11998e" strokeWidth="2"/>
    </g>
  </svg>
  <h1>DataViz Pro</h1>
</div>
        <p>Interactive Data Visualization & Analysis Tool</p>
        {!data && (
          <button
            onClick={handleDownloadSample}
            style={{
              marginTop: '20px',
              padding: '10px 24px',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid white',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download Sample CSV
                </span>
          </button>
        )}
      </header>

      <div className="main-container">
        {!data ? (
          <>
            <FileUpload onFileUpload={handleFileUpload} loading={loading} />
            
            <div style={{ 
              marginTop: '40px',
              padding: '24px',
              background: '#f8f9fa',
              borderRadius: '12px'
            }}>
              <h3 style={{ 
                fontSize: '20px',
                fontWeight: '600',
                color: '#11998e',
                marginBottom: '16px'
              }}>
                ✨ Features
              </h3>
              <ul style={{ 
                listStyle: 'none',
                padding: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '12px'
              }}>
                {[
                  '📤 Upload CSV files instantly',
                  '📊 Automatic data analysis',
                  '📈 Multiple chart types (Bar, Line, Pie)',
                  '📋 Interactive data table with pagination',
                  '🔢 Statistical insights (mean, median, sum)',
                  '🎨 Customizable visualizations',
                  '📊 Column type detection',
                  '💾 Download sample data'
                ].map((feature, idx) => (
                  <li key={idx} style={{ 
                    padding: '12px',
                    background: 'white',
                    borderRadius: '8px',
                    fontSize: '14px',
                    borderLeft: '3px solid #11998e'
                  }}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            {/* File Info Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '32px',
              padding: '20px',
              background: 'linear-gradient(90deg, #11998e 0%, #38ef7d 100%)',
              borderRadius: '12px',
              color: 'white'
            }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
                  📄 {fileName}
                </h3>
                <p style={{ opacity: '0.9', fontSize: '14px' }}>
                  {analysis.rowCount} rows × {analysis.columnCount} columns
                </p>
              </div>
              <button
                onClick={handleReset}
                style={{
                  padding: '10px 20px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '2px solid white',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                🔄 Upload New File
              </button>
            </div>

            {/* Statistics */}
            <Statistics analysis={analysis} />

            {/* Charts */}
            <ChartDisplay data={data} analysis={analysis} />

            {/* Data Table */}
            <div className="section">
              <DataTable data={data} />
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '40px',
        color: 'white',
        fontSize: '14px'
      }}>
        <p>Built with ❤️ by Ishita Umredkar</p>
        <p style={{ opacity: '0.8', marginTop: '8px' }}>
          Interactive Data Visualization Tool
        </p>
      </div>
    </div>
  );
}

export default App;