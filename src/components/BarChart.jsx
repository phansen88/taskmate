import React, { useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const BarChart = ({ data, options, isLoading, hasError}) => {
    const chartRef = useRef();
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (hasError) {
        return <div>{error}</div>;
    }

    return <Bar ref={chartRef} data={data} options={options} tyle={{'background': '#fff'}} />;
};

export default BarChart;