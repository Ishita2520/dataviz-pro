import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { getColumnsByType, aggregateData } from '../utils/dataAnalysis';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartDisplay = ({ data, analysis }) => {
  const [chartType, setChartType] = useState('bar');
  const [xColumn, setXColumn] = useState('');
  const [yColumn, setYColumn] = useState('');

  if (!data || !analysis) return null;

  const { numeric, categorical } = getColumnsByType(analysis);

  // Set default columns if not selected
  React.useEffect(() => {
    if (!xColumn && categorical.length > 0) {
      setXColumn(categorical[0]);
    }
    if (!yColumn && numeric.length > 0) {
      setYColumn(numeric[0]);
    }
  }, [categorical, numeric, xColumn, yColumn]);

  if (!xColumn || !yColumn) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px',
        background: '#f8f9fa',
        borderRadius: '12px',
        color: '#6c757d'
      }}>
        <p style={{ fontSize: '18px' }}>
          ⚠️ Need at least one categorical and one numeric column to generate charts
        </p>
      </div>
    );
  }

  // Aggregate data for visualization
  const aggregated = aggregateData(data, xColumn, yColumn);

  if (!aggregated || aggregated.length === 0) return null;

  const chartData = {
    labels: aggregated.map(item => item.category),
    datasets: [
      {
        label: `Average ${yColumn}`,
        data: aggregated.map(item => item.value),
        backgroundColor: chartType === 'pie' 
          ? ['#11998e', '#38ef7d', '#20c997', '#17a2b8', '#6AC0E2', '#667eea']
          : 'rgba(17, 153, 142, 0.7)',
        borderColor: '#11998e',
        borderWidth: 2,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: '600'
          }
        }
      },
      title: {
        display: true,
        text: `${yColumn} by ${xColumn}`,
        font: {
          size: 18,
          weight: '700'
        },
        color: '#11998e'
      }
    },
    scales: chartType !== 'pie' ? {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e9ecef'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    } : {}
  };

  return (
    <div className="section">
      <h2 className="section-title">📈 Data Visualization</h2>

      {/* Controls */}
      <div style={{ 
        background: '#f8f9fa',
        padding: '24px',
        borderRadius: '12px',
        marginBottom: '24px'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {/* Chart Type */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '600',
              color: '#11998e',
              fontSize: '14px'
            }}>
              Chart Type
            </label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #11998e',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                background: 'white'
              }}
            >
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="pie">Pie Chart</option>
            </select>
          </div>

          {/* X Axis (Categorical) */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '600',
              color: '#11998e',
              fontSize: '14px'
            }}>
              X-Axis (Category)
            </label>
            <select
              value={xColumn}
              onChange={(e) => setXColumn(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #11998e',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                background: 'white'
              }}
            >
              {categorical.map((col, idx) => (
                <option key={idx} value={col}>{col}</option>
              ))}
            </select>
          </div>

          {/* Y Axis (Numeric) */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '600',
              color: '#11998e',
              fontSize: '14px'
            }}>
              Y-Axis (Value)
            </label>
            <select
              value={yColumn}
              onChange={(e) => setYColumn(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #11998e',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                background: 'white'
              }}
            >
              {numeric.map((col, idx) => (
                <option key={idx} value={col}>{col}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container" style={{ height: '400px' }}>
        {chartType === 'bar' && <Bar data={chartData} options={options} />}
        {chartType === 'line' && <Line data={chartData} options={options} />}
        {chartType === 'pie' && <Pie data={chartData} options={options} />}
      </div>

      {/* Aggregated Data Summary */}
      <div style={{ 
        marginTop: '24px',
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '12px'
      }}>
        <h4 style={{ 
          fontSize: '16px',
          fontWeight: '600',
          color: '#11998e',
          marginBottom: '16px'
        }}>
          Aggregated Data Summary
        </h4>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          fontSize: '14px'
        }}>
          {aggregated.slice(0, 5).map((item, idx) => (
            <div key={idx} style={{ 
              padding: '12px',
              background: 'white',
              borderRadius: '8px',
              borderLeft: '3px solid #11998e'
            }}>
              <div style={{ fontWeight: '600', color: '#11998e', marginBottom: '4px' }}>
                {item.category}
              </div>
              <div style={{ color: '#6c757d' }}>
                Avg: <span style={{ fontWeight: '600', color: '#333' }}>{item.value.toFixed(2)}</span>
              </div>
              <div style={{ color: '#6c757d', fontSize: '12px' }}>
                Count: {item.count}
              </div>
            </div>
          ))}
        </div>
        {aggregated.length > 5 && (
          <p style={{ 
            marginTop: '12px', 
            fontSize: '14px', 
            color: '#6c757d',
            textAlign: 'center'
          }}>
            ... and {aggregated.length - 5} more categories
          </p>
        )}
      </div>
    </div>
  );
};

export default ChartDisplay;