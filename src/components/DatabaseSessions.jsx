import { format, subSeconds, getUnixTime, parse } from 'date-fns'; // Import the date-fns library for formatting
import React, { useRef, useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns'; // Import the date-fns adapter

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);

const API_ENDPOINT = import.meta.env.VITE_API_END_POINT;

const UPDATE_FREQUENCY = 2;


//  Creates an array of 10 date and time labels, each representing a 2-second interval, starting from the current time and going back in time. The labels are formatted as 'HH:mm:ss'.
let labels = Array(10).fill().map((_, index) => format(subSeconds(new Date(), (10 - index) * UPDATE_FREQUENCY), 'HH:mm:ss'));
//let labels = [];
let totalSessions = [];
let activeSessions = [];
let idleSessions = [];

const chartData = {
  labels: labels,
  datasets: [
    {
      label: 'Total Sessions',
      data: totalSessions.map(session => session.y),
      borderColor: '#b163a3',
      backgroundColor: '#b163a3',
      borderWidth: 2,
      radius: 0,
    },
    {
      label: 'Active Sessions',
      data: activeSessions.map(session => session.y),
      borderColor: '#779966',
      backgroundColor: '#779966',
      borderWidth: 2,
      radius: 0,
    },
    {
      label: 'Idle Sessions',
      data: idleSessions.map(session => session.y),
      borderColor: '#FFCC99',
      backgroundColor: '#FFCC99',
      borderWidth: 2,
      radius: 0,
    },
  ],
};

const defaultHighNumber = 14;
const highestNumber = Math.max(...totalSessions.map(session => session.y)) || defaultHighNumber;
  const maxY = highestNumber > defaultHighNumber ? highestNumber + 2 : defaultHighNumber;
  const totalDuration = 2000;
  const delayBetweenPoints = totalDuration / totalSessions.length;

  const previousY = (ctx) => {
    const meta = ctx.chart.getDatasetMeta(ctx.datasetIndex);
    //console.log(meta.label + " " );

    if (meta._parsed.length > 0) {
      var prevValue = meta._parsed[(meta._parsed.length - 1)].y;
      return ctx.chart.scales.y.getPixelForValue(prevValue);
    }

    return ctx.chart.scales.y.getPixelForValue(0);
  };

  const animation = {
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
    },
  };

  const getMinX = (abels) => {

    // Get the current date and time
    const currentDate = new Date();

    // Subtract 10 seconds from the current date and time
    const pastDate = subSeconds(currentDate, 9);

    // Format the past date as Unix time with milliseconds
    const formattedTimestamp = getUnixTime(pastDate) * 1000;

    return formattedTimestamp;

  }

  const getMaxX = () => {

    // Get the current date and time
    const currentDate = new Date();

    // Format the past date as Unix time with milliseconds
    const formattedTimestamp = getUnixTime(currentDate) * 1000;

    return formattedTimestamp;

  }


  let chartOptions = {
    animations: animation,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        type: 'time',
        time: {
          unit: 'second', // Set the time unit (e.g., 'hour', 'day', 'week', etc.)
          parser: 'HH:mm:ss', // Specify the date-time format for parsing
          displayFormats: {
            quarter: 'MMM YYYY'
          },
        },
        min: getMinX,
        max: getMaxX,
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        min: 0,
        suggestedMin: 0,
        max: maxY,
        suggestedMax: 20,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
          lineWidth: 1,
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: true
        },
        ticks: {
          display: true,
          font: {
            size: 12,
            weight: 'bold'
          },
          beginAtZero: true,
          min: 0,
          max: 100,
          stepSize: 2,
        },
        beginAtZero: true,
        title: {
          display: true,
          text: 'Connections',
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 10
          }
        }
      },
    },
  };

const chartUpdate = (chart, totalSessions, activeSessions, idleSessions, labels) => {

  if (chart) {
    chart.data.datasets[0].data = totalSessions;
    chart.data.datasets[1].data = activeSessions;
    chart.data.datasets[2].data = idleSessions;
    chart.data.labels = labels;
    chart.update();
  }

};

const DatabaseSessionsChart = () => {
  const chartRef = useRef();
  //const [sessionsData, setSessionsData] = useState([]);
  //const [totalSessions, setTotalSession] = useState([]); //Array(10).fill()
  //const [idleSessions, setIdleSessions] = useState([]);
  //const [activeSessions, setActiveSessions] = useState([]);
  const [currentTime, setCurrentTime] = useState(format(new Date(), 'HH:mm:ss'));
  //const [labels, setLabels] = useState(Array(10).fill().map((_, index) => format(subSeconds(new Date(), (10 - index) * 2), 'HH:mm:ss')));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchSessionsData = async () => {

    const chart = chartRef.current;

    try {
      const response = await fetch(`${API_ENDPOINT}/api/sessions`);
      if (!response.ok) {
        throw new Error('Error fetching sessions data');
      }

      const data = await response.json();




      //console.log(data);
      //setSessionsData(data);

      /*
      setTotalSession(prevTotalSessions => [...prevTotalSessions, data.length].slice(-10));
      setActiveSessions(prevActiveSessions => [...prevActiveSessions, data.filter(session => session.state === 'active').length].slice(-10));
      setIdleSessions(prevIdleSessions => [...prevIdleSessions, data.filter(session => session.state === 'idle').length].slice(-10));
      */

      const currentTime = format(new Date(), 'HH:mm:ss');

      setCurrentTime(currentTime);

      totalSessions = [...totalSessions, { x: currentTime, y: data.length }].slice(-10);
      activeSessions = [...activeSessions, { x: currentTime, y: data.filter(session => session.state === 'active').length }].slice(-10);
      idleSessions = [...idleSessions, { x: currentTime, y: data.filter(session => session.state === 'idle').length }].slice(-10);
      labels = [...labels, currentTime].slice(-10);

      /*

      setTotalSession(prevTotalSessions => [
        ...prevTotalSessions,
        { x: currentTime, y: data.length }
      ].slice(-10));
  
      setActiveSessions(prevActiveSessions => [
        ...prevActiveSessions,
        { x: currentTime, y: data.filter(session => session.state === 'active').length }
      ].slice(-10));
  
      setIdleSessions(prevIdleSessions => [
        ...prevIdleSessions,
        { x: currentTime, y: data.filter(session => session.state === 'idle').length }
      ].slice(-10));*/

      /*
      if(chart) {
        chart.data.datasets[0] = totalSessions;
        chart.data.datasets[1] = activeSessions;
        chart.data.datasets[2] = idleSessions;
        chart.data.labels = labels;
      }*/

      if (chart)
        chartUpdate(chart, totalSessions, activeSessions, idleSessions, labels)



      //setLabels(prevLabels => [...prevLabels, format((new Date()), 'HH:mm:ss')].slice(-10));


      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };



  useEffect(() => {
    const interval = setInterval(fetchSessionsData, (UPDATE_FREQUENCY * 1000));

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  /*

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Total Sessions',
        data: totalSessions.map(session => session.y),
        borderColor: 'blue',
        borderWidth: 1,
        radius: 0,
      },
      {
        label: 'Active Sessions',
        data: activeSessions.map(session => session.y),
        borderColor: 'green',
        borderWidth: 1,
        radius: 0,
      },
      {
        label: 'Idle Sessions',
        data: idleSessions.map(session => session.y),
        borderColor: 'orange',
        borderWidth: 1,
        radius: 0,
      },
    ],
  };*/

  return <Line ref={chartRef} options={chartOptions} data={chartData} key={labels.length} style={{'background': '#fff'}} />;
};

export default DatabaseSessionsChart;
