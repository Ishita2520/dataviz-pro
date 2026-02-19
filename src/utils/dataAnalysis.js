// Data Analysis Utility Functions

export const analyzeData = (data) => {
  if (!data || data.length === 0) return null;

  const analysis = {
    rowCount: data.length,
    columnCount: Object.keys(data[0]).length,
    columns: Object.keys(data[0]),
    statistics: {}
  };

  // Analyze each column
  Object.keys(data[0]).forEach(column => {
    const values = data.map(row => row[column]).filter(val => val !== null && val !== undefined && val !== '');
    const numericValues = values.filter(val => !isNaN(parseFloat(val))).map(val => parseFloat(val));

    analysis.statistics[column] = {
      type: numericValues.length > values.length * 0.5 ? 'numeric' : 'categorical',
      totalValues: values.length,
      uniqueValues: [...new Set(values)].length,
      nullCount: data.length - values.length
    };

    // Add numeric statistics if applicable
    if (numericValues.length > 0) {
      const sorted = [...numericValues].sort((a, b) => a - b);
      const sum = numericValues.reduce((acc, val) => acc + val, 0);
      const mean = sum / numericValues.length;
      
      analysis.statistics[column] = {
        ...analysis.statistics[column],
        min: Math.min(...numericValues),
        max: Math.max(...numericValues),
        mean: parseFloat(mean.toFixed(2)),
        median: sorted[Math.floor(sorted.length / 2)],
        sum: parseFloat(sum.toFixed(2))
      };
    }

    // Add categorical statistics if applicable
    if (analysis.statistics[column].type === 'categorical') {
      const frequency = {};
      values.forEach(val => {
        frequency[val] = (frequency[val] || 0) + 1;
      });
      analysis.statistics[column].frequency = frequency;
      analysis.statistics[column].mostCommon = Object.entries(frequency).sort((a, b) => b[1] - a[1])[0];
    }
  });

  return analysis;
};

export const generateChartData = (data, xColumn, yColumn) => {
  if (!data || !xColumn || !yColumn) return null;

  const chartData = data.map(row => ({
    x: row[xColumn],
    y: parseFloat(row[yColumn]) || 0
  }));

  return chartData;
};

export const getColumnsByType = (analysis) => {
  if (!analysis) return { numeric: [], categorical: [] };

  const numeric = [];
  const categorical = [];

  Object.entries(analysis.statistics).forEach(([column, stats]) => {
    if (stats.type === 'numeric') {
      numeric.push(column);
    } else {
      categorical.push(column);
    }
  });

  return { numeric, categorical };
};

export const aggregateData = (data, groupBy, valueColumn) => {
  if (!data || !groupBy || !valueColumn) return null;

  const groups = {};
  
  data.forEach(row => {
    const group = row[groupBy];
    if (!groups[group]) {
      groups[group] = [];
    }
    const value = parseFloat(row[valueColumn]);
    if (!isNaN(value)) {
      groups[group].push(value);
    }
  });

  const aggregated = Object.entries(groups).map(([group, values]) => ({
    category: group,
    value: values.reduce((sum, val) => sum + val, 0) / values.length,
    count: values.length,
    total: values.reduce((sum, val) => sum + val, 0)
  }));

  return aggregated;
};